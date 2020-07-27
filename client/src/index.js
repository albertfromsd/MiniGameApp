import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// [ MAIN APP ]
import MiniGameApp from './MiniGameApp';

// [ REDUX ]
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

// [ STYLING ]
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';



ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor} >
            <MiniGameApp />
        </PersistGate>
    </Provider>
    , document.getElementById('minigameapp')
);

serviceWorker.register();
