import { configureStore, combineReducers } from '@reduxjs/toolkit'
import themeReducer from './theme/themeSlice'
import userReducer from './user/userTheme'
import persistStore from 'redux-persist/lib/persistStore'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

export const rootReducer = combineReducers({
    reducer: {
        user: userReducer,
        theme: themeReducer,
    }
})

const persistConfig = {
    key: 'root',
    storage,
    version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        getDefaultMiddleware({ serializableCheck: false })
    }
})

export const persistor = persistStore(store)