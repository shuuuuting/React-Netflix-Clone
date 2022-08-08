import axios from "axios"

// base url to make requests
export default instance = axios.create({
    baseURL: "http://api.themoviedb.org/3"
})

// example:
// instance.get("/foo-bar")
// "http://api.themoviedb.org/3/foo-bar"
