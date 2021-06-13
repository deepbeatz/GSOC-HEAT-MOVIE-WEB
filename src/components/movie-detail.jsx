// import zIndex from "@material-ui/core/styles/zIndex";
import React from "react";
import ReactPlayer from "react-player";
import { Waypoint } from "react-waypoint";
import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const url1 = `${process.env.REACT_APP_MOVIE_URL}/${id}${process.env.REACT_APP_API_KEY}&language=en-US`;
  const video_url = `${process.env.REACT_APP_MOVIE_URL}/${id}/videos${process.env.REACT_APP_API_KEY}&language=en-US`;
  const [movie, setMovie] = useState([]);
  const [video, setVideo] = useState([]);

  const getMovie = useCallback(async () => {
    const response = await fetch(url1);
    const movie = await response.json();
    setMovie(movie);
  }, [url1]);

  useEffect(() => {
    getMovie();
  }, [url1, getMovie]);
  console.log(movie);

  const getVideo = useCallback(async () => {
    const response = await fetch(video_url);
    const video = await response.json();
    setVideo(video.results.slice(0, 5));
  }, [video_url]);

  useEffect(() => {
    getVideo();
  }, [video_url, getVideo]);
  console.log(movie);

  let [shouldPlay, updatePlayState] = useState(true);

  let handleEnterViewport = function () {
    updatePlayState(true);
  };
  let handleExitViewport = function () {
    updatePlayState(false);
  };

  // const videoRef = useRef(null);

  // useEffect(() => {
  //   let options = {
  //     rootMargin: "0px",
  //     threshold: [0.25, 0.75],
  //   };

  //   let handlePlay = (entries, observer) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         videoRef.current.play();
  //       } else {
  //         videoRef.current.pause();
  //       }
  //     });
  //   };

  //   let observer = new IntersectionObserver(handlePlay, options);
  //   // video.forEach((vid) => {
  //   observer.observe(videoRef.current);
  //   // });
  // });
  return (
    <>
      <img
        src={`${process.env.REACT_APP_IMAGE_URL}${movie.backdrop_path}`}
        alt=""
        className="backgroundimage"
      />
      <div
        className="tails"
        style={
          {
            // backgroundImage: `url(
            //   https://image.tmdb.org/t/p/original${movie.backdrop_path}
            // )`,
            // backgroundAttachment: "fixed",
            // backgroundPosition: "center",
            // backgroundSize: "cover",
            // width: "100vw",
            // marginTop: "0px",
          }
        }
      >
        {/* <div className="" style={{ zIndex: 3 }}> */}
        <div className="populardetails">
          <div className="detailsimage">
            <img
              src={`${process.env.REACT_APP_IMAGE_URL}${movie.poster_path}`}
              alt=""
            />
          </div>
          <div className="align">
            <div className="details">
              <div className="detailstitle">
                <h1>{movie.original_title}</h1>
              </div>
              <div className="desc">
                <div className="detailsdesc">
                  <h2>{movie.overview}</h2>
                </div>
              </div>
              <div className="real">
                <div className="realrow">
                  <div className="detailsrating">
                    <h2 style={{ marginRight: "10px" }}>Rating: </h2>
                    <h2>{movie.vote_average} &#11088;</h2>
                    {/* <span className="span"></span> */}
                  </div>
                  <div className="detailsruntime">
                    <h2>
                      Runtime: {Math.floor(movie.runtime / 60)}h{" "}
                      {movie.runtime % 60}min
                    </h2>
                  </div>
                  <div className="detailsruntime">
                    <h2>Release Date: {movie.release_date}</h2>
                  </div>

                  <div className="detailsgenres">
                    <h2>Genres:</h2>
                    {movie.genres?.map((genre) => (
                      <h2>{genre.name},</h2>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="vide">
          <div className="videos">
            <h1>Trailer Videos</h1>
            <div className="videoscroll">
              <div className="video">
                {video?.map((vid) => (
                  // <iframe
                  //   className="vid"
                  //   ref={videoRef}
                  //   src={`https://www.youtube.com/embed/${vid.key}`}
                  //   title="YouTube video player"
                  //   frameborder="0"
                  //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  //   allowfullscreen
                  // ></iframe>
                  <Waypoint onLeave={handleExitViewport}>
                    <ReactPlayer
                      // volume={0}
                      // muted={true}
                      playing={shouldPlay}
                      url={`https://www.youtube.com/embed/${vid.key}`}
                      className="vid"
                      // {...props}
                    />
                  </Waypoint>
                  // <ReactPlayer
                  //   url={`https://www.youtube.com/embed/${vid.key}`}
                  //   // ref={videoRef}
                  //   className="vid"
                  // />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Details;
