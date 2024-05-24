export const products = [
    {
        // id: 1,
        name: "Object 279 early",
        description: "El Object 279 early es un tanque pesado premium soviético de nivel 10.\n" +
            "\n" +
            "Una de las primeras variantes de un anteproyecto para un tanque pesado de alta capacidad de cruce con un nuevo esquema de configuración. Desarrollado en 1947-1948 por L. S. Troyanov. Este vehículo iba a contar con un motor bajo de cuatro orugas, montado sobre vigas longitudinales que también servían como tanque de combustible, reduciendo considerablemente las posibilidades de incendio. Estas soluciones proporcionaron una alta capacidad de cruce y capacidad de supervivencia: el tanque podía continuar moviéndose incluso con orugas dañadas. La colocación del casco sobre la suspensión permitió un gran compartimiento de combate y, como resultado, mayor munición y un mecanismo de carga automática mejorado para una alta velocidad de disparo. En 1948 se fabricó un prototipo funcional.",
        price: 30000,
        stock: 100,
        type: ["tank"],
        image: "https://tanks.gg/img/tanks/ussr-R157_Object_279R.png"
    },
    {
        // id: 2,
        name: "T95/FV4201 Chieftain",
        description: "El T95/FV4201 Chieftain es un tanque pesado premium británico de nivel 10.\n" +
            "\n" +
            "El trabajo en el nuevo tanque pesado comenzó en el Reino Unido en 1951. Se planeó prever la intercambiabilidad de armamento del FV4201 Chieftain y los tanques estadounidenses T95 (incluidas las torretas). El proyecto se suspendió debido a problemas con el entrenamiento de la tripulación, ya que los miembros de la tripulación del vehículo habrían tenido que operar dos sistemas diferentes de control de artillería y armas a la vez.",
        price: 25000,
        stock: 500,
        type: ["tank"],
        image: "https://tanks.gg/img/tanks/uk-GB98_T95_FV4201_Chieftain.png"
    },
    {
        // id: 3,
        name: "Object 907",
        description: "El Object 907 es un tanque mediano premium soviético de nivel 10.\n" +
            "\n" +
            "La decisión de iniciar el desarrollo de un tanque mediano de próxima generación al mismo tiempo que se mejoraba el T-54 se tomó el 13 de julio de 1953. El desarrollo estuvo a cargo del Instituto de Investigación No. 100. El proyecto se presentó en febrero-marzo de 1954 y, En abril de 1955, se probó la resistencia al impacto del casco del nuevo vehículo. Sin embargo, el proyecto fue posteriormente cancelado debido a su complejidad.",
        price: 25000,
        stock: 500,
        type: ["tank"],
        image: "https://tanks.gg/img/tanks/ussr-R95_Object_907.png"
    },
    {
        // id: 4,
        name: "VK 72.01 (K)",
        description: "El VK 72.01 (K) es un tanque pesado premium alemán de nivel 10.\n" +
            "\n" +
            "Un tanque superpesado con ubicación trasera de la torreta. Desarrollado por la empresa Krupp. Un nuevo vehículo tendría un armamento más potente y un blindaje mejorado en comparación con el VK 70.01. Existía sólo en planos.",
        price: 25000,
        stock: 500,
        type: ["tank"],
        image: "https://tanks.gg/img/tanks/germany-G92_VK7201.png"
    },
    {
        // id: 5,
        name: "Object 260",
        description: "El Object 260 es un tanque pesado premium soviético de nivel 10.\n" +
            "\n" +
            "Una versión del tanque pesado Object 260. Los planos de diseño se completaron en septiembre de 1945, pero no se fabricaron prototipos.",
        price: 25000,
        stock: 500,
        type: ["tank"],
        image: "https://tanks.gg/img/tanks/ussr-R110_Object_260.png"
    },
    {
        // id: 6,
        name: "WN8",
        description: "4000 WN8 por 10 batallas",
        price: 12.94,
        stock: null,
        type: ["account_level"],
        image: "https://www.overtank.com/image/thumbnails/18/ff/wn8b_png-102392-380x380.png"
    },
    {
        // id: 7,
        name:"Créditos y Experiencia",
        description: "1 millón de créditos + 30000 experiencia",
        price: 8.82,
        stock: null,
        type: ["account_level"],
        image: "https://www.overtank.com/image/thumbnails/19/fd/silver_7_overtank_png-106455-380x380.png"
    },
    {
        // id: 8,
        name: "Créditos",
        description: "1 millón de créditos",
        price: 5.95,
        stock: null,
        type: ["account_level"],
        image: "https://www.overtank.com/image/thumbnails/18/fb/silver_normal_png_100455_380x380_png-102335-250x250.png"
    },
    {
        // id: 9,
        name: "Experiencia",
        description: "50000 experiencia",
        price: 9.44,
        stock: null,
        type: ["account_level"],
        image: "https://www.overtank.com/image/thumbnails/18/fc/anyxp_silver_png_100491_380x380_png-102336-250x250.png"
    },
    {
        // id: 10,
        name: "Bonos",
        description: "100 bonos",
        price: 16.96,
        stock: null,
        type: ["account_level"],
        image: "https://www.overtank.com/image/thumbnails/18/fb/bonds_png-102334-250x250.png"
    }
]


export const getProducts = () => {

    //return fetch("http://localhost:8080/api/products").then((res) => res.json());

     return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products);

            // reject('No se pudo traer los productos')
        }, 1000);
    });
}

export const getProductsByCategory = (categoryId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const filteredProducts = products.filter((product) => {
                // Comprueba si el array de tipo del producto incluye la categoryId
                return product.type.includes(categoryId);
            });
            resolve(filteredProducts);
        }, 1000);
    });
};


export const getProductById = (productId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const product = products.find((elem) => elem.id === parseInt(productId));

            resolve(product);
        }, 1000);
    });
};


// export const setProduct = () => {
//     return fetch("http://localhost:8080/api/products", {
//         method: "POST",
//         body: JSON.stringify({
//             title: "test product",
//             price: 13.5,
//             description: "lorem ipsun set",
//             image: "https://i.pravatar.cc",
//             category: "electronic",
//         }),
//     }).then((res) => res.json());

    /* return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(products);

            // reject('No se pudo traer los productos')
        }, 2000);
    }); */
