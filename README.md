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
import * as pixhost from 'pixhost'

const response = await pixhost.uploadImage('/path/to/assets/image.jpg')
console.log(response)
```

## Cover upload:

```javascript
import * as pixhost from 'pixhost'

const response = await pixhost.uploadCover(['/path/to/assets/cover_left.jpg', '/path/to/assets/cover_right.jpg'])
console.log(response)
```

## Galleries

```javascript
import { uploadImage, createGallery, finalizeGallery } from './index.js'

const gallery = await createGallery('test')
const output = await uploadImage('/Users/deadtoto/Downloads/giphy.gif', gallery.gallery_upload_hash, gallery.gallery_hash)
const finalyzedGallery = await finalizeGallery(gallery.gallery_upload_hash, gallery.gallery_hash)

console.log(gallery)
console.log(output)
console.log(finalyzedGallery)
```