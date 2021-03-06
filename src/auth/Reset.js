import React, {useState, useEffect} from 'react';
import jwt_decode from "jwt-decode";
import Layout from '../core/Layout';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';



const Reset = ({match}) => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        newPassword: '',
        buttonText: 'Reset password'
    })

    useEffect(() => {
        let token = match.params.token;
        let {name} = jwt_decode(token);
        if(token) {
            setValues({...values, name, token});
        }
    }, []);

    const {name, token, newPassword, buttonText} = values;

    const handleChange = event => {
        setValues({...values, newPassword: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, buttonText: 'Submitting'});
     
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/reset-password`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: {newPassword, resetPasswordLink: token}
        })
        .then(response => {
            console.log(`Reset Password Success!`, response);
            toast.success(response.data.message);
            setValues({...values, buttonText: 'Done'});
        })
        .catch(error => {
            console.log(`Reset Password Error!`, error.response.data.error)
            toast.error(error.response.data.error);
            setValues({...values, buttonText: 'Reset password'});
        })
    }

    const resetPasswordForm = () => (
        <form>
            <div className="form-group">
                <label className='text-muted'>New Password</label>
                <input type="password" className="form-control" value={newPassword} onChange={handleChange} placeholder="Type new password" required/>
            </div>

            <div>
                <button className="btn btn-primary" disabled={buttonText === 'Submitted'} onClick={clickSubmit}>{buttonText}</button>
            </div>
        </form>
    );

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                <h1 className='p-5 text-center'>Hey {name}, type your new password</h1>
                {resetPasswordForm()}
            </div>
        </Layout>
    );
}


export default Reset;
