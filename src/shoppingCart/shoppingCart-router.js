const express = require('express')
// const xss = require('xss')
const path = require('path')
const ShoppingCartService = require('./shoppingCart-service')

const shoppingCartRouter = express.Router()
const jsonParser = express.json()

//const serializeShoppingCart =

shoppingCartRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        ShoppingCartService.getAllCartItems(knexInstance)
            .then(ShoppingCart => {
                res.json(ShoppingCart)
            })
            .catch(next)
    })

module.exports = shoppingCartRouter;