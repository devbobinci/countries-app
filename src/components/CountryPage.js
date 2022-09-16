import { isFocusable } from "@testing-library/user-event/dist/utils";
import React, { useEffect } from "react";

const CountryPage = ({
  result,
  setSelectedCountry,
  setSelectedCountryItem,
  theme,
}) => {
  if (result) {
    const onReturnBtn = () => {
      setSelectedCountry(false);
      setSelectedCountryItem(null);

      document
        .querySelector(".search-options_container")
        .classList.remove("hide-container");

      document
        .querySelector(".countries-container")
        .classList.remove("hide-container");
    };

    const showPopulation = result.population.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });

    const currency = Object.keys(result.currencies);
    const propertyCurrency = Object.values(currency);
    const currencyName = Object.values(result.currencies[propertyCurrency]);

    const languagesKey = Object.values(result.languages);
    const renderedLanguages = languagesKey.join(", ");

    const renderedLang = languagesKey.map((lang) => {
      return lang.name;
    });

    let borderCountry;
    if (result.borders) {
      borderCountry = result.borders.map((country) => {
        return (
          <div
            key={country}
            className={
              theme
                ? "border-country margin-on"
                : "border-country margin-on dark-mode"
            }
          >
            {country}
          </div>
        );
      });
    }

    return (
      <div className="country-page">
        <div className="return-btn__container">
          <button
            onClick={onReturnBtn}
            className={theme ? "return-btn" : "return-btn dark-mode"}
          >
            <i className="fas fa-long-arrow-alt-left icon"></i>Back
          </button>
        </div>
        <div className="country-container">
          <div
            className="country-page-flag"
            style={{
              backgroundImage: `url(${result.flags.svg})`,
            }}
          ></div>
          <div className="country-column-container">
            <h2 className={theme ? "country-name" : "country-name dark-mode"}>
              {result.name.common ? result.name.common : result.name}
            </h2>
            <div className="country-info-container">
              <div className="country-page-info">
                <p
                  className={
                    theme ? "country-detail" : "country-detail dark-mode"
                  }
                >
                  Native Name:{" "}
                  <span className="value">
                    {result.nativeName
                      ? result.nativeName
                      : result.name.official}
                  </span>
                </p>
                <p
                  className={
                    theme ? "country-detail" : "country-detail dark-mode"
                  }
                >
                  Population: <span className="value">{showPopulation}</span>
                </p>
                <p
                  className={
                    theme ? "country-detail" : "country-detail dark-mode"
                  }
                >
                  Region: <span className="value">{result.region}</span>
                </p>
                <p
                  className={
                    theme ? "country-detail" : "country-detail dark-mode"
                  }
                >
                  Sub Region: <span className="value">{result.subregion}</span>
                </p>
                <p
                  className={
                    theme ? "country-detail" : "country-detail dark-mode"
                  }
                >
                  Capital:{" "}
                  <span className="value">
                    {result.capital ? result.capital : null}
                  </span>
                </p>
              </div>

              <div className="country-page-info domain-container">
                <p
                  className={
                    theme ? "country-detail" : "country-detail dark-mode"
                  }
                >
                  Top Level Domain:
                  <span className="value">
                    {" "}
                    {result.tld ? result.tld[0] : result.topLevelDomain[0]}
                  </span>
                </p>
                <p
                  className={
                    theme ? "country-detail" : "country-detail dark-mode"
                  }
                >
                  Currencies:{" "}
                  <span className="value">
                    {!result.currencies[0]
                      ? currencyName[0]
                      : result.currencies[0].name}
                  </span>
                </p>
                <p
                  className={
                    theme ? "country-detail" : "country-detail dark-mode"
                  }
                >
                  Languages:{" "}
                  <span className="value">
                    {!result.languages[0]
                      ? renderedLanguages
                      : renderedLang.join(", ")}
                  </span>
                </p>
              </div>
            </div>
            <div className="border-container">
              <h3 className={theme ? "border-title" : "border-title dark-mode"}>
                Border Countries:
              </h3>
              <div className="border-countries">
                {!result.borders ? ["No countries around"] : borderCountry}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CountryPage;
