import './Modal.css'
import React from "react";
import {Dialog, DialogContent, DialogTitle} from "@material-ui/core";


const Modal = ({open, setOpen, header, children, footer, style={}}) => {

    return <Dialog open={open} onClose={setOpen}>
        <DialogTitle style={{textTransform: "uppercase", display: "flex", justifyContent:"center"}}>{header}</DialogTitle>
        <DialogContent>
            {children}
        </DialogContent>
    </Dialog>
}

export default Modal