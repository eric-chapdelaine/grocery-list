import { Alert } from "@mui/material"

const ErrorAlert = ({error}) => {
    if (error) {
        return (
            <Alert variant="outlined" severity="error"> 
                Error with request: {error.message}
            </Alert>
        )
    }
}

export {ErrorAlert}