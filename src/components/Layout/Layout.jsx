import {NavBar} from "./NavBar/NavBar.jsx";
import {Footer} from "./Footer/Footer.jsx";

export const Layout = ({children}) => {
    return (
        <div>
            <NavBar/>
            <div>
                {children}
            </div>
            <Footer/>
        </div>
    );
}
