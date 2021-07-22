const ShoppingCartService = {
    getAllCartItems(knex){
        return knex
            .from('shopping_cart')
            .select('*')
    },

    getById(knex, id){
        return knex.from('shopping_cart')
                .select('*')
                .where({ id })
                .first()
    },

    insertCartItem(knex, newItem){
        return knex
            .insert(newItem)
            .into('shopping_cart')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    deleteCartItem(knex, id){
        return knex
            .from('shopping_cart')
            .where({id})
            .delete()
    },

    deleteEntireCart(knex){
        return knex
            .from('shopping_cart')
            .delete('*')
    }
}

module.exports = ShoppingCartService;