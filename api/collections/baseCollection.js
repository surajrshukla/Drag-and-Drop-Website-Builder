const _ = require("lodash");

class BaseCollection {
    constructor(dbName, collectionName) {
        this.dbName = dbName;
        this.collectionName = collectionName;
    }

    getCollection(callback) {
        global.mongoCon.db(this.dbName).collection(this.collectionName, callback);
    }

    insertOne(data, callback) {
        debugger
        this.getCollection((err, collection) => {
            if (err) {
                return callback(err);
            }
            collection.insertOne(data, callback);
        });
    }

    insertMany(data, callback) {
        // do a validation with this.schema
        this.getCollection((err, collection) => {
            if (err) {
                return callback(err);
            }
            collection.insertMany(data, callback);
        });
    }

    count(query, callback) {
        // do a validation with this.schema
        this.getCollection((err, collection) => {
            if (err) {
                return callback(err);
            }

            collection.countDocuments(query, callback);
        });
    }

    updateOne(query, operation, callback) {
        // do a validation with this.schema
        this.getCollection((err, collection) => {
            if (err) {
                return callback(err);
            }
            collection.updateOne(query, operation, callback);
        });
    }

    updateMany(query, data, cb) {
        // do a validation with this.schema
        this.getCollection((err, collection) => {
            if (err) {
                return cb(err);
            }
            collection.updateMany(query, data, cb);
        });
    }

    findOne(conditions, projection, callback) {
        if (typeof conditions === 'function') {
            callback = conditions;
            conditions = null;
            projection = null;
        } else if (typeof projection === 'function') {
            callback = projection;
            projection = null;
        }
        // do a validation with this.schema
        this.getCollection((err, collection) => {
            if (err) {
                return callback(err);
            }
            collection.findOne(conditions, { fields: projection }, callback);
        });
    }

    find(conditions, projection, options, callback) {
        if (typeof conditions === 'function') {
            callback = conditions;
            conditions = null;
            projection = null;
            options = {};
        } else if (typeof projection === 'function') {
            callback = projection;
            options = {};
            projection = null;
        } else if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        if (_.isEmpty(options.sort)) {
            options.sort = {};
        }
        if (_.isEmpty(options.skip)) {
            options.skip = 0;
        }
        if (_.isEmpty(options.limit)) {
            options.limit = 0;
        }

        // do a validation with this.schema
        this.getCollection((err, collection) => {
            if (err) {
                return callback(err);
            }

            collection.find(conditions).project(projection).sort(options.sort).skip(options.skip).limit(options.limit).toArray(callback);
        });
    }

    aggregate(query, callback) {
        // do a validation with this.schema
        this.getCollection((err, collection) => {
            if (err) {
                return callback(err);
            }
            collection.aggregate(query).toArray(callback);
        });
    }

    advancedAggregate(query, options, callback) {
        // do a validation with this.schema
        this.getCollection((err, collection) => {
            if (err) {
                return callback(err);
            }
            if (!_.isEmpty(options)) {
                const limit = (!_.isEmpty(options) && options.limit) ? options.limit : 20;
                const skip = options.limit ? options.limit * options.skip : 0;
                const sort = options.sort ? options.sort : { _id: -1 };
                collection.aggregate(query).skip(skip).limit(limit).sort(sort).toArray(callback);
            } else {
                collection.aggregate(query).toArray(callback);
            }
        });
    }

    deleteOne(query, callback) {
        // do a validation with this.schema
        this.getCollection((err, collection) => {
            if (err) {
                return callback(err);
            }
            collection.deleteOne(query, callback);
        });
    }

    deleteMany(query, callback) {
        // do a validation with this.schema
        this.getCollection(function (err, collection) {
            if (err) {
                return callback(err);
            }
            collection.deleteMany(query, callback);
        });
    }
}

module.exports = BaseCollection;