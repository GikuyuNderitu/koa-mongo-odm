class Model {
  static get INVALID_DEFINITION() {
    return 'Please provide a valid definition';
  }

  static get INVALID_VALUE() {
    return 'Please provide a valid value';
  }
  constructor(obj, definition) {
    for(let key in obj) {
      if(key in schema.definition) {
        const isValid = checkType(obj[key], schema.definition[key]);
      }
    }
  }
}

const checkType = (value, definition) => {
  let definitionType;
  if(typeof definition === 'function') {
    return true;
  } else if(typeof definition === 'object') {
    if(definition.hasOwnProperty('value')) return checkType(value, definition.value);
    throw new Error(Model.INVALID_VALUE);
  } else throw new Error(Model.INVALID_DEFINITION);

  return false;
}



module.exports = (schema, db) => 
  class extends Model {
    constructor(obj) {
      super(obj, schema.definition);
    }
    static find(...queryArgs) {
      return db.get(schema.collectionName).find(...queryArgs);
    }
    
    static findOne (...queryArgs) {
      return db.get(schema.collectionName).findOne(...queryArgs);
    }
    
    static create(...queryArgs) {
      const [body, ...rest] = queryArgs;
      const model = new this(body);
      return db.get(schema.collectionName).insert(...rest);
    }

    static update(...queryArgs) {
      const [queryObj, body] = queryArgs;
      return db.get(schema.collectionName).update(...queryArgs);
    }

    static remove(...queryArgs) {
      return db.get(schema.collectionName).remove(...queryArgs);
    }
  }