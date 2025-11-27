const { createUploader } = require('./multerUpload')

const imageMime = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/jpg'
]
const docMime = ['application/pdf']

const userProfile = createUploader({
  folderName: 'user',
  allowedMime: [...imageMime],
  maxSize: 5 * 1024 * 1024
})

const ownerProfile = createUploader({
  folderName: "owner",
  allowedMime: [...imageMime],
  maxSize: 5 * 1024 * 1024
})


const adminDoc = uploadProfilePics.fields([
  { name: 'profilePic', maxCount: 1 }
])

const userDoc = userProfile.fields([
  { name: 'profilePic', maxCount: 1 }
])

const ownerDoc = ownerProfile.fields([
  { name : "profilePic", maxCount: 1 }
])

module.exports = { userDoc, ownerDoc }