# Introduction

Node.Js implementation of Pixhost.to API.

# Installation

```shell
# cd /your/project/directory
# npm install pixhost --save
```

# Usage

## Image upload:

```javascript
const pixhost = require('pixhost').init()

pixhost.uploadImage('/path/to/assets/image.jpg', 0, 500)
    .then (response => console.log(response))
    .catch (response => console.log(response))
```

## Cover upload:

```javascript
const pixhost = require('pixhost').init()

pixhost.uploadCover(['/path/to/assets/cover_left.jpg', '/path/to/assets/cover_right.jpg'], 0)
    .then (response => console.log(response))
    .catch (response => console.log(response))
```

## Galleries:

```javascript
const pixhost = require('pixhost').init()
let galleryHash
let galleryUploadHash
let galleryUrl;

//Creating gallery, uploading image into it and finalizing
(async () => {
    await pixhost.createGallery('Test Gallery')
        .then (response => {
            galleryHash = response.gallery_hash
            galleryUploadHash = response.gallery_upload_hash
            galleryUrl = response.gallery_url
        });
    await pixhost.uploadImage('/path/to/assets/image.jpg', 0, 320, galleryHash, galleryUploadHash)
    await pixhost.finalizeGallery(galleryHash, galleryUploadHash)
        .then (response => {
            if (response == 200) {
                console.log(`Gallery hash: ${galleryHash}, gallery upload hash: ${galleryUploadHash}\nGallery url: ${galleryUrl}`)
            }
        })
})()
```