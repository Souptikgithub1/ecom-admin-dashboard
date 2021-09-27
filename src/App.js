import './App.css';
import { Redirect, Route, Switch } from "react-router-dom";
import Admin  from './components/dashboard-component/Admin';
import Loader from "./util-components/loader/Loader";
import {useAppContext} from "./context/AppContext";
import {getUser} from "./utils/CommonUtils";
import LoginPage from "./creative-components/views/LoginPage/LoginPage";
import React from "react";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";


const App = () => {
    const {isLoading, showSnack} = useAppContext();

  return (
    <div className='app-container'>
      <Switch>
        <Route exact path='/' >
            {!!getUser() ? <Redirect to='/admin/categories' /> : <Redirect to='/login' />}
        </Route>
        <Route path='/admin' >{!!getUser() ? <Admin /> : <Redirect to='/login' />}</Route>
        <Route path='/signup' component={() => <div>signup</div>}/>
        <Route path='/login'>{!!getUser() ? <Redirect to='/admin/categories' /> : <LoginPage />}</Route>
      </Switch>
        <Loader open={isLoading} />

        <Snackbar open={!!showSnack.show} autoHideDuration={3000} >
            <Alert elevation={6} variant='filled' severity={showSnack.color} sx={{ width: '100%' }}>
                {showSnack.message}
            </Alert>
        </Snackbar>
    </div>
  );
}

export default App;
