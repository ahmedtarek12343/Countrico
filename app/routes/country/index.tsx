import type { Route } from "./+types";
import type { country } from "~/types";
import { Link } from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";


export async function loader({ request, params }: Route.LoaderArgs): Promise<{
  country: country;
  borders: country[];
  images: any;
}> {
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${params.countryName}`
  );
  if (!res.ok) throw new Error("Country not found");
  const data = (await res.json()) as country[];
  const [mainCountry] = data;

  const res2 = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${mainCountry?.borders?.join(",")}`
  );
  if (!res.ok) throw new Error("Border Countries not found");
  const data2 = (await res2.json()) as country[];
  const borders = data2;

  const res3 = await fetch(
    `https://api.unsplash.com/search/photos?query=${mainCountry.name.common}&per_page=5&client_id=aGQjBfXsmAIfYIj2FlKt7ku2CcVmzDkNtrPV7VCyZqc`
  );
  if (!res.ok) throw new Error("Image not found");
  const data3 = await res3.json();
  const images = data3;

  return { country: mainCountry, borders, images };
}

const Country = ({ loaderData }: Route.ComponentProps) => {
  let { country, borders, images } = loaderData;
  if (borders.length > 0)
    borders = borders.filter((country) => country.name.common !== "Israel");

  const [imageClicked, setImageClicked] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const imagesArr = images.results.map((image: any) => image.urls.regular);

  return (
    <div>
      <AnimatePresence>
        {imageClicked && (
          <motion.div
            className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/40 backdrop-blur-3xl flex items-center justify-center"
            onClick={() => setImageClicked(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setImageClicked(false)}
              className="absolute top-15 right-15 text-white transition hover:text-red-500 hover:rotate-90 cursor-pointer text-[clamp(2rem,7dvw,4rem)]"
            >
              <MdClose />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (imageIndex === 0) {
                  setImageIndex(imagesArr.length - 1);
                  return;
                }
                setImageIndex((prev) => prev - 1);
              }}
              className="absolute top-1/2 text-white p-5 rounded-3xl bg-accent cursor-pointer -translate-y-1/2 left-2 sm:left-30 md:left-60 text-[clamp(1.6rem,5vw,2.5rem)]"
            >
              &larr;
            </button>
            <motion.img
              src={imagesArr[imageIndex]}
              alt={country.name.common}
              className="max-w-[90%] max-h-[90%] object-contain rounded-3xl"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (imageIndex === imagesArr.length - 1) {
                  setImageIndex(0);
                  return;
                }
                setImageIndex((prev) => prev + 1);
              }}
              className="absolute p-5 text-white rounded-3xl bg-accent cursor-pointer top-1/2 -translate-y-1/2 right-2 sm:right-30 md:right-60 text-[clamp(1.6rem,5vw,2.5rem)]"
            >
              &rarr;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Link
        to="/countries"
        className="captialize mt-20 inline-block ml-10 text-[clamp(1.6rem,5vw,2.5rem)] dark:text-white dark:hover:underline text-accent transition hover:text-accent/80"
      >
        &larr; Back to Countries
      </Link>
      <div className="p-10">
        <h1 className="text-[clamp(2rem,5vw,5rem)] font-semibold mb-5">
          {country.name.common} — {country.name.official}
        </h1>
        <p className="text-[clamp(1.2rem,3vw,2rem)] mb-2">
          Region: {country.region}
        </p>
        <p className="text-[clamp(1.2rem,3vw,2rem)] mb-2">
          Population: {country.population.toLocaleString()}
        </p>
        <p className="text-[clamp(1.2rem,3vw,2rem)] mb-2">
          Capital: {country.capital}
        </p>
        <span className="text-[clamp(1.2rem,3vw,2rem)] mb-2">
          {Object.values(country.languages).length === 1
            ? "Spoken Language"
            : "Spoken Languages"}
          :{" "}
          {Object.values(country.languages).map((language) => (
            <span className="" key={language}>
              {language}{" "}
            </span>
          ))}
        </span>
      </div>

      {images.results.length > 0 ? (
        <div className="p-10">
          <p className="text-[clamp(1.2rem,3vw,2rem)] mb-10">Images:</p>
          <div className="flex gap-25 items-center max-w-[170rem] mx-auto px-5 justify-center flex-wrap">
            {images.results.map((image: any, i: number) => (
              <img
                src={image.urls.regular}
                alt={image.description}
                onClick={() => {
                  setImageClicked(true);
                  setImageIndex(i);
                }}
                className="object-cover cursor-pointer hover:scale-90 transition-all duration-200 ease-in aspect-video w-[90%] max-w-[50rem] rounded-2xl"
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="p-10 text-[clamp(1.2rem,3vw,2rem)]">No Images Found.</p>
      )}

      {/* Border Countries */}
      {borders.length > 0 ? (
        <div className="p-10">
          <p className="text-[clamp(1.2rem,3vw,2rem)] mb-10">
            Border Countries:
          </p>
          <div className="flex gap-25 items-center max-w-[170rem] mx-auto px-5 justify-center flex-wrap">
            {borders.map((borderCountry) => (
              <Link
                to={`/countries/${borderCountry.name.common}`}
                key={borderCountry.name.common}
              >
                <div className="p-5 border border-bg rounded-2xl grid place-items-center gap-10">
                  <img
                    src={borderCountry.flags.png}
                    alt={borderCountry.name.common}
                    className="object-cover aspect-video w-[90%] max-w-[30rem] rounded-2xl"
                  />
                  <p className="text-[clamp(1.2rem,3vw,2rem)]">
                    {borderCountry.name.common}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <p className="p-10 text-[clamp(1.2rem,3vw,2rem)]">
          No Border Countries
        </p>
      )}
      <img
        src={country.flags.png}
        alt=""
        className="fixed top-0 w-full h-full opacity-50 z-[-1] blur-md"
      />
    </div>
  );
};

export default Country;
