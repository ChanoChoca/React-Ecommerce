/* import styles from './ItemListContainer.module.css' */

export const ItemListContainer = ( ) => {

    return (
        <main>
            {/* TODO: carousel */}

            <section className="container text-center">
                <h2>Nuestros productos más nuevos</h2>

                <hr/>
                {/* TODO: cards with new products (another component) */}
                <hr/>
            </section>

            <section className="container text-center">
                {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                <h2>Productos más vendidos</h2>

                <hr/>
                {/* TODO: cards with top products (another component) */}
                <hr/>
            </section>
        </main>
    )
}
