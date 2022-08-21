import React, { useEffect, useState } from "react"
import axios from "../axios"
import { BASE_IMG_URL } from "../app.config"
import "../css/Row.css"
import YouTube from "react-youtube"
const movieTrailer = require("movie-trailer")
// import movieTrailer from "movie-trailer"

export const Row = ({ title, fetchUrl, isLargeRow }: { title: string; fetchUrl: string; isLargeRow?: boolean }) => {
  const [movies, setMovies] = useState([])
  const [trailerUrl, setTrailerUrl] = useState<string|null>("")

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl)
      setMovies(request.data.results)
    }
    fetchData()
  }, [fetchUrl])

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }

  const handleClick = (movie: any) => {
    if (trailerUrl) { // already open
      setTrailerUrl("") //hide video
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
      .then((url: string) => {
        // sample yt url: https://www.youtube.com/watch?v=abcdefg
        const urlParams = new URLSearchParams(new URL(url).search)
        setTrailerUrl(urlParams.get("v")) // return abcdefg
      }).catch((error: any) => console.log(error))
    }
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-posters">
        {movies.map((movie: any) => (
          <img
            key={movie.id}
            className={`row-poster ${isLargeRow && "row-poster-larger"}`}
            src={movie.poster_path && movie.backdrop_path
              ?`${BASE_IMG_URL}${isLargeRow ? movie?.poster_path : movie?.backdrop_path}`
              : "" 
            }
            alt={movie.name}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}></YouTube>}
    </div>
  )
}
