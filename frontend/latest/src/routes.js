 import {BrowserRouter}from 'react-router'

 export const routes=BrowserRouter([
    {
        path:'/login',
        element:<LoginForm/>
    },
     {
        path:'/register',
        element:<RegistrationForm/>
     }
 ])