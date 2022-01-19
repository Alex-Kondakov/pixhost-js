# Introduction

Node.Js implementation of Pixhost.to API.

# Installation

```shell
# cd /your/projects/dir
# mkdir pixhost
# cd pixhost
# git clone https://github.com/Alex-Kondakov/pixhost-js.git
# npm install
```

# Usage

## Image upload:

```javascript
const ph = require('../libs/pixhost');

//Initialization
const pixhost = ph.init();

pixhost.uploadImage('/path/to/assets/image.jpg', 0, 500)
    .then (response => console.log(response))
    .catch (response => console.log(response));
```

## Cover upload:

```javascript
const ph = require('../libs/pixhost');

//Initialization
const pixhost = ph.init();

pixhost.uploadCover(['/path/to/assets/cover_left.jpg', '/path/to/assets/cover_right.jpg'], 0)
    .then (response => console.log(response))
    .catch (response => console.log(response));
```

## Galleries:

```javascript
const ph = require('../libs/pixhost');
let galleryHash;
let galleryUploadHash;
let galleryUrl;

//Initialization
const pixhost = ph.init();

//Creating gallery, uploading image into it and finalizing
(async () => {
    await pixhost.createGallery('Test Gallery')
        .then (response => {
            galleryHash = response.gallery_hash;
            galleryUploadHash = response.gallery_upload_hash;
            galleryUrl = response.gallery_url;
        });
    await pixhost.uploadImage('/path/to/assets/image.jpg', 0, 320, galleryHash, galleryUploadHash)
    await pixhost.finalizeGallery(galleryHash, galleryUploadHash)
        .then (response => {
            if (response == 200) {
                console.log(`Gallery hash: ${galleryHash}, gallery upload hash: ${galleryUploadHash}\nGallery url: ${galleryUrl}`);
            }
        })
})();
```