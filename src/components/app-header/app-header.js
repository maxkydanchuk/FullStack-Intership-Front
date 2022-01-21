import React from "react";
import {
    NavLink,
} from "react-router-dom";
import {
    Box,
    Flex,
    Button,
    ButtonGroup,
    Spacer, MenuItem, MenuList, MenuButton, Menu,
} from "@chakra-ui/react";
import {ChatIcon, ChevronDownIcon} from "@chakra-ui/icons";


const AppHeader = ({onLogout, isAuthenticated, onDrawerOpen}) => {

    const user = localStorage.getItem('user')
    return (
        <>
            <Flex className="test" align="center" direction="column">
                <Flex align="center" justifyContent="space-between" direction="row" width='90%'>
                    <ButtonGroup variant="outline" spacing="6" mt="5">
                        <NavLink to="/" exact="true">
                            <Button
                                variant='link'
                                size="md"
                                height="48px"
                                boxShadow="0"
                                colorScheme="linkedin"
                            >
                                Home
                            </Button>
                        </NavLink>
                        <NavLink to="/people" exact="true">
                            <Button
                                size="md"
                                height="48px"
                                variant="link"
                                colorScheme="linkedin"
                            >
                                People
                            </Button>
                        </NavLink>
                        <NavLink to="/starships" exact="true">
                            <Button
                                size="md"
                                height="48px"
                                variant="link"
                                colorScheme="linkedin"
                            >
                                Starships
                            </Button>
                        </NavLink>
                        <NavLink to="/chat" exact="true">
                            <Button
                                variant="link" ml="5"
                                size="md"
                                height="48px"
                                colorScheme="linkedin"
                            > Chat <ChatIcon/>
                            </Button>
                        </NavLink>
                    </ButtonGroup>
                    <Spacer/>
                    <Box mt="5">
                        {!isAuthenticated &&
                        <Button variant="link" colorScheme="linkedin" onClick={onDrawerOpen}> Login </Button>
                        }
                        {!isAuthenticated &&
                        <NavLink to={'/register'}>
                            <Button variant="link" colorScheme="linkedin" ml="5"> Register </Button>
                        </NavLink>
                        }
                        {isAuthenticated &&
                        <Menu>
                            <MenuButton as={Button} variant="link" colorScheme="linkedin" rightIcon={<ChevronDownIcon w="7" h="7" />}>
                                {user}
                            </MenuButton>
                            <MenuList>
                                <NavLink to={'/'}>
                                <MenuItem onClick={onLogout} >
                                        Logout
                                </MenuItem>
                                </NavLink>
                            </MenuList>
                        </Menu>
                        }
                    </Box>
                </Flex>
            </Flex>
        </>
    );
};

export default AppHeader;
