
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [emailId, setEmailId] = useState("harman@email.com");
    const [password, setPassword] = useState("Harman@123");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const loginHandler = async () => {
        try {
            const res = await axios.post(BASE_URL + '/login',
                {
                    emailId, password,
                },
                {
                    withCredentials: true,
                });
            dispatch(addUser(res.data));
            return navigate('/');
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className="card bg-primary w-96 shadow-xl mx-auto  my-4">
                <div className="card-body">
                    <h2 className="card-title m-auto">Login</h2>
                    <div className="card-actions justify-end">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Email Id:</span>
                            </div>
                            <input type="text"
                                value={emailId}
                                placeholder="joe@email.com"
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setEmailId(e.target.value)} />
                        </label>
                        <label className="form-control w-full max-w-xs mb-4">
                            <div className="label">
                                <span className="label-text">Password:</span>
                            </div>
                            <input type="text"
                                value={password}
                                placeholder="password"
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <button
                            className="btn btn-neutral m-auto"
                            onClick={loginHandler}>Login
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login