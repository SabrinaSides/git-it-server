const express = require('express')
// const xss = require('xss')
const path = require('path')
const ProductsService = require('./products-service')

const productsRouter = express.Router()
const jsonParser = express.json()

//const serializeProducts =

productsRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        ProductsService.getAllProducts(knexInstance)
            .then(products => {
                res.json(products)
            })
            .catch(next)
    })

productsRouter
    .route('/:productName')
    .all((req, res, next) => {
        knexInstance = req.app.get('db')
        const {productName} = req.params

        ProductsService.getByProductName(knexInstance, productName)
            .then(product => {
                if(!product){
                return res.status(404).json({
                    error: {message : `Product doesn't exist` }
                })
            }
            res.product = product
            next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(res.product)
    })

module.exports = productsRouter;