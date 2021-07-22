function makeShoppingCartArray(){
    return [
        {
            id: 1,
            productid: 1,
            productname: 'Java',
            category: 'tshirts',
            img: 'https://getitcapstone.s3.us-east-2.amazonaws.com/images/java.jpg',
            price: "19.99",
            productinfo: 'A great Java-themed shirt',
            size: 'Small'
        },
    
        {
            id: 2,
            productid: 2,
            productname: 'Python',
            category: 'tshirts',
            img: 'https://getitcapstone.s3.us-east-2.amazonaws.com/images/python.jpg',
            price: "19.99",
            productinfo: 'A great Python-themed shirt',
            size: 'Large'
        },
    ]
}

module.exports = {
    makeShoppingCartArray
}