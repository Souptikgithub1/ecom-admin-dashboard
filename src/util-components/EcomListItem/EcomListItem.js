import {Icon, ListItem} from "@material-ui/core";
import './EcomListItem.css'
import {useHistory} from "react-router-dom";
import $ from 'jquery';


const EcomListItem = (props) => {

    const history = useHistory();

    const handleSelectListItem = (event) => {
        $('.js-list-item').removeClass('selected')

        if (!!$(event.target).attr('class').includes('js-list-item-name') || !!$(event.target).attr('class').includes('js-list-item-icon')) {
            $(event.target).parent().addClass('selected')
        } else {
            $(event.target).addClass('selected')
        }

        //navigate to desired page
        history.push(props.to)
    }

    return <ListItem autoFocus
        className={'list-item-container js-list-item ' + props.selected + ' ' + props.to}
        onClick={(e) => handleSelectListItem(e)}>
        <Icon className='list-item-icon js-list-item-icon'>{props.icon}</Icon>
        <span className='list-item-name js-list-item-name'>{props.name}</span>
    </ListItem>
}

export default EcomListItem