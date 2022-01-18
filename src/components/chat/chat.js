import {React, useEffect, useState} from "react";
import {io} from 'socket.io-client';
import {Box, Button, Flex, FormControl, Textarea} from "@chakra-ui/react";
import {SERVER_ULR, loginWelcomeMessage, requestLoginMessage} from "../../configs/config";
import SearchPopover from "../search-popover/search-popover";
import ScrollableFeed from "react-scrollable-feed";
import moment from 'moment'

const socket = io(SERVER_ULR);

const Chat = () => {

    const [messageValue, setMessageValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [inputValue, setInputValue] = useState("");
    const [logged, setLogged] = useState(false);
    const [users, setUsers] = useState([]);

    const email = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    let filteredMessages = messages.filter((item) => {
        return item.message.toLowerCase().includes(inputValue.toLowerCase());
    })

    const sendMessage = () => {
        const message = {
            username: email,
            message: messageValue
        }
        if (message.message !== '') {
            socket.emit('sendMessage', message);
            setMessageValue('');
            setCurrentMessage(message);
        }
    };

    const onSearchChange = (e) => {
        setInputValue(e.target.value);
    };
    
    useEffect(() => {
        function requestAndGetMessages() {
            if (email && token) {
                socket.emit('requestMessages', messages);
                socket.on('getMessages', (messages) => {
                    setMessages(messages);
                })
            }
        }

        requestAndGetMessages()
    }, [currentMessage, email, token])


    useEffect(() => {
        if (email || token) {
            setLogged(false);
        } else {
            setLogged(true);
        }
    }, [email, token]);

    useEffect(() => {
        socket.emit('joinChat', email);
        socket.on('sendUser', (username) => {
            setUsers(username)
        })
    }, [email])

    useEffect(() => {
        return () => {
            const filteredUsers = users.filter((item) => item !== email);
            setUsers(filteredUsers);
            socket.emit('refreshUsers');
        }
    }, [])

    const elements = filteredMessages.map((item) => {
       let time = moment(item.time).format('h.mm a')
        if(email === item.username) {
            return (
                <Flex justify="flex-end" align="flex-end" direction="column" className="my-message" mb="5" key={item._id}>
                    <Flex
                        direction="column"
                        display="flex"
                        borderRadius="10px"
                        borderTop="1px solid rgba(0, 0, 0, 0.1)"
                        backgroundColor="#32CD32"
                        color="#fff"
                        p="8px 15px 15px"
                        mb="2px"
                    >
                        <Box className="message-username" opacity="0.7" color="black" fontSize="14px">
                            {item.username} </Box>
                        <Box className="message-text" mt="2px">{item.message}</Box>
                        <Flex
                            className="message-date"
                            align="flex-end"
                            justify="flex-end"
                            fontSize="12px"
                            mt="1px"
                            opacity="0.7"
                        > {time}
                        </Flex>
                    </Flex>
                </Flex>
            )
        } else {
            return (
                <Flex justify="flex-start" align="flex-start" direction="column" className="my-message" mb="5" key={item._id}>
                    <Flex
                        direction="column"
                        display="flex"
                        borderRadius="10px"
                        borderTop="1px solid rgba(0, 0, 0, 0.1)"
                        backgroundColor="#7160ff"
                        color="#fff"
                        p="10px 15px 15px"
                        mb="2px"
                    >
                        <Box className="message-username" opacity="0.7" color="black" fontSize="14px">
                            {item.username} </Box>
                        <Box className="message-text" mt="2px">{item.message}</Box>
                        <Flex
                            className="message-date"
                            align="flex-end"
                            justify="flex-end"
                            fontSize="12px"
                            mt="1px"
                            opacity="0.7"
                        > {time}
                        </Flex>
                    </Flex>
                </Flex>
            )
        }
    })



    return (
        <Flex className="chat"
              border="1px solid rgba(159, 183, 197, 0.2)"
              borderRadius="8px"
              overflow="hidden"
              h="90vh"
              pos="relative"
        >
            <Box className="chat-users"
                 borderRight="1px solid rgba(159, 183, 197, 0.1)"
                 p="20px"
                 w="200px"
                 backgroundColor="#f6f9fa"
            >
                <hr/>
                <b> Online</b>
                <Flex direction="column">
                    { users ? users.map((item) => {
                        return (
                            <Box key={item}> {item}</Box>
                        )
                    }) : ""}
                </Flex>
            </Box>
            <Flex className="chat-body"
                  direction="column"
                  justify="space-between"
                  flex="1"
                  p="30px"
            >
                <ScrollableFeed>
                    <Box className="messages"
                         flex="1"
                         overflow="auto"
                    >
                        <Box className="welcome-message"
                             fontSize="14"
                             margin="0, auto"
                             opacity="0.5"
                             mb="10"
                             textAlign="center">
                            {logged ? requestLoginMessage : loginWelcomeMessage}
                        </Box>
                        {elements}
                    </Box>
                </ScrollableFeed>
                <Box className="chat-footer">
                    <FormControl
                        mt="20px"
                        pt="20px"
                        borderTop="1px solid rgba(0, 0, 0, 0.1)"
                    >
                        <Textarea
                            w="100%"
                            mb="10px"
                            resize="none"
                            isDisabled={logged}
                            value={messageValue}
                            onChange={(e) => setMessageValue(e.target.value)}
                        />
                        <Button isDisabled={logged} onClick={sendMessage}>
                            Send
                        </Button>
                    </FormControl>
                </Box>
            </Flex>
            <Flex
                className="chat-menu"
                borderRight="1px solid rgba(159, 183, 197, 0.1)"
                justify="center"
                p="20px"
                w="40px"
                backgroundColor="#f6f9fa"
            >
                <Box>
                    <SearchPopover
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        onSearchChange={onSearchChange}
                    />
                </Box>
            </Flex>
        </Flex>
    )
}

export default Chat;