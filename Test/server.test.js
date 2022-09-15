import React from 'react';
import ReactDOM from 'react-dom';
import Server from '../server';

if('renders without crashing', () => {
    expect(1).toEqual(2)
    const div = document.createElement('div');
    ReactDOM.render(<Server />, div);
    ReactDOM.unmountComponentAtNode(div)
});
