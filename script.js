const city = document.getElementById('city');
const name = document.querySelector('.name');
const temp = document.querySelector('.temp');
const condition = document.querySelector('.condition');
const desc = document.querySelector('.desc');
const img = document.querySelector('.img');
const body = document.querySelector('body');
const mainDiv = document.querySelector('.main_div')

city.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=
            ${city.value}&units=imperial&appid=fbfee3b12a9a997777e711783af857d0`)
            const data = await res.json()
            const nameValue = data['name'];
            const tempValue = Math.round(data['main']['temp']);
            const sky = data['weather'][0]['main']
            const skyDesc = data['weather'][0]['description']
            const timezone = data['timezone']

            if(sky === 'Clear'){
                img.src = 'img/sunny.png'
                body.style.backgroundImage = 'radial-gradient(circle 120px at 10% 10%, yellow, lightyellow, aqua)';
                mainDiv.style.backgroundColor = 'rgba(24, 230, 230, 0.7)'
            } else if (skyDesc === 'few clouds') {
                img.src = 'img/a_cloud.png'
                body.style.backgroundColor = 'aqua'
                body.style.backgroundImage = "linear-gradient(to right, rgba(98, 192, 230, 0.65),"+ 
                "rgba(111, 202, 238, 0.9)), url('img/clouds.gif')";
                body.style.backgroundSize = 'cover'
                mainDiv.style.backgroundColor = ''
            } else if (skyDesc === 'overcast clouds') {
                img.src = 'img/cloudy.png'
                body.style.backgroundImage = 'linear-gradient(rgb(97, 96, 96), rgb(146, 140, 140))'
                mainDiv.style.backgroundColor = 'grey'
            } else if (sky === 'Clouds') {
                img.src = 'img/partly_cloudy.png'
                body.style.backgroundImage = 'radial-gradient(yellow, grey)'
                mainDiv.style.backgroundColor = ''
            } else if (sky === 'Mist' || sky === 'Haze' || sky === 'Fog') {
                img.src = 'img/fog.png'
                body.style.backgroundImage = 'linear-gradient(grey, white, grey, white)'
                mainDiv.style.backgroundColor = 'lightgrey'
            } else if (sky === 'Rain') {
                img.src = 'img/rain.png'
                body.style.backgroundImage = "linear-gradient(to right, rgba(82, 78, 78, 0.7),"+ 
                "rgba(12, 11, 11, 0.7)),url('img/rain.gif')"
                body.style.backgroundSize = ''
                mainDiv.style.backgroundColor = 'grey'
            } else if (sky === 'Snow') {
                img.src = 'img/snow.png'
                body.style.backgroundImage = "linear-gradient(to right, rgba(255, 255, 255, 0.85),"+
                "rgba(225, 225, 225, 0.8)), url('img/snow.gif')"
                body.style.backgroundSize = 'cover'
                mainDiv.style.backgroundColor = 'white'
            } else {
                img.src = ''
                body.style.backgroundImage = ''
                mainDiv.style.backgroundColor = ''
            }

            name.innerHTML = nameValue;
            temp.innerHTML = `Current Temperature: ${tempValue}\xB0F`
            condition.innerHTML = sky
            desc.innerHTML = `Description: ${skyDesc}`

            let xhr = new XMLHttpRequest();
            xhr.open('GET', `https://api.codetabs.com/v1/proxy?quest=https://www.gettyimages.com/`+
            `photos/chicago?assettype=image&phrase=${city.value}&sort=mostpopular`, true);
            xhr.responseType = 'document';
        
            xhr.onload = function(){
                let response = xhr.responseXML.querySelectorAll('.MosaicAsset-module__thumb___YJI_C')
                const image1 = document.getElementById('image1')
                const image2 = document.getElementById('image2')
                image1.src = response[0].src;
                image2.src = response[1].src;
            }
            xhr.send();

        } catch(err) {
            alert('Invalid city name. Please try again.')
    }}
})
