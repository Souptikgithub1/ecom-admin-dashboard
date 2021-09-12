import {CircularProgress} from "@material-ui/core";
import './Loader.css'

const Loader = () => {
    return <div className='loader-container'>
        <CircularProgress color="secondary" />
    </div>
}

export default Loader