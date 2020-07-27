import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// [ SUB REDUCERS ]
import userReducer from './user/user.reducer';
import gameReducer from './game/game.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['user']
}

const rootReducer = combineReducers({
    user: userReducer,
    game: gameReducer
});

export default persistReducer( persistConfig, rootReducer );