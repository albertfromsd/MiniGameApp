import React from 'react';
import ReactDOM from 'react-dom';

import MiniGameApp from './MiniGameApp';

import './index.css';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<MiniGameApp />, document.getElementById('minigameapp'));


serviceWorker.unregister();
