import React, {useContext, useReducer} from 'react';
import appReducer from "./appReducer";
import {
    ADD_CATEGORY,
    FAILURE,
    LOCAL_STORAGE_USER,
    LOGIN,
    SET_CATEGORIES,
    SET_LOADING, SHOW_SNACK,
    SUCCESS
} from "../utils/StringConstants";
import axios from 'axios';
import {CATEGORIES_URL} from "../utils/ApiConstants";

const initState = {
    user: null,
    categories: [],
    isLoading: false,
    showSnack: {message: '', color: 'success', show: false}
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
                setLoading(false)
                return Promise.resolve(FAILURE)
            })
    }

    const login = (loginPayload) => {
        setLoading(true)
        if (loginPayload.password === '1234') {
            dispatch({type: LOGIN, payload: loginPayload})
            localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(loginPayload))
            setLoading(false)
            return Promise.resolve(SUCCESS)
        } else {
            setLoading(false)
            return Promise.resolve(FAILURE)
        }
    }

    const autoLogin = async () => {
        const user = localStorage.getItem(LOCAL_STORAGE_USER)
        if (!!user) {
            console.log('autologin', user)
            dispatch({type: LOGIN, payload: JSON.parse(user)})
            return (SUCCESS)
        } else {
            return (FAILURE)
        }
    }

    const showSnackBar = (snackPayload) => {
        console.log(snackPayload)
        dispatch({type: SHOW_SNACK, payload: snackPayload})
        setTimeout(() => {
            dispatch({type: SHOW_SNACK, payload: {...snackPayload, show: false}})
        }, 3000)
    }

    return (
        <AppContext.Provider
            value={{
                ...state,
                setLoading,
                getCategories,
                addCategory,
                login,
                autoLogin,
                showSnackBar
            }}
        >{children}</AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, AppContext }