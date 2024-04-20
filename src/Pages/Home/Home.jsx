import {Layout} from "../../components/Layout/Layout.jsx";
import {ItemListContainer} from "../../components/ItemListContainer/ItemListContainer.jsx";


export const Home = () => {
    const itemListContainerProps = {
        greeting: "Nuestros productos más nuevos",
        bgBlue: false
    }

    return (
        <Layout>
            <ItemListContainer { ...itemListContainerProps}/>
        </Layout>
    );
}
