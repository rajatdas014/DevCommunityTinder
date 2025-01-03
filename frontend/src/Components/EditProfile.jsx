
import PropTypes from 'prop-types'
import { useState } from "react"
import { useDispatch } from "react-redux";
import UserCard from './UserCard';
import { BASE_URL } from "../utils/constants.js";
import { addUser } from '../utils/userSlice';
import axios from 'axios';


const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [skills, setSkills] = useState(user.skills || "");
    const [error, setError] = useState();
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();

    const saveDataHandler = async () => {
        try {
            const res = await axios.post(BASE_URL + '/profile/edit',
                {
                    firstName,
                    lastName,
                    photoUrl,
                    gender,
                    age,
                    about,
                    skills
                },
                { withCredentials: true }
            )
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }
        catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
            setError(errorMessage);
        }
    }


    return (
        <>
            <div className="flex justify-center h-[90vh]">
                <div className="card bg-primary w-96 shadow-xl my-4 mr-4">
                    <div className="card-body">
                        <h2 className="card-title m-auto">Profile Details</h2>
                        <div className="card-actions justify-end flex flex-col gap-0.5">
                            <label className="form-control w-full max-w-xs">
                                <div className="label p-1">
                                    <span className="label-text">First Name :</span>
                                </div>
                                <input type="text"
                                    value={firstName}
                                    className="input input-bordered w-full h-[2.2rem]"
                                    onChange={(e) => setFirstName(e.target.value)} />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label p-1">
                                    <span className="label-text">Last Name :</span>
                                </div>
                                <input type="text"
                                    value={lastName}
                                    className="input input-bordered w-full  h-[2.2rem]"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label p-1">
                                    <span className="label-text">Photo :</span>
                                </div>
                                <input type="text"
                                    value={photoUrl}
                                    className="input input-bordered w-full  h-[2.2rem]"
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label p-1">
                                    <span className="label-text">Age :</span>
                                </div>
                                <input type="text"
                                    value={age}
                                    className="input input-bordered w-full  h-[2.2rem]"
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label p-1">
                                    <span className="label-text">Gender :</span>
                                </div>
                                <input type="text"
                                    value={gender}
                                    className="input input-bordered w-full  h-[2.2rem]"
                                    onChange={(e) => setGender(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label p-1">
                                    <span className="label-text">About :</span>
                                </div>
                                <input type="text"
                                    value={about}
                                    className="input input-bordered w-full  h-[2.2rem]"
                                    onChange={(e) => setAbout(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs mb-4">
                                <div className="label p-1 ">
                                    <span className="label-text">Skills :</span>
                                </div>
                                <input type="text"
                                    value={skills}
                                    className="input input-bordered w-full  h-[2.2rem]"
                                    onChange={(e) => setSkills(e.target.value)}
                                />
                            </label>
                            {error && <p className='text-red-600'>{error}</p>}
                            <button
                                className="btn btn-neutral m-auto" onClick={saveDataHandler}>Save changes
                            </button>
                        </div>
                    </div>
                </div>
                <UserCard user={{ firstName, lastName, photoUrl, about, gender, age, skills }} showActions={false} />
            </div>
            {showToast && <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile save successfully.</span>
                </div>
            </div>}
        </>
    )
}

EditProfile.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        photoUrl: PropTypes.string,
        age: PropTypes.number,
        gender: PropTypes.string,
        about: PropTypes.string,
        skills: PropTypes.array,
    }).isRequired,
};



export default EditProfile