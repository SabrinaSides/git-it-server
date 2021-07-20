const ProductsService = {
    getAllProducts(knex){
        return knex
            .from('products')
            .select('*')
    },

    getByProductName(knex, productname){
        return knex
            .from('products')
            .where({productname})
            .first()
    }
}

module.exports = ProductsService;