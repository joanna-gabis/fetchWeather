const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const processingMessage = document.getElementById('processing-message')
const successMessage = document.getElementById('success-message')

processingMessage.textContent = ''
successMessage.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    processingMessage.textContent = 'Processing...'

    fetch(`/weather?address=${location}`).then(response => {
        response.json().then(data => {
            processingMessage.textContent = ''
            if (data.error) {
                successMessage.textContent = data.error
            } else {
                successMessage.textContent = 'Forecast for ' + data.location + ': ' + data.forecast
            }
        })
    })
})