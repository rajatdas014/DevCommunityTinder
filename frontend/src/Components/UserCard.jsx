import PropTypes from 'prop-types'

const UserCard = ({ user }) => {
    const { firstName, lastName, photoUrl, about, gender, age, skills } = user;
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
                <div className="card-actions justify-center mt-4">
                    <button className="btn bg-accent">Ignore</button>
                    <button className="btn bg-secondary">Interested</button>
                </div>
            </div>
        </div>
    )
}

UserCard.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        photoUrl: PropTypes.string.isRequired,
        about: PropTypes.string,
        gender: PropTypes.string,
        age: PropTypes.number,
        skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};


export default UserCard