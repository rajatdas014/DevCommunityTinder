import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addRequest, removeRequest } from '../utils/requestSlice'
import { useEffect } from "react"


const Requests = () => {

    const dispatch = useDispatch();
    const storeData = useSelector(store => store.request);

    const fetchRequestUsers = async () => {
        const res = await axios.get(BASE_URL + '/user/requests/recieved', { withCredentials: true });
        dispatch(addRequest(res.data.data));
    }

    const responseHandler = async (status, _id) => {
        try {
            await axios.post(BASE_URL + '/request/review/' + status + '/' + _id,
                {},
                { withCredentials: true, });
            dispatch(removeRequest(_id));
        }
        catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchRequestUsers();
    }, [])

    if (!storeData) return;

    if (storeData.length === 0) return <div className="flex justify-center my-10 bg-secondary w-[30%] mx-auto h-[5vw] items-center rounded-md"><h1 className="text-black m-0">No Request Found</h1></div>

    return (storeData &&
        <>
            <h1 className="text-center text-xl my-2">Got connection requests</h1>
            {storeData.map((item, index) => {
                const { firstName, lastName, age, gender, photoUrl } = item.fromUserId;
                return (
                    <>
                        <div key={index} className="card bg-neutral text-neutral-content w-96 m-2" >
                            <div className="card-body items-center text-center">
                                <img src={photoUrl} alt="profile-photo" />
                                <h2 className="card-title">{firstName + " " + lastName}</h2>
                                <div className="flex">
                                    {gender && <p className="capitalize mr-2">{gender}</p>}
                                    {age && <p>{age}</p>}
                                </div>
                                <div className="card-actions justify-end mt-4">
                                    <button className="btn btn-primary"
                                        onClick={() => responseHandler('rejected', item._id)}>Reject</button>
                                    <button className="btn btn-secondary"
                                        onClick={() => responseHandler('accepted', item._id)}>Accept</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })}
        </>
    )
}

export default Requests