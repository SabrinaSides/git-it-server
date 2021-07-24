const knex = require('knex');
const app = require('../src/app');
const { makeShoppingCartArray } = require('./shoppingCart.fixtures');
const { makeProductsArray } = require('./products.fixtures');

describe('ShoppingCart Endpoints', () => {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });

    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  const testProducts = makeProductsArray();

  before('insert products into products table', () => {
    return db.into('products').insert(testProducts);
  });

  before('clean the table', () =>
    db.raw('TRUNCATE shopping_cart RESTART IDENTITY CASCADE')
  );

  afterEach('cleanup', () =>
    db.raw('TRUNCATE shopping_cart RESTART IDENTITY CASCADE')
  );

  describe('GET /api/shoppingCart', () => {
    context('Given no items', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app).get('/api/shoppingCart').expect(200, []);
      });
    });

    context('Given there are items in the shopping cart', () => {
      const testShoppingCart = makeShoppingCartArray();

      beforeEach('insert items into shoppingCart', () => {
        return db.into('shopping_cart').insert(testShoppingCart);
      });

      it('responds with 200 and all of the items', () => {
        return supertest(app)
          .get('/api/shoppingCart')
          .expect(200, testShoppingCart);
      });
    });
  });

  describe('GET /api/shoppingCart/:id', () => {
    context('Given no shoppingCart', () => {
      it('responds with 404', () => {
        const productId = 123;
        return supertest(app)
          .get(`/api/shoppingCart/${productId}`)
          .expect(404, { error: { message: `Item doesn't exist` } });
      });
    });

    context('Given there are items in the shopping cart', () => {
      const testShoppingCart = makeShoppingCartArray();

      beforeEach('insert items', () => {
        return db.into('shopping_cart').insert(testShoppingCart);
      });

      it('responds with 200 and the specified product', () => {
        const productId = 2;
        const expectedProduct = testShoppingCart[productId - 1];
        return supertest(app)
          .get(`/api/shoppingCart/${productId}`)
          .expect(200, expectedProduct);
      });
    });
  });

  describe('POST /api/shoppingCart', () => {
    const testShoppingCart = makeShoppingCartArray();

    it('creates an item, responding with 201 and the new item', () => {
      const newItem = {
        productid: 1,
        productname: 'Java',
        category: 'tshirts',
        img: 'https://getitcapstone.s3.us-east-2.amazonaws.com/images/java.jpg',
        price: '19.99',
        productinfo: 'A great Java-themed shirt',
        size: 'Small',
      };
      return supertest(app)
        .post('/api/shoppingCart')
        .send(newItem)
        .expect(201)
        .expect((res) => {
          expect(res.body.productid).to.eql(newItem.productid);
          expect(res.body.productname).to.eql(newItem.productname);
          expect(res.body.category).to.eql(newItem.category);
          expect(res.body).to.have.property('id');
          expect(res.headers.location).to.eql(
            `/api/shoppingCart/${res.body.id}`
          );
        })
        .then((res) =>
          supertest(app)
            .get(`/api/shoppingCart/${res.body.id}`)
            .expect(res.body)
        );
    });
  });

  describe('DELETE /api/shoppingCart/:id', () => {
    context('Given no items', () => {
      it('responds with 404', () => {
        const cartId = 3456;
        return supertest(app)
          .delete(`/api/shoppingCart/${cartId}`)
          .expect(404, { error: { message: `Item doesn't exist` } });
      });
    });

    context('Given there are items in the cart', () => {
      const testShoppingCart = makeShoppingCartArray();

      beforeEach('insert items', () => {
        return db.into('shopping_cart').insert(testShoppingCart);
      });

      it('responds with 204 and removes the item', () => {
        const idToRemove = 1;
        const expectedItems = testShoppingCart.filter(
          (item) => item.id !== idToRemove
        );
        return supertest(app)
          .delete(`/api/shoppingCart/${idToRemove}`)
          .expect(204)
          .then((res) =>
            supertest(app).get('/api/shoppingCart').expect(expectedItems)
          );
      });
    });
  });
});
