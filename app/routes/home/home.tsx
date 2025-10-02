import type { Route } from "./+types/home";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router";

// optional modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="max-w-[140rem] flex-col lg:flex-row mx-auto px-10 h-[calc(100vh-7rem)] flex lg:items-center">
      <div className="flex-1 flex justify-center h-full flex-col">
        <h1 className="text-[clamp(2rem,5vw,5rem)] md:leading-20 font-semibold ">
          Explore countries with <br /> Real-Time Data
        </h1>
        <p className="text-gray-500 font-medium text-3xl w-[80%] mt-10">
          Discover details about every country around the world - from capitals
          to regions!
        </p>
        <div className="flex gap-10 items-center mt-20">
          <Link
            to="countries"
            className="px-12 py-6 text-[clamp(1.2rem,3vw,2rem)] bg-purple-800 rounded-2xl text-white transition hover:bg-purple-900"
          >
            Get Started
          </Link>
          <Link
            to="about"
            className="px-12 py-6 text-[clamp(1.2rem,3vw,2rem)] border border-purple-800 rounded-2xl text-purple-800 transition-all duration-200 hover:text-white hover:bg-accent"
          >
            Learn More
          </Link>
        </div>
      </div>
      <div className="flex-1 flex justify-start lg:justify-center mt-20">
        <div className="w-full max-w-[60rem]">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
            className="mySwiper rounded-2xl"
          >
            <SwiperSlide>
              <img
                src="https://images.pexels.com/photos/33984908/pexels-photo-33984908.jpeg"
                alt="Explore countries"
                className="object-cover w-full h-full rounded-2xl"
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src="https://images.pexels.com/photos/8285057/pexels-photo-8285057.jpeg"
                alt="Explore countries"
                className="object-cover w-full h-full rounded-2xl"
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src="https://images.pexels.com/photos/32984814/pexels-photo-32984814.jpeg"
                alt="Explore countries"
                className="object-cover w-full h-full rounded-2xl"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
