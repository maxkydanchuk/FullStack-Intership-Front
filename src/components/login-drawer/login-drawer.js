import {React, useEffect, useState} from "react";
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Input,
    Box,
    ButtonGroup,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    useToast
} from "@chakra-ui/react";

import {useDispatch, useSelector} from "react-redux";
import {addLoginSuccessThunk, loginFail} from "../../redux/auth/authActions";
import {clearMessage} from "../../redux/auth/messages/messagesAction";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";

const LoginDrawer = ({onClose, isOpen }) => {

    const authStore = useSelector((state) => ({
        error: state.auth.error,
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated
    }));


    const messagesStore = useSelector( (state) => ({
        message: state.messages.message
    }));

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [errorMessage, setErrorMessage] = useState(messagesStore.message)
    const toast = useToast()
    const dispatch = useDispatch()

    useEffect(() => {
        setErrorMessage(messagesStore.message)
    }, [messagesStore.message, authStore.error])



    useEffect(() => {
        if(authStore.error) {
            dispatch(loginFail(!authStore.error));
            return Toast(messagesStore.message, 'error');
        } else {
            dispatch( loginFail(false))
            dispatch(clearMessage())
        }

    }, [errorMessage, password, email])

    const getUser = (item) => dispatch(addLoginSuccessThunk(item, closeAndReset));

    const handleSubmit = (e) => {
        e.preventDefault();
        getUser({email, password});
    }

    const Toast = (title, type) => {
        const id = 'error-toast';
        if(!toast.isActive(id)) {
            toast({
                title: `${title}`,
                id: id,
                duration: 2000,
                position: 'top',
                status: `${type}`,
                isClosable: true,
            })
        }
    }

    const closeAndReset = () => {
        onClose();
        setEmail("");
        setPassword("");
    }

    return (
        <>
            <Drawer isOpen={isOpen} onClose={closeAndReset}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Login</DrawerHeader>

                    <DrawerBody>
                        <Box className="box" justify="center" align="center">
                            <Flex  direction="column" justify="center" mt="10">
                                <FormControl isRequired>
                                    <FormLabel htmlFor='email'>Email address</FormLabel>
                                    <Input
                                        id='email'
                                        type='email'
                                        value={email}
                                        onChange={ (e) => setEmail(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl mt="2%" isRequired>
                                    <FormLabel htmlFor='password'>Password</FormLabel>
                                    <Input
                                        id='password'
                                        type={passwordShown ? "text" : "password"}
                                        value={password}
                                        onChange={ (e) => setPassword(e.target.value)}
                                    />
                                    <Flex align="center" mt="2">
                                        {passwordShown ?
                                            <ViewOffIcon ml="2%" onClick={() => setPasswordShown(passwordShown => !passwordShown)}/> :
                                            <ViewIcon ml="2%" onClick={() => setPasswordShown(passwordShown => !passwordShown)}/>}
                                        <FormHelperText mt="0" ml="5%">We'll never share your password.</FormHelperText>
                                    </Flex>
                                </FormControl>
                            </Flex>
                        </Box>
                    </DrawerBody>

                    <DrawerFooter>
                        <ButtonGroup variant='outline' spacing='6' mt="5">
                            <Button onClick={handleSubmit}>Login</Button>
                            {/*<Button colorScheme='blue' onClick={onClose}>Back</Button>*/}
                        </ButtonGroup>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default LoginDrawer;