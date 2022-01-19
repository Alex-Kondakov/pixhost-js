//PixHost.to gallery create

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
