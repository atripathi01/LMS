import React from "react";
// import Snackbar from '@material-ui/core/Snackbar';
import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
import MuiAlert from '@mui/material/Alert';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ErrorAlert=()=> {
   
        return (
            <Snackbar
                open={this.props.showAlert}
                autoHideDuration={3000}
                onClose={this.props.AutoHideSnackbar}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    width: "300px"
                    
                }}>
                <Alert style={this.props.addedStyles||{}} severity={this.props.status}>
                    <p style={{marginTop:"0", fontWeight: '600',width:"fit-content" }}>{this.props.message}<ArrowForwardIcon /></p>
                    
                      
                   
                </Alert>
            </Snackbar>
        )
    }


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}



export default ErrorAlert;
