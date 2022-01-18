import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    useToast
} from "@chakra-ui/react";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addLoginSuccessThunk, loginFail} from "../../redux/auth/authActions";
import {clearMessage} from "../../redux/auth/messages/messagesAction";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";


const LoginPage = () => {

    const authStore = useSelector((state) => ({
        error: state.auth.error,
        token: state.auth.token,
    }));


    const messagesStore = useSelector( (state) => ({
        message: state.messages.message
    }));

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [errorMessage, setErrorMessage] = useState(messagesStore.message)
    const toast = useToast()
    const history = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        setErrorMessage(messagesStore.message)
    }, [messagesStore.message, authStore.error])



    useEffect(() => {
        if(authStore.error) {
            dispatch(loginFail(!authStore.error));
            return errorToast(messagesStore.message);
        } else {
            dispatch( loginFail(false))
            dispatch(clearMessage())
        }

    }, [errorMessage, password, email])

    const getUser = (item) => dispatch(addLoginSuccessThunk(item, history))

    const handleSubmit = (e) => {
        e.preventDefault();
        getUser({email, password});
    }

    const errorToast = (title) => {
        const id = 'error-toast';
        if(!toast.isActive(id)) {
            toast({
                title: `${title}`,
                id: id,
                duration: 2000,
                position: 'top-right',
                status: 'error',
                isClosable: true,
            })
        }
    }

    return (
        <>
            <Box className="box" justify="center" align="center">
                <Flex  direction="column" justify="center" mt="10" maxWidth="30%">
                    <FormControl>
                        <FormLabel htmlFor='email'>Email address</FormLabel>
                        <Input
                            id='email'
                            type='email'
                            value={email}
                            onChange={ (e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormControl mt="2%">
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
                        <ButtonGroup variant='outline' spacing='6' mt="5">
                            <Button onClick={handleSubmit}>Login</Button>
                            <NavLink to='/' exact="true">
                                <Button colorScheme='blue'>Back</Button>
                            </NavLink>
                        </ButtonGroup>
                    </FormControl>
                </Flex>
            </Box>
        </>
    )
}

export default LoginPage;