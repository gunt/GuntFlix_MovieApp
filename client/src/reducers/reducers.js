// src/reducers/reducers.js
import {
    combineReducers
} from 'redux';

import {
    SET_FILTER,
    SET_MOVIES
} from '../actions/actions';

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}

function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.value;
        default:
            return state;
    }
}

// function moviesApp(state = {}, action) {
//     return {
//         visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//         movies: movies(state.movies, action)
//     }
// }

// moviesApp is a combined reducer (a reducer made out of other reducers) //Splits in to two smaller reducers
const moviesApp = combineReducers({
    visibilityFilter,
    movies
});

export default moviesApp;