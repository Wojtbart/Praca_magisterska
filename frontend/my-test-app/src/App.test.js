/** @jest-environment jsdom */
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
// import axios from "axios";

import ConfigurationPage from './Pages/ConfigurationPage';
import Dashboard from './Pages/Dashboard';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Page404 from './Pages/Page404';
import Registration from './Pages/Registration';


// describe('<App />', () => {
//   let appWrapper;
//   let appInstance;
//   const app = (disableLifecycleMethods = false) =>
//     shallow(<App />, { disableLifecycleMethods });

//   beforeEach(() => {
//     appWrapper = app();
//     appInstance = appWrapper.instance();
//   });

//   afterEach(() => {
//     appWrapper = undefined;
//     appInstance = undefined;
//   });
  
//   it('renders without crashing', () => {
//     expect(app().exists()).toBe(true);
//   });
// });

//test block
test("increments counter", () => {
  // render the component on virtual dom
  const {container}=render(<App />);
  
  // //select the elements you want to interact with
  // const counter = screen.getByTestId("counter");
  // const incrementBtn = screen.getByTestId("increment");
  
  // //interact with those elements
  // fireEvent.click(incrementBtn);
  
  // //assert the expected result
  // expect(counter).toHaveTextContent("1");
    const someElement = container.querySelector('#time-checkbox');
    fireEvent.click(someElement);
    expect(someElement.checked).toBe(true);
  });

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
