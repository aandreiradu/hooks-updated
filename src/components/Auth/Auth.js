import React, { useContext } from 'react'
import Card from '../UI/Card'
import classes from './Auth.module.css'
import { AuthContext } from '../../store/auth-context';

const Auth = (props) => {
    const authCtx = useContext(AuthContext);
    const loginHandler = () => {
        console.log('ha');
        authCtx.login();
    }

    return (
        <div className={classes.auth}>
            <Card>
                <h2>You are not authenticated!</h2>
                <p>Please log in to continue.</p>
                <button onClick={loginHandler}>Log In</button>
            </Card>

        </div>
    )
}

export default Auth