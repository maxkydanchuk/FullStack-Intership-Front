import React from 'react';
import {render} from './utils/test-utils';
import App from "./components/app/app";

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWNlZmZkZDgyOWI1M2RiMDg4MTcwZjciLCJpYXQiOjE2NDI1MDA3MDIsImV4cCI6MTY0MjUwNDMwMn0.j7PYFCQPqK2Nt0d0zcjTwAlAEICT3yrV68ujCYC1UgI;'

const formData = {
    email: 'email@test.com',
    password: 'testpassword'
};

const responseData = {
    token: token,
    email: 'email@test.com',
}

const apiLoginRequest = (url, data) => {
    return new Promise((resolve) => {
        resolve({token: token, email: data.email});
    })
};

const testLogin = (data) => {
    return apiLoginRequest('/api/login', data).then((data) => data)
}

test('App has body', () => {
    render(<App/>);
    const body = document.querySelector('body');
    expect(body).toBeInTheDocument();
});

test('Login', () => {
    expect.assertions(1);
    return testLogin(formData).then((data) => expect(data).toEqual(responseData))
})