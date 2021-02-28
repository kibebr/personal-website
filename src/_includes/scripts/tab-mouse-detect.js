document.body.addEventListener('mousedown', () => {
  document.body.classList.add('using-mouse')
})

document.body.addEventListener('keydown', event => {
  event.keyCode === 9 && document.body.classList.remove('using-mouse')
})
