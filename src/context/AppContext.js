import React, {useContext, useReducer} from 'react';
import appReducer from "./appReducer";
import {ADD_CATEGORY, FAILURE, SET_CATEGORIES, SET_LOADING, SUCCESS} from "../utils/StringConstants";
import axios from 'axios';
import {CATEGORIES_URL} from "../utils/ApiConstants";

const initState = {
    categories: [],
    isLoading: false
};

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(appReducer, initState);

    const setLoading = (value) => {
        dispatch({type: SET_LOADING, payload: value})
    }

    const getCategories = async () => {
        setLoading(true)
        return await axios.get(CATEGORIES_URL)
            .then(res => {
                dispatch({type: SET_CATEGORIES, payload: res.data})
                setLoading(false)
                return Promise.resolve(SUCCESS)
            }).catch(err => {
                console.log(err)
                setLoading(false)
                return Promise.resolve(FAILURE)
            })
    }

    const addCategory = async (category) => {
        setLoading(true)
        return await axios.post(CATEGORIES_URL, category)
            .then(res => {
                console.log(res.data)
                dispatch({type: ADD_CATEGORY, payload: res.data})
                setLoading(false)
                return Promise.resolve(SUCCESS)
            }).catch(err => {
                return Promise.resolve(FAILURE)
            })
    }

    return (
        <AppContext.Provider
            value={{
                ...state,
                setLoading,
                getCategories,
                addCategory
            }}
        >{children}</AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, AppContext }