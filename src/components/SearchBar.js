import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = ({
  results,
  setResults,
  theme,
  setSearch,
  search,
  setSelectedRegion,
  resetTheme,
}) => {
  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(term);

  useEffect(() => {
    setSearch(true);
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  const onThemeChange = () => {
    const elementsToChangeTheme = [
      document.querySelector(".search-container"),
      document.querySelector(".search-input"),
      document.querySelector(".search-container .icon"),
      document.querySelector(".term"),
    ];

    for (let el of elementsToChangeTheme) {
      el.classList.add("dark-mode");
    }
  };

  useEffect(() => {
    const searchData = async () => {
      try {
        const { data } = await axios.get(
          `https://restcountries.com/v2/name/${debouncedTerm}`,
          {
            params: {
              name: debouncedTerm,
            },
          }
        );
        setResults(data);
        document
          .querySelector(".error-container")
          .classList.remove("show-error");
      } catch (err) {
        return (
          document
            .querySelector(".error-container")
            .classList.add("show-error"),
          (document.querySelector(".term").textContent =
            `'${term}'`.toUpperCase()),
          setResults([])
        );
      }
    };

    if (debouncedTerm) {
      searchData();
    } else {
      return;
    }
  }, [debouncedTerm]);

  if (theme === false) {
    onThemeChange();
  } else {
    resetTheme();
  }

  return (
    <React.Fragment>
      <div className="search-bar_container">
        <div className="search-bar">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="search-container"
          >
            <i className="fa-solid fa-magnifying-glass icon"></i>
            <input
              type="text"
              placeholder="Search for a country..."
              className="search-input"
              value={term}
              onChange={(e) => {
                setTerm(e.target.value);
              }}
            />
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchBar;
