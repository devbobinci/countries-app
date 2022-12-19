import React, { useState } from "react";
import sass from "./styles.scss";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import SelectRegion from "./components/SelectRegion";
import RenderedCountries from "./components/RenderedCountries";
import CountryPage from "./components/CountryPage";

const App = () => {
  const [theme, setTheme] = useState(true);
  const [results, setResults] = useState([]);
  const [regionResults, setRegionResults] = useState([]);
  const [search, setSearch] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(false);
  const [selectedCountryItem, setSelectedCountryItem] = useState(null);

  const onThemeChange = () => {
    document.querySelector(".container").classList.add("dark-mode");
  };

  if (theme === false) {
    onThemeChange();
  }

  const resetTheme = () => {
    if (theme === true) {
      document.querySelectorAll(".dark-mode").forEach((el) => {
        el.classList.remove("dark-mode");
      });
    }
  };

  return (
    <div className={theme ? "container" : "container dark-mode"}>
      <Header theme={theme} setTheme={setTheme} />
      <div className="wrapper">
        <div className="search-options_container">
          <SearchBar
            search={search}
            setSearch={setSearch}
            theme={theme}
            results={results}
            setResults={setResults}
            setSelectedRegion={setSelectedRegion}
            resetTheme={resetTheme}
          />
          <SelectRegion
            setSearch={setSearch}
            theme={theme}
            setRegionResults={setRegionResults}
            setSelectedRegion={setSelectedRegion}
            selectedRegion={selectedRegion}
            resetTheme={resetTheme}
          />
        </div>
        {search ? (
          <RenderedCountries
            search={search}
            results={results}
            theme={theme}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedCountryItem={selectedCountryItem}
            setSelectedCountryItem={setSelectedCountryItem}
          />
        ) : (
          <RenderedCountries
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedCountryItem={selectedCountryItem}
            setSelectedCountryItem={setSelectedCountryItem}
            search={search}
            results={regionResults}
            theme={theme}
          />
        )}
        {selectedCountry ? (
          <div className="country-page__container">
            <CountryPage
              result={selectedCountryItem}
              setSelectedCountryItem={setSelectedCountryItem}
              setSelectedCountry={setSelectedCountry}
              selectedCountryItem={selectedCountryItem}
              selectedCountry={selectedCountry}
              theme={theme}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
