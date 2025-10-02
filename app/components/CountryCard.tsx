import React from "react";
import type { country } from "~/types";
import { Link } from "react-router";

const CountryCard = ({ country }: { country: country }) => {
  return (
    <Link to={`/countries/${country.name.common}`} key={country.name.common}>
      <li
        id="card"
        className="p-15 border-2 hover:border-accent transition rounded-3xl cursor-pointer bg-card shadow-lg flex justify-between items-center relative overflow-hidden"
      >
        {" "}
        <div className="">
          <h2 className="text-[clamp(1.2rem,3vw,2.4rem)] dark:text-white text-accent">
            {country?.name?.common || "N/A"}
          </h2>
          <p className="text-[clamp(1rem,2vw,1.4rem)] dark:text-gray-400 text-gray-700">
            Region: {country?.region || "N/A"}
          </p>
        </div>
        <img
          src={country.flags.png}
          alt={country.name.common}
          id="country-name"
          className="absolute object-cover top-1/2 transition-all -translate-y-1/2 right-0 w-[40%] h-full"
        />
      </li>
    </Link>
  );
};

export default CountryCard;
