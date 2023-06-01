history.pushState = function () {
  const rv = history['pushState'].apply(this, arguments)
  const e = new Event('pushState')
  e.arguments = arguments
  window.dispatchEvent(e)
  return rv
}