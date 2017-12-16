class Model {
  static find(...queryArgs) {
    if(!this._collectionName) throw new Error(Schema.Error.NoCollection);
    if (typeof queryArgs[0] !== 'object') throw new Error(Schema.Error.FirstQueryArgError);

    return new Promise((resolve, reject) => {
      this._db.get(this._collectionName).find(...queryArgs)
      .then((documents) => {
        this._db.close();
        resolve(documents);
      })
      .catch(err => {
        reject(err);
      });
    });
  }
}