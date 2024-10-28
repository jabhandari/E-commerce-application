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
}

module.exports.getAllItems = function(){
    return new Promise((resolve, reject) => {
        (posts.length > 0) ? resolve(posts) : reject("no results returned"); 
    });
}

module.exports.getPublishedItems = function(){
    return new Promise((resolve, reject) => {
        const publishedItems = posts.filter(item => item.published);
        (publishedItems.length > 0) ? resolve(publishedItems) : reject("no results returned");
    });
}

module.exports.getCategories = function(){
    return new Promise((resolve, reject) => {
        (categories.length > 0) ? resolve(categories) : reject("no results returned"); 
    });
}

module.exports.addItem = function(itemData) {
    return new Promise((resolve, reject) => {
        itemData.published = itemData.published ? true : false;
        itemData.id = posts.length + 1;
        posts.push(itemData);
        resolve(itemData);
    });
}
