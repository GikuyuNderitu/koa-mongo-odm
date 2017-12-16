# koa-mongo-orm

### Usage

``` javascript
// In .../path/to/models/myschema.js
const Schema = require('koa-mongo-orm').Schema;

const MySchema = new Schema({
  name: {
    type: String
  },
  age: {
    type: Number
  }
}, {timestamps: true}, 'MySchema');

module.exports = MySchema;
```

``` javascript
const Router = require('koa-router');
const mongo = require('koa-mongo-orm');
mongo.init({
  uri: '<Path to Mongo Database>',
  models: '<Path to Models>',
});

/*
  some code later
*/

const router = new Router();
router.get('/', async (ctx, next) => {

});

router.post('/', async (ctx, next) => {

});

router.put('/:id', async (ctx, next) => {

})

router.delete('/:id', async (ctx, next) => {

})
```

