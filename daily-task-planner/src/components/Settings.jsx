import { useState } from "react";

const PRESETS = [
  { label: "5 min", value: 300 },
  { label: "15 min", value: 900 },
  { label: "25 min", value: 1500 },
  { label: "45 min", value: 2700 },
  { label: "60 min", value: 3600 },
];

function Settings({ defaultDuration, onSave, onClose }) {
  const [minutes, setMinutes] = useState(Math.floor(defaultDuration / 60));

  function handlePreset(value) {
    setMinutes(Math.floor(value / 60));
  }

  function handleSave() {
    const duration = Math.max(1, minutes) * 60;
    onSave(duration);
  }

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={e => e.stopPropagation()}>

        <div className="settings-header">
          <h2 className="settings-title">⚙ Settings</h2>
          <button className="settings-close" onClick={onClose}>✕</button>
        </div>

        <p className="settings-label">Default Timer Duration</p>

        {/* Preset buttons */}
        <div className="settings-presets">
          {PRESETS.map(p => (
            <button
              key={p.value}
              onClick={() => handlePreset(p.value)}
              className={`preset-btn ${minutes === Math.floor(p.value / 60) ? "preset-btn--active" : ""}`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Custom input */}
        <div className="settings-custom">
          <label className="settings-custom__label">Custom (minutes)</label>
          <div className="settings-custom__row">
            <button
              className="stepper-btn"
              onClick={() => setMinutes(m => Math.max(1, m - 1))}
            >−</button>
            <input
              type="number"
              min="1"
              max="120"
              value={minutes}
              onChange={e => setMinutes(parseInt(e.target.value) || 1)}
              className="settings-custom__input"
            />
            <button
              className="stepper-btn"
              onClick={() => setMinutes(m => Math.min(120, m + 1))}
            >+</button>
          </div>
        </div>

        <p className="settings-preview">
          New tasks will have a <strong>{minutes} minute</strong> timer
        </p>

        <button onClick={handleSave} className="settings-save-btn">
          Save Settings
        </button>

      </div>
    </div>
  );
}

export default Settings;