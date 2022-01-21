import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    FormControl, FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    Tooltip, useToast,
} from "@chakra-ui/react";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addRegisterSuccessThunk} from "../../redux/auth/authActions";
import {confirmPasswordErrorMessage, emailErrorMessage, passwordErrorMessage} from "../../configs/config";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import AppHeader from "../../components/app-header";

const RegisterPage = ({onLogout, onDrawerOpen, isAuthenticated}) => {

    const [email, setEmail] = useState("");
    const [emailCheck, setEmailCheck] = useState(false);
    const [emailError, setEmailError] = useState('Email should not be empty')
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState(false);
    const [passwordError, setPasswordError] = useState('Password should not be empty');
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPasswordCheck, setConfirmPasswordCheck] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState("Passwords didn't match");
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
    const [formValid, setFormValid] = useState(false);

    const dispatch = useDispatch()
    const history = useNavigate();

    useEffect(() => {
        if (emailError || passwordError || confirmPasswordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError, confirmPasswordError]);


    const registerUser = (item) => dispatch(addRegisterSuccessThunk(item))

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser({email, password, confirmPassword});
        history("/");
    }

    const blurHandler = (e) => {
        // eslint-disable-next-line default-case
        switch (e.target.name) {
            case 'email':
                setEmailCheck(true);
                break;
            case 'password':
                setPasswordCheck(true);
                break;
            case 'confirm-password': {
                setConfirmPasswordCheck(true)
            }
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value);
        const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!regExp.test(String(e.target.value).toLowerCase())) {
            setEmailError(emailErrorMessage)
        } else {
            setEmailError('')
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
        const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!regExp.test(e.target.value)) {
            setPasswordError(passwordErrorMessage);
        } else {
            setPasswordError('');
        }
    }

    const confirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value);
        if (e.target.value !== password) {
            setConfirmPasswordError(confirmPasswordErrorMessage);
        } else {
            setConfirmPasswordError('');
        }
    }

    // const errorToast = (title) => {
    //     const id = 'error-toast';
    //     if(!toast.isActive(id)) {
    //         toast({
    //             title: `${title}`,
    //             id: id,
    //             position: 'top-right',
    //             status: 'error',
    //             isClosable: true,
    //         })
    //     }
    // }

    return (
        <Box className="register__page" height="100vh">
            <AppHeader onLogout={onLogout} isAuthenticated={isAuthenticated} onDrawerOpen={onDrawerOpen}/>

            <Box justify="center" align="center">
                <Flex
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="4px"
                    display="flex"
                    direction="column"
                    justify="center"
                    mt="10"
                    maxWidth="30%"
                    p="4"
                    style={{ "backdrop-filter":  "blur(2px)" }}
                >
                    <FormControl isRequired isInvalid={(emailCheck && emailError)} >
                        <Tooltip hasArrow label={emailErrorMessage} placement='right-end' marginLeft="6%">
                            <FormLabel
                                htmlFor='email'
                                color="lightblue"
                            >
                                Email address
                            </FormLabel>
                        </Tooltip>
                        <Input
                            id='email'
                            type='email'
                            name='email'
                            backgroundColor="white"
                            value={email}
                            onChange={(e) => emailHandler(e)}
                            onBlur={(e) => blurHandler(e)}
                        />
                        <FormErrorMessage> {emailError} </FormErrorMessage>
                    </FormControl>
                    <FormControl isRequired isInvalid={(passwordCheck && passwordError)} mt="2%">
                        <Tooltip hasArrow label={passwordErrorMessage} placement="right-end" marginLeft="6%">
                            <FormLabel
                                htmlFor='password'
                                color="lightblue"
                            >
                                Password
                            </FormLabel>
                        </Tooltip>
                        <Input
                            id='password'
                            type={passwordShown ? "text" : "password"}
                            name='password'
                            backgroundColor="white"
                            value={password}
                            onChange={(e) => passwordHandler(e)}
                            onBlur={(e) => blurHandler(e)}
                        />
                        <FormErrorMessage> {passwordError} </FormErrorMessage>
                        <Flex align="center" mt="2">
                            {passwordShown ?
                                <ViewOffIcon
                                    ml="2%"
                                    color="lightblue"
                                    cursor="pointer"
                                    onClick={() => setPasswordShown(passwordShown => !passwordShown)}/>
                                :
                                <ViewIcon
                                    color="lightblue"
                                    ml="2%"
                                    cursor="pointer"
                                    onClick={() => setPasswordShown(passwordShown => !passwordShown)}
                                />
                            }
                            <FormHelperText
                                color="lightblue" mt="0" ml="5%">We'll never share your password.
                            </FormHelperText>
                        </Flex>
                    </FormControl>
                    <FormControl isRequired isInvalid={(confirmPasswordCheck && confirmPasswordError)} mt="2">
                        <FormLabel
                            htmlFor='confirm-password'
                            color="lightblue"
                        >
                            Confirm Password
                        </FormLabel>
                        <Input
                            id='confirm-password'
                            type={confirmPasswordShown ? "text" : "password"}
                            name='confirm-password'
                            backgroundColor="white"
                            value={confirmPassword}
                            onChange={(e) => confirmPasswordHandler(e)}
                            onBlur={(e) => blurHandler(e)}
                        />
                        <FormErrorMessage> {confirmPasswordError} </FormErrorMessage>
                        <Flex align="center" mt="2">
                            {confirmPasswordShown ?
                                <ViewOffIcon
                                    ml="2%"
                                    color="lightblue"
                                    cursor="pointer"
                                    onClick={() => setConfirmPasswordShown(confirmPasswordShown => !confirmPasswordShown)}/>
                                :
                                <ViewIcon ml="2%"
                                          color="lightblue"
                                          cursor="pointer"
                                          onClick={() => setConfirmPasswordShown(confirmPasswordShown => !confirmPasswordShown)}
                                />
                            }
                            <FormHelperText color="lightblue"  mt="0" ml="5%">We'll never share your password.</FormHelperText>
                        </Flex>
                    </FormControl>
                    <ButtonGroup variant='outline' spacing='6' mt="5">
                        <Button colorScheme='linkedin' isDisabled={!formValid} onClick={handleSubmit}>Register</Button>
                        <NavLink to='/' exact="true">
                            <Button colorScheme='linkedin'>Back</Button>
                        </NavLink>
                    </ButtonGroup>
                </Flex>
            </Box>
        </Box>
    )
}

export default RegisterPage;