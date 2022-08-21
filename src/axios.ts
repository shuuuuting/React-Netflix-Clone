import axios from "axios"
import { BASE_URL } from "./app.config"

// base url to make requests
const instance = axios.create({
    baseURL: BASE_URL
})

export default instance
// use export default can use any name u want 
// and be imported as another name in another file 

// example:
// instance.get("/foo-bar")
// "http://api.themoviedb.org/3/foo-bar"
