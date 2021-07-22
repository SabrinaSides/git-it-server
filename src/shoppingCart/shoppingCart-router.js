const express = require('express');
// const xss = require('xss')
const path = require('path');
const ShoppingCartService = require('./shoppingCart-service');

const shoppingCartRouter = express.Router();
const jsonParser = express.json();

//const serializeShoppingCart =

shoppingCartRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    ShoppingCartService.getAllCartItems(knexInstance)
      .then((ShoppingCart) => {
        res.json(ShoppingCart);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const knexInstance = req.app.get('db');
    const { productid, productname, category, img, price, productinfo, size } =
      req.body;
    const newItem = {
      productid,
      productname,
      category,
      img,
      price,
      productinfo,
      size,
    };

    if (
      (productid || productname || category || image || price || productinfo) ==
      null
    )
      return res.status(400).json({
        error: { message: `Missing required info in request body` },
      });

    ShoppingCartService.insertCartItem(knexInstance, newItem)
      .then((item) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${item.id}`))
          .json(item);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    const knexInstance = req.app.get('db');

    ShoppingCartService.deleteEntireCart(knexInstance)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

shoppingCartRouter
  .route('/:cartItemId')
  .all((req, res, next) => {
    knexInstance = req.app.get('db');
    const { cartItemId } = req.params;

    ShoppingCartService.getById(knexInstance, cartItemId)
      .then((item) => {
        if (!item) {
          return res.status(404).json({
            error: { message: `Item doesn't exist` },
          });
        }
        res.item = item;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(res.item);
  })
  .delete((req, res, next) => {
    const { cartItemId } = req.params;

    ShoppingCartService.deleteCartItem(knexInstance, cartItemId)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = shoppingCartRouter;
