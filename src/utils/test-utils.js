import React from 'react';
import { render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import {Provider} from "react-redux";
import store from "../redux/strore";

const AllProviders = ({ children }) => (
    <Provider store={store}>
        <ChakraProvider>{children}</ChakraProvider>
    </Provider>
);

const customRender = (ui) => render(ui, { wrapper: AllProviders });

export { customRender as render };