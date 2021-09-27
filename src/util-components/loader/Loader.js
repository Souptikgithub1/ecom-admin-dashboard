import {Backdrop, CircularProgress} from "@material-ui/core";
import './Loader.css'

const Loader = ({open}) => {
    return <Backdrop
        className='loader-container'
        style={{zIndex: 999999}}
        open={open}>
        <CircularProgress color="secondary" />
    </Backdrop>
}

export default Loader