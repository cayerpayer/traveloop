/* ============================================
   Loader — Full-screen or inline spinner
   ============================================ */

import './Loader.css';

export default function Loader({ fullScreen = false, size = 40, text = '' }) {
  if (fullScreen) {
    return (
      <div className="loader-fullscreen" id="fullscreen-loader">
        <div className="loader-content">
          <div className="loader-ring" style={{ width: size, height: size }}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          {text && <p className="loader-text mt-3">{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="loader-inline" id="inline-loader">
      <div className="loader-ring" style={{ width: size, height: size }}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
