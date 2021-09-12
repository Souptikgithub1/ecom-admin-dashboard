import './RightNav.css'
import {List, ListItem} from '@material-ui/core';
import WhiteDivider from "../../../../util-components/WhiteDivider/WhiteDivider";
import EcomListItem from "../../../../util-components/EcomListItem/EcomListItem";




const RightNav = ({navMenuItems}) => {
    return <div className='right-nav-container'>
        <div className='right-nav-overlay-container'>
            <div className="menu-list-container">
                <List component="nav" aria-label="main mailbox folders" >
                    <ListItem className='menu-header'  >
                        <img src="/ecart.svg" alt="none" style={{width: '2.5rem', height: '2.5rem'}}/>
                        <span className='menu-header-text' >Ecom Admin</span>
                    </ListItem>
                    <WhiteDivider />

                    {navMenuItems.map((item, index) => <EcomListItem
                        key={index}
                            name={item.name}
                            to={item.to}
                            selected={item.selected}
                            icon={item.icon}
                        />)
                    }


                </List>
            </div>
        </div>
    </div>
}

export default RightNav