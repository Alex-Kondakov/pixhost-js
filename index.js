// (c) Alex Kondakov
// PixHost.to API implementation

const Promise = require('promise')
const fs = require('fs')
const path = require('path')
const request  = require('request')

//Checking if passed string JSON or not
const isJson = input => {
    try {
        JSON.parse(input)
    } 
    catch (err) {
        return false
    }
    return true
}

exports.init = () => {
    return {
        //Upload image. filePath - path to image. content_type - adult content, 1 if true, 0 otherwise. max_th_size - maximal thumbnail size - integer between 150 and 500. gallery_hash, gallery_upload_hash - for upload to gallery
        uploadImage (filePath, content_type=1, max_th_size=320, gallery_hash, gallery_upload_hash) {
            let fileStream = fs.createReadStream(filePath);
            let data = {
                img: fileStream,
                content_type: content_type,
                max_th_size: max_th_size
            }
            if (gallery_hash) {
                data.gallery_hash = gallery_hash;
            }
            if (gallery_upload_hash) {
                data.gallery_upload_hash = gallery_upload_hash;
            }
            return new Promise ((resolve, reject) => {
                request.post({url: 'https://api.pixhost.to/images', headers: {'Content-Type': 'multipart/form-data; charset=utf-8', 'Accept': 'application/json'}, formData: data}, (err, httpResponse, body) => {
                    if (err) {
                        reject('pixhost uploadImage ' + err);
                    } else {
                        if (isJson(body)) {
                            resolve(JSON.parse(body))
                        } else {
                            reject('pixhost uploadImage ' + body)
                        }
                        
                    }
                })
            })
        },
        //Upload all images from array
        uploadAll (filePaths, content_type=1, max_th_size=320, gallery_hash, gallery_upload_hash) {
            return new Promise ((resolve, reject) => {
                (async () => {
                    try {
                        //Uploaded links
                        let uploaded = []
                        for (const file of filePaths) {
                            await this.uploadImage(file, content_type, max_th_size, gallery_hash, gallery_upload_hash)
                                .then(response => uploaded.push(response))
                        }
                        resolve(uploaded)
                    }
                    catch (err) {
                        reject('pixhost uploadAll ' + err)
                    }
                })()
            })
        },
        //Upload cover. PixHost.to cover is two images joined horizontally. images - array of left and right images (paths to each). right image is optional. content_type - adult content, 1 if true, 0 otherwise. gallery_hash, gallery_upload_hash - for upload to gallery
        uploadCover (images, content_type=1, gallery_hash, gallery_upload_hash) {
            let img_left = fs.createReadStream(images[0]);
            let data = {
                img_left: img_left,
                content_type: content_type,
            }
            if (images[1]) {
                let img_right = fs.createReadStream(images[1]);
                data.img_right = img_right;
            }
            if (gallery_hash) {
                data.gallery_hash = gallery_hash;
            }
            if (gallery_upload_hash) {
                data.gallery_upload_hash = gallery_upload_hash;
            }
            return new Promise ((resolve, reject) => {
                request.post({url: 'https://api.pixhost.to/covers', headers: {'Content-Type': 'multipart/form-data; charset=utf-8', 'Accept': 'application/json'}, formData: data}, (err, httpResponse, body) => {
                    if (err) {
                        reject('pixhost uploadCover ' + err);
                    } else {
                        if (isJson(body)) {
                            resolve(JSON.parse(body))
                        } else {
                            reject('pixhost uploadCover ' + body)
                        }
                    }
                })
            })
        },
        //Create gallery
        createGallery (gallery_name) {
           return new Promise ((resolve, reject) => {
                request.post({url: 'https://api.pixhost.to/galleries', headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8', 'Accept': 'application/json'}, formData: {'gallery_name': gallery_name}}, (err, httpResponse, body) => {
                    if (err) {
                        reject('pixhost createGallery ' + err);
                    } else {
                        if (isJson(body)) {
                            resolve(JSON.parse(body))
                        } else {
                            reject('pixhost createGallery ' + body)
                        }
                    }
                })
           }) 
        },
        //Finalize gallery. A gallery & images are not available until the gallery is finalized.
        finalizeGallery (gallery_hash, gallery_upload_hash) {
            return new Promise ((resolve, reject) => {
                 request.post({url: `https://api.pixhost.to/galleries/${gallery_hash}/finalize`, headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8', 'Accept': 'application/json'}, formData: {'gallery_upload_hash': gallery_upload_hash}}, (err, httpResponse, body) => {
                     if (err) {
                         reject('pixhost finalizeGallery ' + err);
                     } else {
                         resolve(httpResponse.statusCode);
                     }
                 })
            }) 
         }
 

    }
}