const ShoppingCartService = {
    getAllCartItems(knex){
        return knex
            .from('shopping_cart')
            .select('*')
    },

    // insert 

    // getByProductName(knex, productname){
    //     return knex
    //         .from('shopping_cart')
    //         .where({productname})
    //         .first()
    // }
}

module.exports = ShoppingCartService;