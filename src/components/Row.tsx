import React, { useEffect, useState } from "react"
import axios from "../axios"
import { BASE_IMG_URL } from "../app.config"
import "../css/Row.css"

export const Row = ({ title, fetchUrl, isLargeRow }: { title: string; fetchUrl: string; isLargeRow?: boolean }) => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl)
      setMovies(request.data.results)
    }
    fetchData()
  }, [fetchUrl])

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
          />
        ))}
      </div>
    </div>
  )
}
