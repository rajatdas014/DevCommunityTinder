import axios from "axios";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {

    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed);

    const getFeed = async () => {
        if (feed) return;
        try {
            const res = await axios.get(BASE_URL + '/feed',
                { withCredentials: true });
            dispatch(addFeed(res.data));
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getFeed();
    }, []);

    if (!feed) return;

    if (feed.length <= 0) return <h1 className="flex justify-center my-4">No user found</h1>

    return (feed &&
        <div className="flex justify-center my-4">
            <UserCard user={feed[0]} showActions={true} />
        </div>
    )
}

export default Feed