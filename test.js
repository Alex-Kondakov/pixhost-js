import { uploadImage, createGallery, finalizeGallery } from './index.js'

const gallery = await createGallery('test')
const output = await uploadImage('/Users/deadtoto/Downloads/giphy.gif', gallery['gallery_upload_hash'], gallery['gallery_hash'])
const finalyzedGallery = await finalizeGallery(gallery['gallery_upload_hash'], gallery['gallery_hash'])

console.log(gallery['gallery_upload_hash'])
console.log(gallery['gallery_hash'])
console.log(output)
console.log(finalyzedGallery)