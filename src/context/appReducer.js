import {ADD_CATEGORY, SET_CATEGORIES, SET_LOADING} from "../utils/StringConstants";

const appReducer = (state, action) => {
    switch (action.type) {
        case SET_LOADING: return {...state, isLoading: action.payload}

        case SET_CATEGORIES: return {...state, categories: action.payload}

        case ADD_CATEGORY:
            const categories = [...state.categories]
            categories.push(action.payload)
            return {...state, categories}
    }
}

export default appReducer