import './App.css';
import { Redirect, Route, Switch } from "react-router-dom";
import Admin  from './components/dashboard-component/Admin';
import Loader from "./util-components/loader/Loader";
import {useAppContext} from "./context/AppContext";
import {useEffect} from "react";


const App = () => {
    const {isLoading, getCategories} = useAppContext();
    useEffect(() => {
        getCategories().then(res => {})
    }, [])
  return (
    <div className='app-container'>
      <Switch>
        <Route exact path='/' ><Redirect to='/admin/categories' /></Route>
          <Route path='/admin' component={Admin}></Route>
        <Route path='/signup' component={() => <div>signup</div>}></Route>
        <Route path='/login' component={() => <div>login</div>}></Route>
      </Switch>
        {!!isLoading ? <Loader /> : ''}
    </div>
  );
}

export default App;
