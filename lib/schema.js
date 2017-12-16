class SchemaOptions {
  constructor() {
    this.timestamps = true;
  }
}

class Schema {
  static get Error() {
    return {
      NoCollection: 'Please set the collection before attempting to query the database.',
      FirstQueryArgError: 'The first argument for a find query must be an object.'
    };
  }

  constructor(definition, options = new SchemaOptions(), name, collectionName) {
    this.definition = {};
    for(let key in definition) {
      this.definition[key] = definition[key];
    }

    this._ctxName = name;

    if(
      collectionName === undefined ||
      collectionName === ''
    ) this._collectionName = name.toLowerCase()+'s';
    else this._collectionName = collectionName;
  }
  get collectionName() {
    return this._collectionName;
  }

  get ctxName() {
    return this._ctxName;
  }

  set db(db) {
    this._db = db;
  }

  set collection(collection) {
    this._collection = collection;
  }
}

module.exports = Schema;