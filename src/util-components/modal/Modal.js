import './Modal.css'
import React, {useEffect} from "react";
import $ from 'jquery';
import {Icon} from "@material-ui/core";


const Modal = ({open, setOpen, header, children, footer, style={}}) => {

    useEffect(() => {
        if (!!open) {
            $('.js-modal-content-container').addClass('opac1');
        }
    }, [open])

    const handleModalClose = () => {
        $('.js-modal-content-container').removeClass('opac1');
        setTimeout(() => setOpen(false), 300)
    }

    return <React.Fragment>
            <div className='modal-container ' style={{display: open ? 'flex' : 'none'}}>
                <div className="modal-backdrop" onClick={handleModalClose} />
                <div className={'modal-content-container js-modal-content-container'} style={style}>
                    <div className='close-icon-btn' onClick={handleModalClose}>
                        <Icon className='close-icon'>close</Icon>
                    </div>
                    <div className="modal-header">{header}</div>
                    <div className='modal-body'>{children}</div>
                </div>
            </div>
    </React.Fragment>
}

export default Modal