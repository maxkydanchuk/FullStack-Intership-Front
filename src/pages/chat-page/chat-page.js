import React from "react";
import Chat from "../../components/chat/chat";
import AppHeader from "../../components/app-header";
import {Box} from "@chakra-ui/react";

const ChatPage = ({isAuthenticated, onDrawerOpen, onLogout}) => {

    return (
        <Box className="datagrid__page">
            <AppHeader onLogout={onLogout} isAuthenticated={isAuthenticated} onDrawerOpen={onDrawerOpen}/>
            <Chat/>
        </Box>
    );
};

export default ChatPage;