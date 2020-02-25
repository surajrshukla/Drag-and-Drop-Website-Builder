const BaseCollection = require('./baseCollection')

class PageCollection extends BaseCollection {
    constructor() {
        const DB_NAME = process.env.DB_NAME;
        super(DB_NAME, "PageCollection");
    }
}

module.exports = PageCollection;