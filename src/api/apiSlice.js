import {createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import{authenticate, setUserInfo, logOut} from '../redux/authSlice;'



// Define a service using a base  