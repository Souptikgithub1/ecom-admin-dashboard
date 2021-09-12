import './Admin.css';
import RightNav from "./dashboard-child-components/righ-nav-component/RightNav";
import { Route, Switch} from "react-router-dom";
import ManageCategories from "../category/ManageCategories";
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";

const navMenuItems = [
    {
        name: 'Manage Categories',
        to: 'categories',
        selected: 'selected',
        icon: 'category'
    },
    {
        name: 'Manage Attributes',
        to: 'attributes',
        selected: '',
        icon: 'ballot'
    },
    {
        name: 'Category Attributes',
        to: 'category-attributes',
        selected: '',
        icon: 'add_to_photos'
    }
]

const Admin = () => {

    const [appBarHeader, setAppBarHeader] = useState('')

    useEffect(() => {
        const arr = window.location.href.split('/');
        setAppBarHeader(navMenuItems.filter(item => item.to === arr[arr.length - 1])[0].name.toUpperCase())
    }, [window.location.href])


    return <div className='dashboard-container'>
        <div className='nav-panel'><RightNav navMenuItems={navMenuItems} /></div>
        <div className='dashboard-content'>
            <AppBar position="static" color='secondary' style={{backgroundColor: '#111', opacity: 1}}>
                <Toolbar>
                    <Typography variant="h6">
                        {appBarHeader}
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className='manage-page-containers'>
                <Switch style={{height: '100%'}}>
                    <Route path='/admin/categories' component={ManageCategories} />
                    <Route path='/admin/attributes' component={() => <div>manage attributes</div>} />
                    <Route path='/admin/category-attributes' component={() => <div>manage category attributes</div>} />
                </Switch>
            </div>
        </div>
    </div>
}

export default Admin