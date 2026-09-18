import { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import PhoneFrame from "../components/PhoneFrame.jsx";
import { LogoMark, GoogleIcon } from "../components/Icons.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import "./Login.css";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

function WaveMark() {
  const bars = [3, 8, 5, 14, 18, 11, 20, 13, 9, 16, 6, 12];
  return (
    <div className="wave">
      {bars.map((h, i) => (
        <span key={i} className="wave-bar" style={{ height: `${h}px` }} />
      ))}
    </div>
  );
}

export default function Login() {
  const { loginWithGoogle, loginDemo } = useAuth();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleDemo = async () => {
    setError("");
    setBusy(true);
    try {
      await loginDemo();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setError("");
    setBusy(true);
    try {
      await loginWithGoogle(credentialResponse.credential);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <PhoneFrame>
      <div className="login-screen">
        <div className="login-hero">
          <div className="login-logo">
            <LogoMark size={60} />
          </div>
          <WaveMark />
        </div>

        <div className="login-copy">
          <h1>Good morning.</h1>
          <h2>News on go.</h2>
          <p>Personalised audio news for Indian professionals — curated every morning.</p>
        </div>

        <div className="login-spacer" />

        <div className="login-actions">
          {error && <p className="login-error">{error}</p>}

          {GOOGLE_CLIENT_ID ? (
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
              <div className="google-btn-wrap">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError("Google sign-in failed. Try again.")}
                  theme="filled_black"
                  shape="pill"
                  width="207"
                />
              </div>
            </GoogleOAuthProvider>
          ) : (
            <button className="google-btn" onClick={handleDemo} disabled={busy}>
              <GoogleIcon size={13} />
              <span>{busy ? "Signing in…" : "Continue with Google"}</span>
            </button>
          )}

          <p className="login-terms">
            By continuing you agree to our <a href="#terms">Terms</a> &amp; <a href="#privacy">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}
