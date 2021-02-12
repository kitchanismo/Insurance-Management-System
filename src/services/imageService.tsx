import http from 'utils/http'

export const postImage = async (
  image: Blob,
  cb: (image_url: string) => Promise<any>,
) => {
  if (!image?.size) {
    return cb('')
  }

  const formData = new FormData()
  formData.append('file', image!)
  formData.append('upload_preset', 'wlttlc0c')
  formData.append('cloud_name', 'kitchanismo')

  return http.axios
    .post('https://api.cloudinary.com/v1_1/kitchanismo/image/upload', formData)
    .then(({ data }) => cb(data.url))
    .catch(() => cb(''))
}
