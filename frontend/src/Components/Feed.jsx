import axios from "axios";
import UserCard from "./userCard";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {

    const dispatch = useDispatch();
    const feed = useSelector(store => store.feed)

    const getFeed = async () => {
        try {
            const res = await axios.get(BASE_URL + '/feed', { withCredentials: true });
            dispatch(addFeed(res.data));
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getFeed();
    }, [])


    return feed && (
        <div className="flex justify-center my-4">
            <UserCard user={feed[8]} />
        </div>
    )
}

export default Feed