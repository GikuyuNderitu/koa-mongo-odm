const fs = require('fs');
const path = require('path');
const  {promisify} = require('util');
const Schema = require('./schema');
const monk = require('monk');
const makeModel = require('./model');

class MongoOdmConfig {
  constructor(obj={uri: 'test', testFunction: /\.js$/.test}) {
    this.uri = obj.uri;
    this.models = new String();
    this.testFunction = obj.testFunction;
    if(!obj.models) {
      throw new Error('Pass a path to a directory that contains your models.')
    }
  }
}

function setSchema(app, db, schema) {
  if(!schema.hasOwnProperty('_id')) schema._id = monk.id;

  schema.db = db;

  try {
    const collection= db.get(schema.collectionName);
    schema.collection = collection;
    console.log('try ran, got collection');
    // console.log(collection);
  } catch(e) {
    schema.collection = db.create(schema.collectionName);
    console.log('catch ran, collection created');
  }

  app.context.db[schema.ctxName] = makeModel(schema, db);
}

function init(app ,config = new MongoOdmConfig()) {
  const {uri, models, testFunction} = config;
  const db = monk(uri);
  app.context.db = {};
  app.context.db.base = db;

  const files = fs.readdirSync(models);


  files.forEach(file => {
    
    if((testFunction instanceof RegExp && testFunction.test(file)) ||
        (typeof testFunction === 'function' && testFunction(file))){
      const exported = require(`${models}/${file}`);

      if(exported instanceof Array) {
        exported.forEach(schema => {
          setSchema(app, db, schema);
  
        });
      } else {
        setSchema(app, db, exported)
      }

    }
  })
}  

exports.init= init;
exports.Schema = Schema;