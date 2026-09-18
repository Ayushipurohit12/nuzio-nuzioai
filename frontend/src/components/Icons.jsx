export function LogoMark({ size = 28 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, rgba(144,128,255,0.25), rgba(106,76,247,0.15))",
        boxShadow: "0 0 14px rgba(106,76,247,0.35)"
      }}
    >
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none">
        <rect x="1" y="9" width="2.4" height="6" rx="1.2" fill="#9080ff" />
        <rect x="6" y="5" width="2.4" height="14" rx="1.2" fill="#9080ff" />
        <rect x="11" y="2" width="2.4" height="20" rx="1.2" fill="#f0ede8" />
        <rect x="16" y="6" width="2.4" height="12" rx="1.2" fill="#9080ff" />
        <rect x="21" y="9" width="2.4" height="6" rx="1.2" fill="#9080ff" />
      </svg>
    </div>
  );
}

export function GoogleIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C33.9 5.1 29.2 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.8-.4-4.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C33.9 5.1 29.2 3 24 3 16.3 3 9.7 7.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 45c5.1 0 9.8-2 13.3-5.2l-6.2-5.2c-2 1.4-4.5 2.3-7.1 2.3-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.6 40.6 16.2 45 24 45z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4.2 5.8l6.2 5.2C40.6 36.4 44 30.9 44 24c0-1.4-.1-2.8-.4-3.5z"
      />
    </svg>
  );
}

export function PlayIcon({ size = 14, color = "#f0ede8" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 4.5v15l13-7.5-13-7.5z" fill={color} />
    </svg>
  );
}

export function PauseIcon({ size = 14, color = "#f0ede8" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="5" y="4" width="5" height="16" rx="1.5" fill={color} />
      <rect x="14" y="4" width="5" height="16" rx="1.5" fill={color} />
    </svg>
  );
}

export function SkipBackIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M18 5v14l-11-7 11-7z" fill="#f0ede8" />
      <rect x="5" y="5" width="2" height="14" rx="1" fill="#f0ede8" />
    </svg>
  );
}

export function SkipForwardIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 5v14l11-7-11-7z" fill="#f0ede8" />
      <rect x="17" y="5" width="2" height="14" rx="1" fill="#f0ede8" />
    </svg>
  );
}

export function SearchIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="#f0ede8" strokeWidth="2" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#f0ede8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function BellIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3a5 5 0 00-5 5v3.2c0 .5-.2 1-.5 1.4L5 15h14l-1.5-2.4a2.3 2.3 0 01-.5-1.4V8a5 5 0 00-5-5z"
        fill="#f0ede8"
      />
      <path d="M10 18a2 2 0 004 0h-4z" fill="#f0ede8" />
    </svg>
  );
}

export function DiscoverIcon({ size = 16, active = false }) {
  const c = active ? "#3ecf8e" : "rgba(156,150,140,0.9)";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.6" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" fill={c} />
    </svg>
  );
}

export function SettingsIcon({ size = 16, active = false }) {
  const c = active ? "#3ecf8e" : "rgba(156,150,140,0.9)";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke={c} strokeWidth="1.6" />
      <path
        d="M19 12a7 7 0 00-.1-1.2l2-1.5-2-3.4-2.3.9a7 7 0 00-2-1.2L14.2 3H9.8l-.4 2.6a7 7 0 00-2 1.2l-2.3-.9-2 3.4 2 1.5a7 7 0 000 2.4l-2 1.5 2 3.4 2.3-.9a7 7 0 002 1.2l.4 2.6h4.4l.4-2.6a7 7 0 002-1.2l2.3.9 2-3.4-2-1.5c.07-.4.1-.8.1-1.2z"
        stroke={c}
        strokeWidth="1.3"
      />
    </svg>
  );
}

export function MicIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="9" y="2" width="6" height="12" rx="3" fill="#f0ede8" />
      <path d="M5 11a7 7 0 0014 0" stroke="#f0ede8" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="12" y1="18" x2="12" y2="22" stroke="#f0ede8" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function SavedDot() {
  return <span style={{ width: 6, height: 6, borderRadius: 3, background: "#3ecf8e", boxShadow: "0 0 6px #3ecf8e" }} />;
}
