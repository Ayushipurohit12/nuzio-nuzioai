import { useEffect, useMemo, useRef, useState } from "react";
import PhoneFrame from "../components/PhoneFrame.jsx";
import {
  LogoMark,
  SearchIcon,
  BellIcon,
  PlayIcon,
  PauseIcon,
  SkipBackIcon,
  SkipForwardIcon,
  DiscoverIcon,
  SettingsIcon,
  MicIcon
} from "../components/Icons.jsx";
import { api } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
import "./MorningBrief.css";

function WaveformProgress({ progress, isPlaying }) {
  const bars = useMemo(() => {
    let seed = 42;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    return Array.from({ length: 34 }, () => 6 + rand() * 22);
  }, []);

  const activeCount = Math.round((progress / 100) * bars.length);

  return (
    <div className={`waveform ${isPlaying ? "is-playing" : ""}`}>
      {bars.map((h, i) => (
        <span
          key={i}
          className={`wave-bar-lg ${i < activeCount ? "is-active" : ""}`}
          style={{ height: `${h}px`, "--bar-index": i }}
        />
      ))}
    </div>
  );
}

function formatClock(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function MorningBrief() {
  const { user, logout } = useAuth();
  const [brief, setBrief] = useState(null);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(34); // seconds, matches the 02:14 mock in the design
  const [speed, setSpeed] = useState(1);

  const tickRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .getBrief(category)
      .then((data) => {
        if (cancelled) return;
        setBrief(data);
        setCurrentIndex(0);
        setElapsed(0);
        setError("");
      })
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [category]);

  const currentStory = brief?.stories?.[currentIndex] || null;

  useEffect(() => {
    clearInterval(tickRef.current);
    if (!isPlaying || !currentStory) return;
    tickRef.current = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + speed;
        if (next >= currentStory.durationSeconds) {
          goNext();
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(tickRef.current);
  }, [isPlaying, currentStory, speed]);

  function goNext() {
    if (!brief) return;
    setElapsed(0);
    setCurrentIndex((i) => Math.min(i + 1, brief.stories.length - 1));
  }

  function goPrev() {
    setElapsed(0);
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }

  async function handleSave() {
    if (!currentStory) return;
    try {
      const { savedArticleIds } = await api.toggleSave(currentStory.id);
      setBrief((prev) => ({
        ...prev,
        stories: prev.stories.map((s) => ({ ...s, saved: savedArticleIds.includes(s.id) }))
      }));
    } catch (e) {
      setError(e.message);
    }
  }

  const progress = currentStory ? Math.min(100, (elapsed / currentStory.durationSeconds) * 100) : 0;
  const remaining = currentStory ? Math.max(0, currentStory.durationSeconds - elapsed) : 0;

  return (
    <PhoneFrame>
      <div className="brief-screen">
        <header className="app-header">
          <LogoMark size={30} />
          <div className="header-actions">
            <button className="icon-btn" aria-label="Search">
              <SearchIcon size={11} />
            </button>
            <button className="icon-btn" aria-label="Notifications" onClick={logout} title="Log out">
              <BellIcon size={11} />
              <span className="notif-dot" />
            </button>
          </div>
        </header>

        <div className="brief-scroll">
          <div className="category-row">
            {(brief?.categories || ["All"]).map((c) => (
              <button
                key={c}
                className={`chip ${category === c ? "chip-active" : ""}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {error && <p className="brief-error">{error}</p>}

          {loading && !brief ? (
            <p className="brief-loading">Curating your brief…</p>
          ) : (
            brief && (
              <>
                <p className="brief-date">{brief.date} · Morning Brief</p>

                <div className="brief-greeting">
                  <span className="greeting-plain">Good morning, {brief.greetingName} —</span>
                  <span className="greeting-em">{brief.storyCount} things.</span>
                </div>

                <div className="live-row">
                  <span className="live-dot" />
                  <span className="live-label">{isPlaying ? "Audio live" : "Paused"}</span>
                  <span className="live-meta">
                    · Voice: <b>{brief.voice}</b>
                  </span>
                  <span className="live-meta">
                    · {brief.storyCount} stories · {brief.totalDuration}
                  </span>
                </div>

                {currentStory && (
                  <div className="player-card">
                    <div className="player-top">
                      <div className="now-playing-tag">
                        <span className="tag-dot" />
                        NOW PLAYING · {currentStory.category.toUpperCase()}
                      </div>
                      <span className="position-label">
                        {String(currentStory.position).padStart(2, "0")} / {String(brief.storyCount).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="headline">{currentStory.headline}</h3>

                    <div className="meta-row">
                      <span className="meta-source">{currentStory.source.toUpperCase()}</span>
                      <span className="meta-dim">· {currentStory.readMins} MIN</span>
                      <a
                        className="meta-source-link"
                        href={currentStory.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        · SOURCE 
                      </a>
                      <button className="meta-save" onClick={handleSave}>
                        · {currentStory.saved ? "SAVED" : "SAVE"}
                      </button>
                    </div>

                    {brief.stories[currentIndex + 1] && (
                      <p className="next-preview">{brief.stories[currentIndex + 1].headline.slice(0, 42)}…</p>
                    )}

                    <WaveformProgress progress={progress} isPlaying={isPlaying} />

                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="time-row">
                      <span>{formatClock(elapsed)}</span>
                      <span>-{formatClock(remaining)}</span>
                    </div>

                    <div className="transport-row">
                      <button className="transport-btn" onClick={goPrev} aria-label="Previous story">
                        <SkipBackIcon size={16} />
                      </button>
                      <button
                        className="transport-btn transport-main"
                        onClick={() => setIsPlaying((p) => !p)}
                        aria-label={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
                      </button>
                      <button className="transport-btn" onClick={goNext} aria-label="Next story">
                        <SkipForwardIcon size={16} />
                      </button>
                      <button
                        className="speed-btn"
                        onClick={() => setSpeed((s) => (s === 2 ? 0.5 : s + 0.5))}
                      >
                        {speed}×
                      </button>
                    </div>
                  </div>
                )}

                <div className="narrating-strip">
                  <MicIcon size={11} />
                  <span>
                    {isPlaying ? "Now narrating — " : "Paused — "}
                    {currentStory?.headline.slice(0, 40)}…
                  </span>
                </div>

                <ul className="story-list">
                  {brief.stories.map((story, idx) => (
                    <li
                      key={story.id}
                      className={`story-row ${idx === currentIndex ? "story-row-active" : ""}`}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setElapsed(0);
                      }}
                    >
                      <span className="story-index">{String(story.position).padStart(2, "0")}</span>
                      <div className="story-info">
                        <p className="story-headline">{story.headline}</p>
                        <p className="story-meta">
                          {story.category} · {story.source} · {story.durationLabel}
                        </p>
                      </div>
                      {story.saved && <span className="story-saved-dot" title="Saved" />}
                    </li>
                  ))}
                </ul>
              </>
            )
          )}
        </div>

        <nav className="bottom-nav">
          <button className="nav-item">
            <DiscoverIcon size={13} active />
            <span>DISCOVER</span>
          </button>
          <button className="nav-center" onClick={() => setIsPlaying((p) => !p)}>
            {isPlaying ? <PauseIcon size={13} /> : <PlayIcon size={13} />}
          </button>
          <button className="nav-item">
            <SettingsIcon size={13} />
            <span>SETTINGS</span>
          </button>
        </nav>
      </div>
    </PhoneFrame>
  );
}
