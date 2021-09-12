import React, {useContext, useReducer} from 'react';
import appReducer from "./appReducer";
import {SET_LOADING} from "../utils/StringConstants";

const initState = {
    user: null,
    isFetching: true,
    isUpdating: false,
    isLoading: false
};

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(appReducer, initState);

    const setLoading = (value) => {
        dispatch({type: SET_LOADING, payload: value})
    }

    return (
        <AppContext.Provider
            value={{
                ...state,
                setLoading
            }}
        >{children}</AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, AppContext }