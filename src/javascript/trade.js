// Browserify entry point for the bundle (yay JavaScript!)
import React from 'react';
import { render } from 'react-dom';
import TradeView from './components/trade-view';

render(<TradeView />, document.getElementById('root'));