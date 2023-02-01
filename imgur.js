const CLIENT_ID = 'aea97fa63020b81'
const BASIC_URL = 'https://api.imgur.com/3'

const sendButton = document.getElementById('sendButton')
const commentInput = document.getElementById('commentInput')
const fileInput = document.getElementById('fileInput')
const results = document.getElementById('results')

sendButton.addEventListener('pointerdown', e => {
  e.preventDefault()
  if (fileInput.files.length === 0) {
    alert('please choose a file')
    return
  }
  const formData = new FormData()
  formData.append('image', fileInput.files[0])
  const headers = new Headers()
  headers.append('Authorization', `Client-ID ${CLIENT_ID}`)
  headers.append('Content-Length', JSON.stringify(formData).length)

  fetch(`${BASIC_URL}/image`, {
    method: 'POST',
    headers,
    body: formData,
    // redirect: 'follow'
  }).then(response => response.json())
    .then(data => data.data.link)
    .then(link => {
      const img = document.createElement('img')
      img.setAttribute('src', link)
      results.appendChild(img)
    })
    .catch(err => console.error(err))
})