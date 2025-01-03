import { BASE_URL } from "../utils/constants.js";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from '../utils/connectionSlice'
import { useEffect } from "react";

const Connections = () => {
    const connectionData = useSelector((store) => store.connection);
    const dispatch = useDispatch();


    const fetchUser = async () => {
        try {
            const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true })
            dispatch(addConnection(res.data.data));
        }
        catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    if (!connectionData) return;

    if (connectionData.length === 0) return <div className="flex justify-center my-10  bg-accent w-[30%] mx-auto h-[5vw] items-center rounded-md"><h1 className="text-white m-0">No Connections Found</h1></div>

    return (
        <div className="flex justify-center flex-col">
            <h1 className="text-bold text-xl text-center my-2">Connected List</h1>
            <div className="flex">
                {connectionData.map((items, index) => {
                    const { firstName, lastName, age, gender, photoUrl, about, skills } = items;
                    return (
                        <div className="rounded-lg m-2 p-2 bg-base-300 w-1/2" key={index}>
                            <img className="w-20 h-20" src={photoUrl} alt="profile-photo" />
                            <h2 className="capitalize">{firstName + " " + lastName}</h2>
                            <h3 className="capitalize">{gender + " " + age}</h3>
                            <h4 className="">{about}</h4>
                            <ul className="ml-4">
                                {skills.map((skill, index) => {
                                    return (
                                        <li className="list-disc capitalize" key={index}>{skill}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    )

                })}
            </div>
        </div>
    )
}

export default Connections