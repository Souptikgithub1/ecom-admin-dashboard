import './App.css';
import { Redirect, Route, Switch } from "react-router-dom";
import Admin  from './components/dashboard-component/Admin';


const App = () => {
  return (
    <div className='app-container'>
        {/*<Link to='/signup'>signup</Link>
        <Link to='/'>Home</Link>
        <Link to='/login'>login</Link>*/}
      <Switch>
        <Route exact path='/' ><Redirect to='/admin/categories' /></Route>
          <Route path='/admin' component={Admin}></Route>
        <Route path='/signup' component={() => <div>signup</div>}></Route>
        <Route path='/login' component={() => <div>login</div>}></Route>
      </Switch>
    </div>
  );
}

export default App;
