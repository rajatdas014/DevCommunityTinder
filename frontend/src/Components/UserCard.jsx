import PropTypes from 'prop-types'
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const UserCard = ({ user, showActions }) => {
    const { _id, firstName, lastName, photoUrl, about, gender, age, skills } = user;
    const dispatch = useDispatch();

    const feedRequestHandler = async (status, userId) => {
        try {
            await axios.post(BASE_URL + '/request/send/' + status + '/' + userId,
                {},
                { withCredentials: true })
            dispatch(removeFeed(userId));
        }
        catch (err) {
            console.log(err.message);
        }
    }


    return (
        <div className="card bg-base-400 w-96 shadow-xl mt-2">
            <figure className="w-[17vw] m-auto h-[17vw]">
                <img
                    src={photoUrl}
                    alt="profile" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Name: {firstName + " " + lastName}</h2>
                {age && <p>Age: {age}</p>}
                {gender && <p>Gender: {gender}</p>}
                <p>About: {about}</p>
                <div className="mt-2"><p>Skills:</p> <ul className="ml-4">
                    {skills.map((item, index) => <li className="list-disc capitalize text-sm" key={index}>{item}</li>)}
                </ul></div>
                {showActions &&
                    <div className="card-actions justify-center mt-4">
                        <button className="btn bg-accent" onClick={() => feedRequestHandler('ignored', _id)}>Ignore</button>
                        <button className="btn bg-secondary" onClick={() => feedRequestHandler('interested', _id)}>Interested</button>
                    </div>}
            </div>
        </div>
    )
}

UserCard.propTypes = {
    user: PropTypes.shape({
        _id: PropTypes.string,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        photoUrl: PropTypes.string.isRequired,
        about: PropTypes.string,
        gender: PropTypes.string,
        age: PropTypes.number,
        skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    showActions: PropTypes.bool,
};


export default UserCard