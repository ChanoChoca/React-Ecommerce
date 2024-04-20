export const products = [
    {
        id: 1,
        name: 'Object 907',
        description:
            'Tier X Reward Soviet Medium Tank',
        price: 100,
        stock: 10,
        image: 'https://tanks.gg/img/tanks/ussr-R95_Object_907.png',
    },
    {
        id: 4,
        name: 'Object 279 early',
        description:
            'Tier X Reward Soviet Heavy Tank',
        price: 400,
        stock: 40,
        image: 'https://tanks.gg/img/tanks/ussr-R157_Object_279R.png',
    },
    {
        id: 7,
        name: 'T95/FV4201 Chieftain',
        description:
            'Tier X Reward British Heavy Tank',
        price: 700,
        stock: 70,
        image: 'https://tanks.gg/img/tanks/uk-GB98_T95_FV4201_Chieftain.png',
    },
    {
        id: 25,
        name: 'VK 72.01 (K)',
        description:
            'Tier X Reward German Heavy Tank',
        price: 2500,
        stock: 250,
        image: 'https://tanks.gg/img/tanks/germany-G92_VK7201.png',
    },
]


export const getProducts = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(products)

            // reject('No se pudo traer los productos')
        }, 2000)
    })
}
