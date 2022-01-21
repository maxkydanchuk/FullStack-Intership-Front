import React from 'react';
import {render} from './utils/test-utils';
import App from "./components/app/app";
import apiService from "./services/api-service";
import fetchMock from "jest-fetch-mock"

const api = new apiService()

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWNlZmZkZDgyOWI1M2RiMDg4MTcwZjciLCJpYXQiOjE2NDI1MDA3MDIsImV4cCI6MTY0MjUwNDMwMn0.j7PYFCQPqK2Nt0d0zcjTwAlAEICT3yrV68ujCYC1UgI;'

const mockedData = {
    token: token,
    email: 'email@test.com',
}

beforeAll(() => {
    global.fetch = fetchMock;
})

test('App has body', () => {
    render(<App/>);
    const body = document.querySelector('body');
    expect(body).toBeInTheDocument();
});

test('Login',   async() => {

    fetch.mockResponseOnce(JSON.stringify({
        token: token,
        email: 'email@test.com',
    }));

    const response = await api.getUser();
    expect(response).toEqual(mockedData)
})
