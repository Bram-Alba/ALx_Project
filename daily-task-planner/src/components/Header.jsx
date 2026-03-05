function Header({ onSettingsClick }) {
  return (
    <header className="app-header">
      <div className="app-header__title">
        <div className="app-header__icon">✓</div>
        Daily Task Planner
      </div>
      <button className="app-header__settings" onClick={onSettingsClick} aria-label="Settings">⚙</button>
    </header>
  );
}

export default Header;