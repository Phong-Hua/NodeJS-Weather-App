const runForecast = (address, callback) => {
    fetch(`/weather/?address=${encodeURIComponent(address)}`)
    .then(response => response.json())
    .then(data => callback(data))
    .catch(error => error)
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''



weatherForm.addEventListener('submit', (e)=> {

    e.preventDefault();
    const location = search.value;

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    

    runForecast(location, (data) => {
        if (data.error) {
            messageOne.textContent = data.error;
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecastData;
        }
    });
})