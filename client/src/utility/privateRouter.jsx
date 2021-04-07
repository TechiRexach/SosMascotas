import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { AUTH_TOKEN } from '../components/constants/constant.jsx'

function PrivateRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                localStorage.getItem(AUTH_TOKEN) ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}
export default PrivateRoute;