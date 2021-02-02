export const onSignIn = () => {
  return new Promise<boolean>(function (resolve, reject) {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })
}
