import { Button, CircularProgress, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";

export type DialogProps={
    modelId:string |null;
    title:string;
    message:string;
    loading:boolean;
    handleClose:()=>void;
    onConfirm:()=>void
}

const DialogConfirm :React.FC<DialogProps>=(props)=>{
    const {handleClose}= props;
    const dispatch= useDispatch();

    const handleDelete=()=>{

    }
    return (<div>
        <DialogTitle id="alert-dialog-title">{props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            {props.loading ?<CircularProgress size="20px" /> :
            "OK"}
          </Button>
        </DialogActions>
     </div>)
}

export default DialogConfirm;