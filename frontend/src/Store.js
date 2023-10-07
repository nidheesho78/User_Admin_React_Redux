import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import adminAuthSlice from './slices/adminAuthSlice'
import { apiSlice } from './slices/apiSlice'


const store = configureStore({
    reducer:{
        auth:authReducer,
        adminAuth:adminAuthSlice,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export default store