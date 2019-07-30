const fetchUrlFragment = () => {
  let fragment = window.location.hash
  if (fragment) {
    return fragment.slice(14)
  } else {
    return null
  }
}

const accessToken = fetchUrlFragment()

if (accessToken) {
  let tokenBody = document.getElementById('token-body')
  tokenBody.innerHTML = `
  <h2>Success! Here's your access token:</h2>
  <pre style="font-size: 1.15em;white-space: pre-wrap;word-break: break-word;">${accessToken}</pre>
  <a id="copyBtn" href="#" data="${accessToken}" class="btn btn-default">Copy to Clipboard</a>`
}

$('#id-submit-btn').on('click', function (e) {
  e.preventDefault()
  var ID = $('#client-id-field').val()
  var urlPartial = 'https://api.instagram.com/oauth/authorize/?client_id=' + ID + '&redirect_uri=https://igmultifeeder.com/token/&response_type=token'
  window.location.replace(urlPartial)
})

var copyBtn = document.querySelector('#copyBtn')
copyBtn.addEventListener('click', function (event) {
  // Select the email link anchor text
  var textArea = document.createElement('textarea')

  var emailLink = copyBtn.getAttribute('data')
  console.log(emailLink)
  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'absolute'
  textArea.style.top = 0
  textArea.style.left = '-200px'

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em'
  textArea.style.height = '2em'
  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0

  // Clean up any borders.
  textArea.style.border = 'none'
  textArea.style.outline = 'none'
  textArea.style.boxShadow = 'none'
  // textArea.style.visibility = 'hidden'
  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent'


  textArea.value = emailLink

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  var range = document.createRange()
  range.selectNode(copyBtn)
  window.getSelection().addRange(range)

  try {
    // Now that we've selected the anchor text, execute the copy command
    var successful = document.execCommand('copy')
    var msg = successful ? 'successful' : 'unsuccessful'
    console.log('Copy command was ' + msg)
    copyBtn.innerText = 'Copied to Clipboard!'
  } catch (err) {
    console.log('Oops, unable to copy')
  }
  // Remove the selections - NOTE: Should use
  // removeRange(range) when it is supported
  window.getSelection().removeAllRanges()
})