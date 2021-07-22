const ProductsService = {
    getAllProducts(knex){
        return knex
            .from('products')
            .select('*')
    },

    getByProductName(knex, id){
        return knex
            .from('products')
            .where({id})
            .first()
    }
}

module.exports = ProductsService;