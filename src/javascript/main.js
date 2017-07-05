// Browserify entry point for the bundle (yay JavaScript!)
import React from 'react';
import { render } from 'react-dom';
import Main from './components/main';

// Intialise orderBook in window object
window.orderBook = [];

render(<Main />, document.getElementById('root'));
