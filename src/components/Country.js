import React from "react";

const Country = ({
  result,
  showPopulation,
  theme,
  search,
  setSelectedCountry,
  setSelectedCountryItem,
}) => {
  const showCountry = () => {
    document
      .querySelector(".search-options_container")
      .classList.add("hide-container");

    document
      .querySelector(".countries-container")
      .classList.add("hide-container");

    setSelectedCountry(true);
    setSelectedCountryItem(result);
  };

  return (
    <React.Fragment>
      <div
        onClick={showCountry}
        key={search ? result?.ccn3 : result.alpha2Code}
        className={theme ? "country" : "country dark-mode"}
      >
        <div
          className="country-flag"
          style={{
            backgroundImage: `url(${
              search ? result?.flag : result?.flags?.svg
            })`,
          }}
        ></div>
        <div className={theme ? "country-info" : "country-info dark-mode"}>
          <h3 className={theme ? "country-name" : "country-name dark-mode"}>
            {search ? result?.name : result?.name?.common}
          </h3>
          <p
            className={
              theme
                ? "country-detail country-pop"
                : "country-detail country-pop dark-mode"
            }
          >
            Population: <span className="population">{showPopulation}</span>
          </p>
          <p
            className={
              theme
                ? "country-detail country-region"
                : "country-detail country-region dark-mode"
            }
          >
            Region: <span className="region">{result?.region}</span>
          </p>
          <p
            className={
              theme
                ? "country-detail country-capital"
                : "country-detail country-capital dark-mode"
            }
          >
            Capital: <span className="capital">{result?.capital}</span>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Country;
