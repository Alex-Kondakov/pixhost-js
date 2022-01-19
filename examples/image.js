//PixHost.to image upload

const ph = require('../libs/pixhost');

//Initialization
const pixhost = ph.init();

pixhost.uploadImage('/path/to/assets/image.jpg', 0, 500)
    .then (response => console.log(response))
    .catch (response => console.log(response));