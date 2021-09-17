import './App.css';
import { Redirect, Route, Switch } from "react-router-dom";
import Admin  from './components/dashboard-component/Admin';
import Loader from "./util-components/loader/Loader";
import {useAppContext} from "./context/AppContext";
import {getUser} from "./utils/CommonUtils";
import LoginPage from "./creative-components/views/LoginPage/LoginPage";


const App = () => {
    const {isLoading} = useAppContext();

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
        {!!isLoading ? <Loader /> : ''}
    </div>
  );
}

export default App;
