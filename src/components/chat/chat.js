import {React, useEffect, useState} from "react";
import {io} from 'socket.io-client';
import {Box, Button, Flex, FormControl, Textarea} from "@chakra-ui/react";
import {SERVER_ULR, loginWelcomeMessage, requestLoginMessage} from "../../configs/config";
import SearchPopover from "../search-popover/search-popover";
import ScrollableFeed from "react-scrollable-feed";

const socket = io(SERVER_ULR);

const Chat = () => {

    const [welcomeMessage, setWelcomeMessage] = useState('')
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
            setCurrentMessage(message)
            console.log('sos send')
        }
    };

    const onSearchChange = (e) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        if (email || token) {
            setLogged(false);
            setWelcomeMessage(loginWelcomeMessage);
        } else {
            setLogged(true);
            setWelcomeMessage(requestLoginMessage);
        }
    }, [email, token]);

    useEffect(() => {
        socket.emit('joinChat', email);
        socket.on('sendUser', (username) => {
            setUsers(username)
        })
    }, [email])

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

    const elements = filteredMessages.map((item) => {
        return (
            <Box className="message" mb="5" key={item._id}>
                <Box
                    display="inline-flex"
                    borderRadius="10px"
                    borderTop="1px solid rgba(0, 0, 0, 0.1)"
                    backgroundColor="#7160ff"
                    color="#fff"
                    p="10px 15px 15px"
                    mb="2px"
                > {item.message}</Box>
                <Box opacity="0.5" fontSize="14px">
                    <Box>{item.username}</Box>
                </Box>
            </Box>
        )
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
                <Flex>
                    <Box>{users ? users : ""}</Box>
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
                            {welcomeMessage}
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
                        onSearchChange={onSearchChange}
                    />
                </Box>
            </Flex>
        </Flex>
    )
}

export default Chat;