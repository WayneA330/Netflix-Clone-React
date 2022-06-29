import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import requests from "../Requests";

const Main = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <Carousel
      indicators={false}
      navButtonsAlwaysVisible={true}
      //   fullHeightHover={true}
    >
      {movies.map((item, i) => (
        <div className="w-full h-[600px] text-white" key={i}>
          <div className="w-full h-full">
            <div className="absolute w-full h-[600px] bg-gradient-to-r from-black"></div>
            {item && item.backdrop_path && (
              <img
                className="w-full h-full object-cover"
                src={`https://image.tmdb.org/t/p/original${item?.backdrop_path}`}
                alt={item?.title}
              />
            )}
            <div className="absolute w-full top-[20%] p-4 md:p-8 ml-8">
              <h1 className="text-3xl md:text-5xl font-bold">{item?.title}</h1>
              <div className="my-4">
                <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">
                  Play
                </button>
                <button className="border text-white border-gray-300 py-2 px-5 ml-4">
                  Watch Later
                </button>
              </div>
              <p className="text-gray-400 text-sm">
                Released: {item?.release_date}
              </p>
              <p className="w-full my-4 md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
                {truncateString(item?.overview, 150)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Main;
