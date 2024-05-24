import 'bootstrap/dist/css/bootstrap.css';
import './App.module.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ItemListContainer} from "./components/ItemListContainer/ItemListContainer.jsx";
import {Cart} from "./components/Cart/Cart.jsx";
import {Error} from "./components/Error/Error.jsx";
import {Home} from "./Pages/Home/Home.jsx";
import {ItemDetailContainer} from "./components/ItemDetailContainer/ItemDetailContainer.jsx";
import {Layout} from "./components/Layout/Layout.jsx";
import {Dashboard} from "./components/Dashboard/Dashboard.jsx";
import {useEffect} from "react";
import {PrivateRoute} from "./components/PrivateRoute/PrivateRoute.jsx";
import CartContextProvider from "./context/CartContext.jsx";

const App = () => {
    useEffect(() => {
        const llamadaABack = false;

        if (llamadaABack) {
            localStorage.setItem("isAuth", "true");
        } else {
            localStorage.setItem("isAuth", "false");
        }
    });

    const allProductProps = {
        greeting: "Nuestros productos más nuevos",
        bgBlue: false
    }

    return (
        <CartContextProvider>
            <BrowserRouter basename="/React-Ecommerce">
                <Routes>
                    <Route element={<Layout/>}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/products" element={<ItemListContainer { ...allProductProps}/>}/>
                        <Route path="/category/:categoryId" element={<ItemListContainer/>}/>
                        <Route path="/products/:productId" element={<ItemDetailContainer/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="/dashboard" element={<PrivateRoute/>}>
                            <Route path="/dashboard" element={<Dashboard/>}/>
                        </Route>
                        {/*<Route path="/about" element={<UnderConstruction/>}/>*/}
                        <Route path="*" element={<Error/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </CartContextProvider>
    );
};

export default App;
