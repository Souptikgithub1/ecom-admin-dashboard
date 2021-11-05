import './Modal.css'
import React from "react";
import {
    AppBar,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Slide,
    Toolbar,
    Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = ({
   open,
   setOpen,
   header,
   children,
   footer,
   style={},
   fullScreen=false
}) => {

    return <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
    >
        {!!fullScreen
            ? <AppBar sx={{ position: 'relative' }} color='secondary'>
                <Toolbar style={{display: 'flex', justifyContent:"space-between"}}>

                    <Typography variant="h6" component="div">
                        {header}
                    </Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={() => setOpen(false)}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            : <DialogTitle style={{textTransform: "uppercase", display: "flex", justifyContent:"center"}}>{header}</DialogTitle>
        }
        <DialogContent>
            {children}
        </DialogContent>
    </Dialog>
}

export default Modal