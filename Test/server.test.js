import React from 'react';
import ReactDOM from 'react-dom'
import Server from '../server'

if('renders without crashing', () => {
    expect(true).toEqual(false)
    const div = document.createElement('div');
    ReactDOM.render(<Server />, div);
    ReactDOM.unmountComponentAtNode(div)
});
