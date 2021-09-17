import './Admin.css';
import RightNav from "./dashboard-child-components/righ-nav-component/RightNav";
import { Route, Switch} from "react-router-dom";
import ManageCategories from "../category/ManageCategories";
import {Icon} from "@material-ui/core";
import {useEffect, useState} from "react";
import CardComponent from "../../util-components/card-component/CardComponent";

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
        setAppBarHeader(navMenuItems.filter(item => item.to === arr[arr.length - 1])[0].name)
    }, [window.location.href])


    return <div className='dashboard-container'>
        <div className='nav-panel'><RightNav navMenuItems={navMenuItems} /></div>
        <div className='dashboard-content'>
            <div className='nav-bar-top'>
                <div className='app-header'>{appBarHeader}</div>
                <div className='nav-icons-right'><Icon>notifications</Icon></div>
            </div>
            <div className='manage-page-containers'>
                <Switch>
                    <Route path='/admin/categories' component={ManageCategories} />
                    <Route path='/admin/attributes' component={() => <div>
                        <CardComponent headerText='Manage Attributes' iconName='ballot' />
                    </div>} />
                    <Route path='/admin/category-attributes' component={() => <div>
                        <CardComponent headerText='Manage Category Attributes' iconName='add_to_photos' />
                    </div>} />
                </Switch>
            </div>
        </div>
    </div>
}

export default Admin