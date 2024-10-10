
import PropTypes from 'prop-types'
import { useState } from "react"
import { useDispatch } from "react-redux";
import UserCard from './UserCard';
import { BASE_URL } from "../utils/constants";
import { addUser } from '../utils/userSlice';
import axios from 'axios';


const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [skills, setSkills] = useState(user.skills);
    const [error, setError] = useState();
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();

    const saveDataHandler = async () => {
        try {
            const res = await axios.patch(BASE_URL + '/profile/edit',
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
            console.log(res);
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
            <div className="flex justify-center">
                <div className="card bg-primary w-96 shadow-xl my-4 mr-4">
                    <div className="card-body">
                        <h2 className="card-title m-auto">Profile Details</h2>
                        <div className="card-actions justify-end flex flex-col">
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">First Name :</span>
                                </div>
                                <input type="text"
                                    value={firstName}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setFirstName(e.target.value)} />
                            </label>
                            <label className="form-control w-full max-w-xs mb-4">
                                <div className="label">
                                    <span className="label-text">Last Name :</span>
                                </div>
                                <input type="text"
                                    value={lastName}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs mb-4">
                                <div className="label">
                                    <span className="label-text">Photo :</span>
                                </div>
                                <input type="text"
                                    value={photoUrl}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs mb-4">
                                <div className="label">
                                    <span className="label-text">Age :</span>
                                </div>
                                <input type="text"
                                    value={age}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs mb-4">
                                <div className="label">
                                    <span className="label-text">Gender :</span>
                                </div>
                                <input type="text"
                                    value={gender}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setGender(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs mb-4">
                                <div className="label">
                                    <span className="label-text">About :</span>
                                </div>
                                <input type="text"
                                    value={about}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setAbout(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs mb-4">
                                <div className="label">
                                    <span className="label-text">Skills :</span>
                                </div>
                                <input type="text"
                                    value={skills}
                                    className="input input-bordered w-full max-w-xs"
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
        photoUrl: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        gender: PropTypes.string.isRequired,
        about: PropTypes.string.isRequired,
        skills: PropTypes.array.isRequired,
    }).isRequired,
};



export default EditProfile