import './RightNav.css'
import {Accordion, AccordionDetails, AccordionSummary, Icon, List, ListItem} from '@material-ui/core';
import WhiteDivider from "../../../../util-components/WhiteDivider/WhiteDivider";
import EcomListItem from "../../../../util-components/EcomListItem/EcomListItem";
import {useState} from "react";
import {LOCAL_STORAGE_USER} from "../../../../utils/StringConstants";
import {useAppContext} from "../../../../context/AppContext";




const RightNav = ({navMenuItems}) => {

    const {setLoading} = useAppContext()

    const [user] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER)));


    const handleLogout = () => {
        setLoading(true)
        setTimeout(() => {
            localStorage.removeItem(LOCAL_STORAGE_USER)
            window.location.reload()
            setLoading(false)
        }, 1000)
    }

    return <div className='right-nav-container'>
        <div className='right-nav-overlay-container'>
            <div className="menu-list-container">
                <List component="nav" aria-label="main mailbox folders" >
                    <ListItem className='menu-header'  >
                        <img src="/ecart.svg" alt="none" style={{width: '2.5rem', height: '2.5rem'}}/>
                        <span className='menu-header-text' >Ecom Admin</span>
                    </ListItem>
                    <WhiteDivider />
                    <ListItem className='menu-header-user'>

                        <Accordion style={{background: 'inherit', color: "inherit"}}>
                            <AccordionSummary style={{padding: 0, display: "flex", alignItems: "center"}}
                                expandIcon={<Icon style={{color: '#fff'}}>arrow_drop_down</Icon>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <Icon>account_circle</Icon>
                                    <span className='menu-header-user-text' >Hello, {user.email}</span>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails style={{paddingTop: 0, paddingBottom: 0}}>
                                <div className='menu-header-user-option-item' onClick={handleLogout}>Log out</div>
                            </AccordionDetails>
                        </Accordion>
                    </ListItem>
                    <WhiteDivider />
                </List>
                <List component="nav" aria-label="main mailbox folders" >
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