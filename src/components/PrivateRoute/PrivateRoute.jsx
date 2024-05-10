import {useNavigate, Outlet} from "react-router-dom";
import {useEffect} from "react";

export const PrivateRoute = () => {
    const navigate = useNavigate();
    const isAuth = localStorage.getItem("isAuth");
    useEffect(() => {
        if (isAuth == "false") {
            navigate("/");
        }
    }, [isAuth]);

    return <Outlet/>
};
