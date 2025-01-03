import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants.js";
import axios from 'axios'
import { removeUser } from "../utils/userSlice";


const NavBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.user);

    const logoutHandler = async () => {
        try {
            await axios.post(BASE_URL + '/logout', {}, { withCredentials: true });
            dispatch(removeUser());
            return navigate('/login');
        }
        catch (err) {
            console.log(err);
        }

    }

    return (
        <div className="navbar bg-accent-content">
            <div className="flex-1">
                <Link to='/' className="btn btn-ghost text-xl text-white">🧑‍💻DevTinderCommunity</Link>
            </div>
            {user && (<div className="flex-none gap-2 mx-5">
                <div className="form-control">
                    Welcome {user.firstName}
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="user"
                                src={user.photoUrl} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to='/profile' className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><Link to='/connections'>Connections</Link></li>
                        <li><Link to='/requests'>Requests</Link></li>
                        <li><Link to='/updatepassword'>Update Password</Link></li>
                        <li onClick={logoutHandler}><a>Logout</a></li>
                    </ul>
                </div>
            </div>
            )}
        </div >
    )
}

export default NavBar