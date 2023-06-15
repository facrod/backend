import cloud from "cloudinary"

const cloudinary = cloud.v2

const cloud_name ='dtttpvupl'
const api_key = '483691647417938'
const api_secret = "Miu4r5siB9e8SFHlBnfN5kRXtI4" 

cloudinary.config({
    cloud_name,
    api_key,
    api_secret
})

async function UploadPicture(file) {
    const {path} = file
    const res = await cloudinary.uploader.upload(path, {
        resource_type: "image"
    })
    return res
}

export {UploadPicture}