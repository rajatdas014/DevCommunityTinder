import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"

const Body = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);

    const fetchuser = async () => {
        if (user) return;
        try {
            const res = await axios.get(BASE_URL + '/profile/view', {
                withCredentials: true,
            });
            dispatch(addUser(res.data));

        }
        catch (err) {
            if (err.status === 401) {
                navigate('/login');
            }
            console.log(err);
        }
    }

    useEffect(() => {
        fetchuser();
    }, []);


    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Body