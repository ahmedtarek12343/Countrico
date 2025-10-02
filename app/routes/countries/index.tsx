import { useState } from "react";
import type { Route } from "./+types";
import type { country } from "~/types";
import React, { Suspense, lazy } from "react";
import { Await } from "react-router";

const CountryCard = lazy(() => import("~/components/CountryCard"));

export async function loader({ request }: Route.LoaderArgs) {
  // Create a promise but don't await it
  const countriesPromise = fetch(
    "https://restcountries.com/v3.1/all?fields=name,capital,flags,region,subregion,population"
  ).then((res) => res.json());

  // Return the promise wrapped in an object
  return { allCountries: countriesPromise };
}

const CountriesPage = ({ loaderData }: Route.ComponentProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <div className="max-w-[160rem] mx-auto px-4 my-10">
      <h1 className="text-[clamp(2rem,5vw,5rem)] font-semibold my-10">
        Countries
      </h1>
      <div className="flex gap-10 my-10">
        <div className="flex-4">
          <input
            type="text"
            placeholder="Search for a country..."
            className="p-5 border-2 border-gray-300 rounded-2xl w-full text-[clamp(1.2rem,3vw,2rem)]"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <select
            name="region"
            value={selectedCategory}
            className="p-5 border-2 border-gray-300 rounded-2xl  w-full text-[clamp(1.2rem,3vw,2rem)]"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All" className="text-black">
              All
            </option>
            <option value="Africa" className="text-black">
              Africa
            </option>
            <option value="Americas" className="text-black">
              Americas
            </option>
            <option value="Asia" className="text-black">
              Asia
            </option>
            <option value="Europe" className="text-black">
              Europe
            </option>
            <option value="Oceania" className="text-black">
              Oceania
            </option>
          </select>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="flex justify-center text-[clamp(1.2rem,3vw,2rem)] p-10 mt-20">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <Await resolve={loaderData.allCountries}>
          {(allCountries: country[]) => {
            const filteredData = allCountries.filter(
              (country) => country.name.common !== "Israel"
            );

            const regions = new Set(
              filteredData.map((country) => country.region)
            );

            let filteredCountries =
              selectedCategory === "All"
                ? filteredData
                : filteredData.filter(
                    (country) => country.region === selectedCategory
                  );

            filteredCountries = filteredCountries.filter((country) =>
              country.name.common
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            );

            return (
              <>
                <ul className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-15 max-w-[160rem] p-5 mx-auto">
                  {filteredCountries.length === 0 ? (
                    <p className="text-[clamp(1.2rem,3vw,2rem)]">
                      No countries found
                    </p>
                  ) : (
                    filteredCountries.map((country) => (
                      <CountryCard
                        key={country.name.common}
                        country={country}
                      />
                    ))
                  )}
                </ul>
              </>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export default CountriesPage;
