import {React} from "react";
import {Provider} from 'react-redux';
import store from '../../redux/strore';
import App from "./app";
import {ChakraProvider} from "@chakra-ui/react";


const AppWrapper = () => {
    return (
        <Provider store={store}>
            <ChakraProvider>
                <App/>
            </ChakraProvider>
        </Provider>
    )
}

export default AppWrapper;