import React from "react";
import {Box} from "@chakra-ui/react";

const ErrorMessage = ({title}) => {
    return (
        <Box color='red' fontSize="14"> {title} </Box>
    )
}

export default ErrorMessage;