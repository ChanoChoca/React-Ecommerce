import {Item} from "../Item/Item.jsx";
import styles from './ItemList.module.css'

export const ItemList = ({productsList}) => {
    return(
        <div className={styles.itemlist}>
            {productsList.map((elem) => {
                return <Item key={elem.id} {...elem}/>
            })}
        </div>
    );
}
