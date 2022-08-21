import React, { useEffect, useState } from "react"
import "../css/NavBar.css"
import { requests } from "../requests"

export const NavBar = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // show black background once user scrolls exceed 100
    window.addEventListener("scroll", () => {
      window.scrollY > 100 ? setShow(true) : setShow(false)
    })
    return () => {
      window.removeEventListener("scroll", () => {})
    }
  }, [])

  return (
    <div className={`navbar ${show && "navbar-black"}`}>
      <img
        className="navbar-logo"
        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
        alt="Netflix Logo"
      />
      <img
        className="navbar-avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="Netflix Avatar"
      />
      <div className="row-posters">
      </div>
    </div>
  )
}
