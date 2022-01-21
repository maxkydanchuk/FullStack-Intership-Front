import React from 'react';
import {render} from './utils/test-utils';
import App from "./components/app/app";
import apiService from "./services/api-service";

const api = new apiService()

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWNlZmZkZDgyOWI1M2RiMDg4MTcwZjciLCJpYXQiOjE2NDI1MDA3MDIsImV4cCI6MTY0MjUwNDMwMn0.j7PYFCQPqK2Nt0d0zcjTwAlAEICT3yrV68ujCYC1UgI;'

const mockedData = {
    token: token,
    email: 'email@test.com',
}

test('App has body', () => {
    jest.useFakeTimers('legacy');
    render(<App/>);
    const body = document.querySelector('body');
    expect(body).toBeInTheDocument();
});

test('Login',   async() => {
    const loginMock = jest.spyOn(api, 'getUser');
    loginMock.mockResolvedValue(mockedData)

    const response = await api.getUser();

    expect(response).toEqual(mockedData)
})
