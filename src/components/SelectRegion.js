import axios from "axios";
import React, { useEffect } from "react";

const SelectRegion = ({
  theme,
  setRegionResults,
  setSearch,
  selectedRegion,
  setSelectedRegion,
  resetTheme,
}) => {
  const options = [
    { region: "africa", label: "Africa" },
    { region: "america", label: "America" },
    { region: "asia", label: "Asia" },
    { region: "europe", label: "Europe" },
    { region: "oceania", label: "Oceania" },
  ];

  const onThemeChange = () => {
    const elementsToChangeTheme = [
      document.querySelector(".region-panel"),
      document.querySelector(".region-list"),
      document.querySelector(".arrow-img"),
    ];

    for (let el of elementsToChangeTheme) {
      el.classList.add("dark-mode");
    }
  };

  if (theme === false) {
    onThemeChange();
  } else {
    resetTheme();
  }

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get(
        `https://restcountries.com/v3.1/region/${selectedRegion}`,
        {
          params: {
            region: selectedRegion,
          },
        }
      );
      setRegionResults(data);
    };

    if (selectedRegion) {
      search();
    }
  }, [selectedRegion]);

  const renderedOptions = options.map((option) => {
    const onRegionChange = () => {
      setSearch(false);
      setSelectedRegion(option.region);

      document.querySelector(".region-panel").innerHTML = `${option.label}
      <i class="fa-solid fa-chevron-down arrow-img"></i>

      `;
      document
        .querySelector(".region-list")
        .classList.remove("slide-region-list");

      document.querySelector(".error-container").classList.remove("show-error");
    };

    return (
      <li
        onClick={onRegionChange}
        key={option.region}
        value={option.region}
        className="item"
      >
        {option.label}
      </li>
    );
  });

  useEffect(() => {
    setSearch(false);
    const searchData = async () => {
      const { data } = await axios.get(`https://restcountries.com/v3.1/all`);
      setRegionResults(data);
    };
    searchData();
  }, []);

  return (
    <React.Fragment>
      <div className="select_container">
        <div
          onClick={() => {
            document
              .querySelector(".region-list")
              .classList.toggle("slide-region-list");
            document.querySelector(".arrow-img").classList.toggle("rotate");
          }}
          className="region-panel"
        >
          Filter by Region
          <i className="fa-solid fa-chevron-down arrow-img"></i>
        </div>
        <ul className="region-list">{renderedOptions}</ul>
      </div>
    </React.Fragment>
  );
};

export default SelectRegion;
