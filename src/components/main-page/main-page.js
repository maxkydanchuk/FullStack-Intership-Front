import React from "react";
import {
    NavLink,
} from "react-router-dom";
import {
    Box,
    Flex,
    Button,
    ButtonGroup,
    Image, useDisclosure, Spacer,
} from "@chakra-ui/react";



const MainPage = ({ onLogout, isAuthenticated, onOpen }) => {

    return (
        <>
            <Flex align="center" direction="column">
            <Flex align="center" justifyContent="space-between" direction="row" width='90%'>
                <ButtonGroup variant="outline" spacing="6" mt="5">
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
                </ButtonGroup>
                <Spacer/>
                <Box mt="5">
                    {!isAuthenticated &&
                    <Button variant="link" onClick={onOpen}> Login </Button>
                    }
                    {/*{!isAuthenticated &&*/}
                    {/*<NavLink to={'/login'}>*/}
                    {/*    <Button> Login </Button>*/}
                    {/*</NavLink>*/}
                    {/*}*/}
                    {isAuthenticated &&
                    <NavLink to={'/'}>
                        <Button variant="link" onClick={onLogout}> Logout </Button>
                    </NavLink>
                    }
                    {!isAuthenticated &&
                    <NavLink to={'/register'}>
                        <Button variant="link" ml="5"> Register </Button>
                    </NavLink>
                    }
                </Box>
                 </Flex>
                <Box mt="5"> Welcome to Star Wars database</Box>
                <Box boxSize="s ">
                    <Image
                        src="https://cdn.images.express.co.uk/img/dynamic/36/590x/Han-Solo-and-Chewie-633918.jpg"
                        alt="Han-Solo-Chewbacca"
                        mt="5"
                    />
                </Box>
                <Box display="flex" justifyContent="center" alignItem="center" backgroundColor='gray.200' height="50" width="100%">
                    Powered by Maksym Kydanchuk
                </Box>
            </Flex>
        </>
    );
};

export default MainPage;
