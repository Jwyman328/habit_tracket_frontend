import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ReactDOM from 'react-dom'

import {mount,unmount, shallow} from 'enzyme'
import LoginPage from '../pages/LogInPage'
import logIn from '../App'


Enzyme.configure({adapter: new Adapter()})


let wrapper;

test('first test', () => {
    wrapper = mount()
    //expect(wrapper.find('div').length).toBe(1)
})