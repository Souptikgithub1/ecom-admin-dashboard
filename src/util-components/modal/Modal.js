import './Modal.css'
import React from "react";
import {Dialog, DialogContent, DialogTitle, Slide} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = ({open, setOpen, header, children, footer, style={}}) => {

    return <Dialog
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
    >
        <DialogTitle style={{textTransform: "uppercase", display: "flex", justifyContent:"center"}}>{header}</DialogTitle>
        <DialogContent>
            {children}
        </DialogContent>
    </Dialog>
}

export default Modal