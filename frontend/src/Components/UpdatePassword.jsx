import axios from "axios";
import { useState } from "react"
import { BASE_URL } from "../utils/constants.js";

const UpdatePassword = () => {

    const [updatePassword, setUpdatePassword] = useState('');
    const [error, setError] = useState();
    const [showToast, setShowToast] = useState(false);

    const updatePasswordhandler = async () => {
        try {
            await axios.post(BASE_URL + '/profile/password',
                { password: updatePassword },
                { withCredentials: true });
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000)

        }
        catch (err) {
            setError(err.response?.data?.message || err.message);
            console.log(err.response?.data);
        }
    }

    return (
        <>
            <div className="card bg-secondary w-96 shadow-xl mx-auto  my-4">
                <div className="card-body">
                    <h2 className="card-title m-auto">Change Password</h2>
                    <div className="card-actions justify-end flex flex-col">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">New Password:</span>
                            </div>
                            <input type="password"
                                value={updatePassword}
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setUpdatePassword(e.target.value)} />
                        </label>
                        <p className="text-red-600">{error}</p>
                        <button className="btn btn-neutral m-auto" onClick={updatePasswordhandler}>Change Password</button>
                    </div>
                </div>
            </div>
            {showToast && <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Password updated successfully.</span>
                </div>
            </div>}
        </>
    )
}

export default UpdatePassword