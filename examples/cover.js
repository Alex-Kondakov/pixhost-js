//PixHost.to cover upload

const ph = require('../libs/pixhost');

//Initialization
const pixhost = ph.init();

pixhost.uploadCover(['/path/to/assets/cover_left.jpg', '/path/to/assets/cover_right.jpg'], 0)
    .then (response => console.log(response))
    .catch (response => console.log(response));