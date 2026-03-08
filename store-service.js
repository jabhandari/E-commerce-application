const fs = require("fs");
const path = require("path");

let items = [];
let categories = [];

const itemsPath = path.join(__dirname, "data", "items.json");
const categoriesPath = path.join(__dirname, "data", "categories.json");

function writeItemsFile() {
  return new Promise((resolve, reject) => {
    fs.writeFile(itemsPath, JSON.stringify(items, null, 2), "utf8", (err) => {
      if (err) reject("unable to write items file");
      else resolve();
    });
  });
}

module.exports.initialize = function () {
  return new Promise((resolve, reject) => {
    fs.readFile(itemsPath, "utf8", (err, itemData) => {
      if (err) {
        reject("unable to read items.json");
        return;
      }

      fs.readFile(categoriesPath, "utf8", (err, categoryData) => {
        if (err) {
          reject("unable to read categories.json");
          return;
        }

        try {
          items = JSON.parse(itemData);
          categories = JSON.parse(categoryData);
          resolve();
        } catch (parseErr) {
          reject("invalid JSON data");
        }
      });
    });
  });
};

module.exports.getAllItems = function () {
  return new Promise((resolve, reject) => {
    items.length > 0 ? resolve(items) : reject("no results returned");
  });
};

module.exports.getPublishedItems = function () {
  return new Promise((resolve, reject) => {
    const publishedItems = items.filter((item) => item.published === true);
    publishedItems.length > 0 ? resolve(publishedItems) : reject("no results returned");
  });
};

module.exports.getCategories = function () {
  return new Promise((resolve, reject) => {
    categories.length > 0 ? resolve(categories) : reject("no results returned");
  });
};

module.exports.addItem = function (itemData) {
  return new Promise(async (resolve, reject) => {
    try {
      const newId =
        items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;

      const newItem = {
        id: newId,
        category: Number(itemData.category),
        postDate: new Date().toISOString().split("T")[0],
        featureImage: itemData.featureImage || "https://via.placeholder.com/300x200?text=No+Image",
        price: Number(itemData.price) || 0,
        title: itemData.title || "Untitled Item",
        body: itemData.body || "",
        published: itemData.published ? true : false,
      };

      items.push(newItem);
      await writeItemsFile();
      resolve(newItem);
    } catch (err) {
      reject("unable to add item");
    }
  });
};

module.exports.getItemsByCategory = function (category) {
  return new Promise((resolve, reject) => {
    const filteredItems = items.filter(
      (item) => item.category === Number(category)
    );
    filteredItems.length > 0 ? resolve(filteredItems) : reject("no results returned");
  });
};

module.exports.getItemsByMinDate = function (minDateStr) {
  return new Promise((resolve, reject) => {
    const filteredItems = items.filter(
      (item) => new Date(item.postDate) >= new Date(minDateStr)
    );
    filteredItems.length > 0 ? resolve(filteredItems) : reject("no results returned");
  });
};

module.exports.getItemById = function (id) {
  return new Promise((resolve, reject) => {
    const item = items.find((item) => item.id === Number(id));
    item ? resolve(item) : reject("no result returned");
  });
};