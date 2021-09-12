import {SET_LOADING} from "../utils/StringConstants";

const appReducer = (state, action) => {
    switch (action.type) {
        case SET_LOADING: return {...state, isLoading: action.payload}
    }
}

export default appReducer