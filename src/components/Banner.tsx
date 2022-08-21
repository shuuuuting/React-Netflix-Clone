import React, { useEffect, useState } from "react"
import axios from "../axios"
import { BASE_IMG_URL } from "../app.config"
import "../css/Banner.css"
import { requests } from "../requests"

export const Banner = () => {
  // todo: add movie type
  const [movie, setMovie] = useState<any>() // a random movie for banner

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals)
      setMovie(request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ])
    }
    fetchData()
  }, [])

  function truncate(text: string, numOfWords: number) {
    return text?.length > numOfWords ? (text.substring(0, numOfWords-1) + "...") : text
  }

  return (
    <header 
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: movie?.backdrop_path
          ?`url(${BASE_IMG_URL}${movie.backdrop_path})`
          : "",
        backgroundPosition: "center center"
      }}
    >
      <div className="banner-contents">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner-buttons">
          <button className="banner-button">Play</button>
          <button className="banner-button">My List</button>
        </div>

        <h1 className="banner-description">{truncate(movie?.overview, 500)}</h1>
      </div>
      <div className="banner-bottom-fade"/>
    </header>
  )
}
