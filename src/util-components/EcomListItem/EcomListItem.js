import {Icon, ListItem} from "@material-ui/core";
import './EcomListItem.css'
import {useHistory, useLocation} from "react-router-dom";
import $ from 'jquery';
import {useEffect} from "react";


const EcomListItem = (props) => {

    const history = useHistory();
    const location = useLocation()

    useEffect(() => {
        $('.js-list-item').removeClass('selected')
        $(`.${location.pathname.split('/')[2]}`).addClass('selected')
    }, [location])

    const handleSelectListItem = (event) => {
        //navigate to desired page
        history.push(props.to)
    }

    return <ListItem autoFocus
        className={'list-item-container js-list-item ' + props.to}
        onClick={(e) => handleSelectListItem(e)}>
        <Icon className='list-item-icon js-list-item-icon'>{props.icon}</Icon>
        <span className='list-item-name js-list-item-name'>{props.name}</span>
    </ListItem>
}

export default EcomListItem