const fs = require("fs");

let posts = [];
let categories = [];

module.exports.initialize = function () {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/items.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                posts = JSON.parse(data);
                fs.readFile('./data/categories.json', 'utf8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        categories = JSON.parse(data);
                        resolve();
                    }
                });
            }
        });
    });
};

module.exports.getAllItems = function () {
    return new Promise((resolve, reject) => {
        posts.length > 0 ? resolve(posts) : reject("no results returned");
    });
};

module.exports.getPublishedItems = function () {
    return new Promise((resolve, reject) => {
        const publishedItems = posts.filter(item => item.published);
        publishedItems.length > 0 ? resolve(publishedItems) : reject("no results returned");
    });
};

module.exports.getCategories = function () {
    return new Promise((resolve, reject) => {
        categories.length > 0 ? resolve(categories) : reject("no results returned");
    });
};

module.exports.addItem = function (itemData) {
    return new Promise((resolve, reject) => {
        itemData.published = itemData.published ? true : false;
        itemData.id = posts.length + 1;
        posts.push(itemData);
        resolve(itemData);
    });
};

module.exports.getItemsByCategory = function (category) {
    return new Promise((resolve, reject) => {
        const filteredItems = posts.filter(item => item.category === category);
        filteredItems.length > 0 ? resolve(filteredItems) : reject("no results returned");
    });
};

module.exports.getItemsByMinDate = function (minDateStr) {
    return new Promise((resolve, reject) => {
        const filteredItems = posts.filter(item => new Date(item.postDate) >= new Date(minDateStr));
        filteredItems.length > 0 ? resolve(filteredItems) : reject("no results returned");
    });
};

module.exports.getItemById = function (id) {
    return new Promise((resolve, reject) => {
        const item = posts.find(item => item.id === parseInt(id));
        item ? resolve(item) : reject("no result returned");
    });
};
