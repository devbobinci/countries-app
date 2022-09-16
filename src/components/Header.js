import React from "react";

const Header = ({ theme, setTheme }) => {
  const onThemeChange = () => {
    const elementsToChangeTheme = [
      document.querySelector(".header_container"),
      document.querySelector(".header-title"),
      document.querySelector(".header-theme-switch"),
      document.querySelector(".switch-text"),
    ];

    setTheme(false);

    document.querySelector(".icon").classList.toggle("fa-regular");
    document.querySelector(".icon").classList.toggle("fa-solid");
    document.querySelector(".icon").classList.toggle("dark-mode");

    for (let el of elementsToChangeTheme) {
      el.classList.toggle("dark-mode");
    }

    if (theme === false) {
      setTheme(true);
    }
  };

  return (
    <div className="header_container">
      <div className="header">
        <h3 className="header-title">Where in the world?</h3>
        <div onClick={onThemeChange} className="header-theme-switch">
          <i className="fa-regular fa-moon icon"></i>
          <span className="switch-text">{theme ? "Light" : "Dark"} Mode</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
