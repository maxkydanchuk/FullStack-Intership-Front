import React, {useEffect, useState} from "react";
import {Button, ButtonGroup, Flex, FormControl, FormHelperText, FormLabel, Input, useToast} from "@chakra-ui/react";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addRegisterSuccessThunk} from "../../redux/auth/authActions";

const RegisterPage = () => {

    console.log(1)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailCheck, setEmailCheck] = useState(false);
    const [passwordCheck, setPasswordCheck] = useState(false);
    const [emailError, setEmailError] = useState('Email should not be empty')
    const [passwordError, setPasswordError] = useState('Password should not be empty');
    const [formValid, setFormValid] = useState(false);
    const toast = useToast()
    const dispatch = useDispatch()
    const history = useNavigate();

    useEffect(() => {
        if(emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError])

    const registerUser = (item) => dispatch(addRegisterSuccessThunk(item))


    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser({email, password});

        history("/");
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailCheck(true);
                break;
            case 'password':
                setPasswordCheck(true);
                break;
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value);
        const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!regExp.test(String(e.target.value).toLowerCase())) {
            setEmailError('Email should be valid email e.g. user@example.com')
            console.log(1)
        } else {
            setEmailError('')
            console.log(2)
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
        const regExp = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if(!regExp.test(e.target.value)) {
            setPasswordError('Password should be at least 8 characters with 1 Upper Case and at least 1 number');
            console.log(1)
        } else {
            setPasswordError('');
            console.log(2)
        }
    }
    const errorToast = (title) => {
        toast({
            title: `${title}`,
            position: 'top-right',
            // description: "We've created your account for you.",
            status: 'error',
            isClosable: true,
        })
    }

    return (
        <Flex direction="column" justify="center" mt="10" maxWidth="30%">
            <FormControl>
                <FormLabel htmlFor='email'>Email address</FormLabel>
                {(emailCheck && emailError) && errorToast(emailError)}
                <Input
                    id='email'
                    type='email'
                    name='email'
                    value={email}
                    onChange={(e) => emailHandler(e)}
                    onBlur={(e) => blurHandler(e)}
                />
                <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='password'>Password</FormLabel>
                {(passwordCheck && passwordError) && errorToast(passwordError)}
                <Input
                    id='password'
                    type='password'
                    name='password'
                    value={password}
                    onChange={(e) => passwordHandler(e)}
                    onBlur={(e) => blurHandler(e)}
                />
                <FormHelperText>We'll never share your password.</FormHelperText>
            </FormControl>
            <ButtonGroup variant='outline' spacing='6'>
                <Button isDisabled={!formValid} onClick={handleSubmit}>Register</Button>
                <NavLink to='/' exact="true">
                    <Button colorScheme='blue'>Back</Button>
                </NavLink>
            </ButtonGroup>
        </Flex>
    )
}

export default RegisterPage;