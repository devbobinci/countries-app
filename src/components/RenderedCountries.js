import React, { useState } from "react";
import Country from "./Country";
import CountryPage from "./CountryPage";

const RenderedCountries = ({
  search,
  results,
  theme,
  setSelectedCountry,
  selectedCountry,
  setSelectedCountryItem,
  selectedCountryItem,
}) => {
  // let showPopulation;
  const renderedResults = results.map((result) => {
    const showPopulation = result.population.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });

    return (
      <Country
        key={search ? result.alpha2Code : result.altSpellings}
        result={result}
        showPopulation={showPopulation}
        theme={theme}
        search={search}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedCountryItem={selectedCountryItem}
        setSelectedCountryItem={setSelectedCountryItem}
      />
    );
  });

  return (
    <React.Fragment>
      <div className="countries-container">
        <div className="error-container">
          <h3 className="error-message">
            There is no place with a name: <span className="term"></span>
          </h3>
        </div>
        {renderedResults}
      </div>
    </React.Fragment>
  );
};

export default RenderedCountries;
