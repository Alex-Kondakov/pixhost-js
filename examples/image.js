//PixHost.to image upload

const pixhost = require('pixhost').init()

pixhost.uploadImage('/path/to/assets/image.jpg', 0, 500)
    .then (response => console.log(response))
    .catch (response => console.log(response))