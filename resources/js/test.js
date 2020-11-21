const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const mesOne = document.querySelector('#mes1')
const mesTwo = document.querySelector('#mes2')

weatherForm.addEventListener('submit',(e) => {

    e.preventDefault()
    const location  = search.value

    mesOne.textContent = 'Loading...'
    mesTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            mesOne.textContent = data.error
        }
        else{
            mesOne.textContent = data.place
            mesTwo.textContent =  data.forecast
        }
        
    })
})
    console.log(location)
    
})