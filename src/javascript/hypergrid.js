import React from 'react';
import { render } from 'react-dom';
import OFApp from './components/openfin';

// Intialise orderBook in window object
window.orderBook = [];

render(<OFApp />, document.getElementById('root'));
