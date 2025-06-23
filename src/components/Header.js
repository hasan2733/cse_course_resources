import React from 'react';

const Header = ({
  searchTerm,
  setSearchTerm,
  toggleTheme,
  isDarkMode,
  toggleAdminLogin,
  isAdmin,
  showAdminLogin,
  adminPassword,
  setAdminPassword,
  handleAdminLogin,
  handleAdminLogout
}) => (
  <header>
    <h1>Course Resource Hub</h1>
    <div className="welcome-banner">
      <p>Welcome to our course resource sharing platform! Find, share, and collaborate.</p>
    </div>
    <div className="search-container">
      <div className="search-info">
        <p>Search by course code:</p>
        <div className="search-input-group">
          <input
            type="text"
            placeholder="Enter course code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="button">🔍</button>
        </div>
      </div>
    </div>
    <div className="header-controls">
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
      <button className="admin-toggle" onClick={toggleAdminLogin}>
        {isAdmin ? '👤 Admin Mode' : '🔑 Admin Login'}
      </button>
    </div>
    
    {showAdminLogin && (
      <div className={`admin-login ${isDarkMode ? 'dark' : ''}`}>
        <h3>Dark Mode Admin Login</h3>
        <div className="admin-input-group">
          <input
            type="password"
            placeholder="Enter admin password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
          <button onClick={handleAdminLogin}>Login</button>
          {isAdmin && <button onClick={handleAdminLogout}>Logout</button>}
        </div>
      </div>
    )}
  </header>
);

export default Header;