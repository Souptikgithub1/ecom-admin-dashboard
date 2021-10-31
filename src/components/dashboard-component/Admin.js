import './Admin.css';
import RightNav from "./dashboard-child-components/righ-nav-component/RightNav";
import {Route, Switch, useLocation} from "react-router-dom";
import ManageCategories from "../category/ManageCategories";
import {Icon} from "@material-ui/core";
import {useEffect, useState} from "react";
import CardComponent from "../../util-components/card-component/CardComponent";
import {useAppContext} from "../../context/AppContext";
import ManageProducts from "../manage-products/ManageProducts";
import ManageAttributes from "../manage-attributes/ManageAttributes";

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
    },
    {
        name: 'Manage Products',
        to: 'products',
        selected: '',
        icon: 'build'
    }
]

const Admin = () => {
    const [appBarHeader, setAppBarHeader] = useState('')
    const {getCategories, getInitialAttributes, setLoading} = useAppContext();
    const location = useLocation();
    useEffect(() => {
        setLoading(true)
        getCategories().then(res => {setLoading(false)})
        getInitialAttributes().then(res => {})
    }, [])

    useEffect(() => {
        setAppBarHeader(navMenuItems.filter(item => item.to === location.pathname.split('/')[2])[0].name)
    }, [location])


    return <div className='dashboard-container'>
        <div className='nav-panel'><RightNav navMenuItems={navMenuItems} /></div>
        <div className='dashboard-content'>
            <div className='nav-bar-top'>
                <div className='app-header'>{appBarHeader}</div>
                <div className='nav-icons-right'>
                    <Icon className='nav-icon'>notifications</Icon>
                    <Icon className='nav-icon'>person</Icon>
                </div>
            </div>
            <div className='manage-page-containers'>
                <Switch>
                    <Route path='/admin/categories' component={ManageCategories} />
                    <Route path='/admin/attributes' component={ManageAttributes} />
                    <Route path='/admin/category-attributes' component={() => <div>
                        <CardComponent headerText='Manage Category Attributes' iconName='add_to_photos' />
                    </div>} />
                    <Route path='/admin/products' component={ManageProducts} />
                </Switch>
            </div>
        </div>
    </div>
}

export default Admin