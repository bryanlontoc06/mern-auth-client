import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import { isAuth, signout } from '../auth/helpers';



const Layout = ({ children, match, history }) => {

    const isActive = path => {
        if(match.path === path) {
            return {color: '#000'}
        } else {
            return {color: '#fff'}
        }
    }

    const nav = () => {
        return (<ul className='nav nav-tabs bg-primary'>
            <li className="nav-item">
                <Link className="nav-link" to="/" style={isActive(`/`)}>
                    Home
                </Link>
            </li>
            {!isAuth() && (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signin" style={isActive(`/signin`)}>
                            Signin
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup" style={isActive(`/signup`)}>
                            Signup
                        </Link>
                    </li>
                </>
            )}

            {isAuth() && isAuth().role === 'admin' && (
                <li className="nav-item">
                    <Link className='nav-link' to="/admin" style={isActive(`/admin`)}>{isAuth().name}</Link>
                </li>
            )}

            {isAuth() && isAuth().role === 'subscriber' && (
                <li className="nav-item">
                    <Link className='nav-link' to="/private" style={isActive(`/private`)}>{isAuth().name}</Link>
                </li>
            )}

            {isAuth() && (
                <li className="nav-item">
                    <span className='nav-link' 
                        style={{cursor: 'pointer', color: '#fff'}}
                        onClick={() => {
                        signout(() => {history.push('/')}
                    )}}>Signout</span>
                </li>
            )}
        </ul>)
    }


    return (
        <>
            {nav()}
            <div className="container">{children}</div>
        </>
    );
}

export default withRouter(Layout);