export const getLastPath = (pathname) => {
  const tokens = pathname.split('/')
  return tokens[tokens.length - 1]
}

export const getFile = (payload) => {
  const tokens = payload.split('\n')
  const url = URL.createObjectURL(
    new Blob([
      new Uint8Array(
        atob(tokens[2])
          .split('')
          .map((c) => c.charCodeAt(0)),
      ),
    ]),
  )

  return {
    name: tokens[0],
    size: tokens[1],
    url,
  }
}

export const autoConvertUnit = (bytes) =>
  bytes < 1024
    ? bytes + ' B'
    : bytes < 1024 * 1024
    ? Number(bytes / 1024).toFixed(1) + ' KB'
    : bytes < 1024 * 1024 * 1024
    ? Number(bytes / 1024 / 1024).toFixed(1) + ' MB'
    : Number(bytes / 1024 / 1024 / 1024).toFixed(1) + ' GB'

export const download = (fileName, fileUrl) => {
  var link = document.createElement('a')
  link.href = fileUrl
  link.download = fileName
  link.style.display = 'none'
  var evt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  })

  document.body.appendChild(link)
  link.dispatchEvent(evt)
  document.body.removeChild(link)
}
