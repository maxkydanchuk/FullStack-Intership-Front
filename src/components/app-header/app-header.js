import React from "react";
import {
    NavLink,
} from "react-router-dom";
import {
    Box,
    Flex,
    Button,
    ButtonGroup,
    Spacer,
} from "@chakra-ui/react";
import {ChatIcon} from "@chakra-ui/icons";


const AppHeader = ({onLogout, isAuthenticated, onOpen}) => {

    const user = localStorage.getItem('user')
    return (
        <>
            <Flex align="center" direction="column">
                <Flex align="center" justifyContent="space-between" direction="row" width='90%'>
                    <ButtonGroup variant="outline" spacing="6" mt="5">
                        <NavLink to="/" exact="true">
                            <Button
                                variant='link'
                                size="md"
                                height="48px"
                                boxShadow="0"
                            >
                                Home
                            </Button>
                        </NavLink>
                        <NavLink to="/people" exact="true">
                            <Button
                                size="md"
                                height="48px"
                                variant="link"
                            >
                                People
                            </Button>
                        </NavLink>
                        <NavLink to="/starships" exact="true">
                            <Button
                                size="md"
                                height="48px"
                                variant="link"
                            >
                                Starships
                            </Button>
                        </NavLink>
                        <NavLink to="/chat" exact="true">
                            <Button
                                variant="link" ml="5"
                                size="md"
                                height="48px"
                            > Chat <ChatIcon/>
                            </Button>
                        </NavLink>
                    </ButtonGroup>
                    <Spacer/>
                    <Box mt="5">
                        {!isAuthenticated &&
                        <Button variant="link" onClick={onOpen}> Login </Button>
                        }
                        {!isAuthenticated &&
                        <NavLink to={'/register'}>
                            <Button variant="link" ml="5"> Register </Button>
                        </NavLink>
                        }
                        {isAuthenticated &&
                        <Flex d="flex" align="center" justify="space-between" minWidth="200px" >
                            <Box> {user} </Box>
                            <NavLink to={'/'}>
                                <Button variant="link" onClick={onLogout} outline="none"> Logout </Button>
                            </NavLink>
                        </Flex>
                        }
                    </Box>
                </Flex>
            </Flex>
        </>
    );
};

export default AppHeader;
