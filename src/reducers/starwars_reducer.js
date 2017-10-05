export default function reducer(state = {
    planets: [],
    error: "",
    users: []
}, action) {

    switch (action.type) {
        case "FETCH_PLANETS_REJECTED": {
            return Object.assign({}, state, { error: action.payload })
        }
        case "FETCH_PLANETS_FULFILLED": {
            return Object.assign({}, state, { planets: action.payload });
        }
        case "FETCH_USERS_FULFILLED": {
            return Object.assign({}, state, { users: action.payload });
        }
        case "FETCH_USERS_REJECTED": {
            return Object.assign({}, state, { users: action.payload });
        }

    }
    return state
}






