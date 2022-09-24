import {useContext} from "react";
import {UserContext} from "../Contexts/UserContext";

const useUser = () => {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error("useUser hook must be used within UserContext");
    }
    return context;
};

export default useUser;