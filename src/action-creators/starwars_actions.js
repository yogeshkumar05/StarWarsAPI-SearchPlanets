import axios from "axios";
import store from './../store'
export function searchPlanet(searchQuery) {
    axios.get("https://swapi.co/api/planets/?search=" + searchQuery)
        .then((response) => {
            store.dispatch({ type: "FETCH_PLANETS_FULFILLED", payload: response.data.results })
        })
        .catch((err) => {
            store.dispatch({ type: "FETCH_PLANETS_REJECTED", payload: err })
        })
}

export function fetchUsers() {
    axios.get("https://swapi.co/api/people/")
        .then((response) => {
            store.dispatch({ type: "FETCH_USERS_FULFILLED", payload: response.data.results })
        })
        .catch((err) => {
            store.dispatch({ type: "FETCH_USERS_REJECTED", payload: err })
        })
}
