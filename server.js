const express = require('express');
const storeService = require("./store-service");
const path = require("path");
const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

const app = express();

const HTTP_PORT = process.env.PORT || 8080;
cloudinary.config({
    cloud_name: 'dyfd3rjkn',
    api_key: '499268822322956',
    api_secret: '-Lt12gltJ1e63Dp6GmbGtnDdJGw',
    secure: true
});

const upload = multer();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function streamUpload(req) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
                resolve(result);
            } else {
                reject(error);
            }
        });

        streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
}

app.get('/', (req, res) => {
    res.redirect("/about");
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"))
});

app.get("/shop", async (req, res) => {
    try {
        let items;

        if (req.query.category) {
            items = await storeService.getItemsByCategory(req.query.category);
        } else if (req.query.minDate) {
            items = await storeService.getItemsByMinDate(req.query.minDate);
        } else {
            items = await storeService.getPublishedItems();
        }
        let html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Shop</title>
        <link rel="stylesheet" href="/css/main.css" />
      </head>
      <body>
        <nav>
          <a href="/about">About</a>
          <a href="/shop">Shop</a>
          <a href="/items/add">Add Item</a>
        </nav>

        <main class="container">
          <h1>Shop</h1>
          <p>Browse available store items below.</p>

          <div class="card-grid">
    `;

        if (!items || items.length === 0) {
            html += `<p>No items found.</p>`;
        } else {
            html += items
                .map(
                    (item) => `
            <div class="card">
              <img src="${item.featureImage || "https://via.placeholder.com/300x200?text=No+Image"}" alt="${item.itemName || "Item"}" />
              <div class="card-body">
<h3>${item.title || "Untitled Item"}</h3>       
         <p><strong>Category:</strong> ${item.category || "N/A"}</p>
                <p><strong>Price:</strong> $${item.price || "0.00"}</p>
                <p>${item.body || "No description available."}</p>
              </div>
            </div>
          `
                )
                .join("");
        }

        html += `
          </div>
        </main>
      </body>
      </html>
    `;

        res.send(html);
    } catch (err) {
        res.status(500).send(`Unable to load shop page: ${err}`);
    }
});

app.get('/store', (req, res) => {
    storeService.getPublishedItems().then((data => {
        res.json(data);
    })).catch(err => {
        res.json({ message: err });
    });
});



app.get('/categories', (req, res) => {
    storeService.getCategories().then((data => {
        res.json(data);
    })).catch(err => {
        res.json({ message: err });
    });
});

app.get('/items/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'addItem.html'));
});

app.post('/items/add', upload.single("featureImage"), (req, res) => {
    if (req.file) {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                });
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        async function upload(req) {
            let result = await streamUpload(req);
            return result;
        }

        upload(req).then((uploaded) => {
            processItem(uploaded.url);
        });
    } else {
        processItem("");
    }

    function processItem(imageUrl) {
        req.body.featureImage = imageUrl;

        storeService.addItem(req.body)
            .then(() => res.redirect('/items'))
            .catch(err => res.status(500).send(err));
    }
});


app.get('/items', (req, res) => {
    if (req.query.category) {
        storeService.getItemsByCategory(req.query.category)
            .then(items => res.json(items))
            .catch(err => res.status(404).send(err));
    } else if (req.query.minDate) {
        storeService.getItemsByMinDate(req.query.minDate)
            .then(items => res.json(items))
            .catch(err => res.status(404).send(err));
    } else {
        storeService.getAllItems()
            .then(items => res.json(items))
            .catch(err => res.status(500).send(err));
    }
});

app.get('/item/:id', (req, res) => {
    storeService.getItemById(req.params.id)
        .then(item => res.json(item))
        .catch(err => res.status(404).send(err));
});

app.use((req, res) => {
    res.status(404).send("404 - Page Not Found")
})

storeService.initialize().then(() => {
    app.listen(HTTP_PORT, () => {
        console.log('server listening on: ' + HTTP_PORT);
    });
}).catch((err) => {
    console.log(err);
})
