import NavBar from "./components/NavBar/NavBar.jsx";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer.jsx";


const App = () => {
    return (
        <div>
            <NavBar/>
            <ItemListContainer message="Mensaje enviado desde App.jsx"/>
        </div>
    );
};

export default App;

