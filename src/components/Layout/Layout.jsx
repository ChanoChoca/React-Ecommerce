import {Navigation} from "./Navigation/Navigation.jsx";
import {Footer} from "./Footer/Footer.jsx";
import {Outlet} from "react-router-dom";

export const Layout = () => {
    return (
        <div>
            <Navigation/>

            <div>
                <Outlet/>
            </div>

            <Footer/>
        </div>
    );
}
