import React from "react";
// import movie from "../assests/movie.jpg";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const Latest = (props) => {
  const u = props.u;
  var Heading = "heading";
  var url="url";
  if (u==="trending") {
  url=`${process.env.REACT_APP_TRENDING_URL}`;
  }
  else {
   url = `${process.env.REACT_APP_MOVIE_URL}/${u}${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;
  }
  const [movies, setMovies] = useState([]);

  const getMovies = useCallback(async () => {
    const response = await fetch(url);
    const movies = await response.json();
    setMovies(movies.results);
  }, [url]);

  useEffect(() => {
    getMovies();
  }, [url, getMovies]);
  console.log(movies);

  if (u === "popular") {
    Heading = "Popular";
  } else if (u === "upcoming") {
    Heading = "Upcoming";
  } else if (u === "top_rated") {
    Heading = "Top Rated";
  } else if (u === "now_playing") {
    Heading = "Now Playing";
  }
   else if (u === "trending") {
    Heading = "Trending";
  }
  return (
    <>
      <div className="moviesmain">
        <h1>
          {Heading}
        </h1>
        <div className="movies">
          <div className="popularmovies">
            {movies.map((movie) => (
              <div className="popularmovie">
                <Link to={`/${movie.id}`} style={{ textDecoration: "none" }}>
                  <div className="popularimage">
                    <img
                      src={`${process.env.REACT_APP_IMAGE_URL}/${movie.poster_path}`}
                      alt=""
                    />
                  </div>
                  <div className="popular" style={{display: "flex"}}>
                    <h2 style={{ marginRight: "10px" }}>Rating: </h2>
                    <h2>{movie.vote_average} &#11088;</h2>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Latest;
