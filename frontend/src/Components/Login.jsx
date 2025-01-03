
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants.js';

const Login = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const logInHandler = async () => {
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
            setError(err?.response?.data)
        }
    }

    const signUpHandler = async () => {

        try {
            const res = await axios.post(BASE_URL + '/signup',
                { firstName, lastName, emailId, password },
                { withCredentials: true }
            )
            dispatch(addUser(res?.data?.data));
            return navigate('/profile');
        }
        catch (err) {
            setError(err?.response?.data)
        }
    }

    return (
        <>
            <div className="card bg-secondary w-96 shadow-xl mx-auto my-4">
                <div className="card-body">
                    <h2 className="card-title m-auto">{isLogin ? 'Login' : 'Sign Up'}</h2>
                    <div className="card-actions justify-end flex flex-col">
                        {!isLogin &&
                            <>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">First Name:</span>
                                    </div>
                                    <input type="text"
                                        value={firstName}
                                        placeholder="Joe"
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) => setFirstName(e.target.value)} />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Last Name:</span>
                                    </div>
                                    <input type="text"
                                        value={lastName}
                                        placeholder="Samuel"
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) => setLastName(e.target.value)} />
                                </label>
                            </>
                        }
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
                            <input type="password"
                                value={password}
                                placeholder="password"
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <p className="text-red-600">{error}</p>
                        <button
                            className="btn btn-neutral m-auto"
                            onClick={isLogin ? logInHandler : signUpHandler}>{isLogin ? 'Login' : 'Sign Up'}
                        </button>
                        <p className='text-center mt-6 cursor-pointer' onClick={() => setIsLogin(value => !value)}>{isLogin ? "New User? Click here to Sign Up" : "Existing User? Click here to Login"}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login