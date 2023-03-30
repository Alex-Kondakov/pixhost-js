// (c) Alex Kondakov
// PixHost.to API implementation

import fetch, { FormData, fileFromSync } from 'node-fetch'

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

//Upload single image
export const uploadImage = async (filePath, gallery_upload_hash=null, gallery_hash=null, content_type=1, max_th_size=320) => {
    try {
        const formData = new FormData()
        let target = fileFromSync(filePath)

        formData.set('img', target)
        formData.set('content_type', content_type)
        formData.set('max_th_size', max_th_size)


        if (gallery_hash) {
            formData.set('gallery_hash', gallery_hash)
        }
        if (gallery_upload_hash) {
            formData.set('gallery_upload_hash', gallery_upload_hash)
        }

        const response = await fetch('https://api.pixhost.to/images', {
            method: 'POST',
            body: formData
        })
        const data = await response.json()
        data.direct_url = data.th_url.replace('/thumbs/', '/images/').replace('://t', '://img')

        return data
    } catch(e) {
        console.log(e)
        return false
    }
}

//Upload cover. Requires two images passed as array
export const uploadCover = async (images, gallery_upload_hash=null, gallery_hash=null, content_type=1) => {
    try {
        const formData = new FormData()
        let targetLeft = fileFromSync(images[0])
        let targetRight = fileFromSync(images[1])

        formData.set('img_left', targetLeft)
        formData.set('img_right', targetRight)
        formData.set('content_type', content_type)

        if (gallery_hash) {
            formData.set('gallery_hash', gallery_hash)
        }
        if (gallery_upload_hash) {
            formData.set('gallery_upload_hash', gallery_upload_hash)
        }

        const response = await fetch('https://api.pixhost.to/covers', {
            method: 'POST',
            body: formData
        })
        const data = await response.json()
        data.direct_url = data.th_url.replace('/thumbs/', '/images/').replace('://t', '://img')

        return data
    } catch(e) {
        console.log(e)
        return false
    }
}

//Create gallery
export const createGallery = async name => {
    try {
        const formData = new FormData()
        formData.set('gallery_name', name)

        const response = await fetch('https://api.pixhost.to/galleries', {
            method: 'POST',
            body: formData
        })
        const data = await response.json()

        return data
    } catch(e) {
        console.log(e)
        return false
    }
}

//Finalyze gallery
export const finalizeGallery = async (gallery_upload_hash, gallery_hash) => {
    try {
        const formData = new FormData()
        formData.set('gallery_upload_hash', gallery_upload_hash)

        const response = await fetch(`https://api.pixhost.to/galleries/${gallery_hash}/finalize`, {
            method: 'POST',
            body: formData
        })
        const data = await response.json()

        return data
    } catch(e) {
        console.log(e)
        return false
    }
}