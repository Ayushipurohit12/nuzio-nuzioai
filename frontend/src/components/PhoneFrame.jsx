import "./PhoneFrame.css";

export default function PhoneFrame({ children }) {
  return (
    <div className="phone-outer">
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="status-bar">
          <span className="status-time">9:41</span>
          <div className="status-icons">
            <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
              <path d="M7.5 9.5a1.3 1.3 0 100 2.6 1.3 1.3 0 000-2.6z" fill="#f0ede8" />
              <path
                d="M2 6.8a7.8 7.8 0 0111 0M4.3 8.8a4.6 4.6 0 016.4 0"
                stroke="#f0ede8"
                strokeWidth="1.3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
              <rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke="#f0ede8" opacity="0.5" />
              <rect x="2" y="2" width="16" height="8" rx="1.3" fill="#f0ede8" />
              <rect x="21.5" y="4" width="1.6" height="4" rx="0.8" fill="#f0ede8" opacity="0.5" />
            </svg>
          </div>
        </div>
        <div className="phone-content">{children}</div>
      </div>
    </div>
  );
}
