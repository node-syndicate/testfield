class BaseMongoDbData {
    constructor(db, ModelClass, validator) {
        this.db = db;
        this.ModelClass = ModelClass;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    filterBy(props) {
        return this.collection.find(props).toArray();
    }

    getAll() {
        return this.collection.find().toArray();
    }

    create(model) {
        return this.collection.insert(model)
        .then(() => {
            return model;
        });
    }

    findOne(props) {
        return this.collection.findOne(props);
    }

    _getCollectionName() {
        return this.ModelClass.name.toLowerCase() + 's';
    }
}

module.exports = BaseMongoDbData;
