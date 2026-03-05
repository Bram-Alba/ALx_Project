import { useState } from "react";

function Header({ defaultDuration, onDurationChange }) {
  const [open, setOpen] = useState(false);
  const [minutes, setMinutes] = useState(Math.floor(defaultDuration / 60));

  function handleSave() {
    const secs = Math.max(1, minutes) * 60;
    onDurationChange(secs);
    setOpen(false);
  }

  return (
    <>
      <header className="app-header">
        <div className="app-header__title">
          <div className="app-header__icon">✓</div>
          Daily Task Planner
        </div>
        <button
          className="app-header__settings"
          onClick={() => setOpen(prev => !prev)}
          aria-label="Settings"
          title="Adjust timer duration"
        >
          ⚙
        </button>
      </header>

      {/* Settings panel */}
      {open && (
        <div className="settings-panel">
          <p className="settings-panel__title">⏱ Timer Duration</p>
          <div className="settings-panel__row">
            <label htmlFor="duration-input">Minutes:</label>
            <input
              id="duration-input"
              type="number"
              min="1"
              max="120"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              className="settings-panel__input"
            />
          </div>
          <div className="settings-panel__actions">
            <button onClick={() => setOpen(false)} className="settings-panel__cancel">
              Cancel
            </button>
            <button onClick={handleSave} className="settings-panel__save">
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;