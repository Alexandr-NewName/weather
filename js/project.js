const APIKEY = 'dde0aa7d090f85292a5688478abdcba1'



const $cardsBox = document.getElementById('cards-box')
const $locationForm = document.getElementById('location-form')
const $locationInput = document.getElementById('location-form-input')
let currentCard = null

async function getWeatherData(location){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={APIKEY}`)

    const data = response.json()

    return data
}

function getNewCard() {
    const $card = document.createElement('div')
    $card.classList.add('card')

    $card.innerHTML = `
    <div class="card">

                    <!-- Шапка -->

                    <div class="card_inner">
                        <div class="card_head">

                            <div class="card_head-left">

                                <div class="card-icon">

                                </div>
                                <div class="card_head-left-title">
                                    <h3 class="card_title"></h3>
                                    <span class="card_desc"></span>
                                </div>
                            </div>

                            <div class="card_head-right card-param">
                                <!-- <svg class="card-param_icon" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"> -->
                                <!-- <path
                                        d="M15, 16a3, 3, 0, 1,1-3-3a3,3,0,0,1,15,16ZM16,5v5,262a7,7,0,1,1-8,0V5a4,
                                         4,0,0,1,8,0Zm-1.5,6.675a1,1,0,0,1-,5-,865V5a2,2,0,0,0-4,0vs.81a1,1,0,0,1-.5.865,
                                         5,5,0,1,0,5,0Z"/> -->
                                <!--                                      
                                        </svg> -->
                                <img class="card-param_icon" viewBox="0 0 24 24" src="free-icon-temperature-3923489.png"
                                    alt="http://www.w3.org/2000/svg">

                                <span class="card-param-text">
                                    <span class="card-param-value card-param-value_temp"></span>

                                    <sup>o</sup>C
                                </span>
                            </div>

                        </div>

                        <!-- Футер -->

                        <div class="card_footer">

                            <div class="card_footer-left card-param">
                                <img src="free-icon-wind-615579.png" alt=""
                                    class="card-param-icon card-param-icon_footer">
                                <span class="card-param-text_footer">

                                    <span class="card-param-value card-param-value_wind">

                                    </span>м/с

                                </span>
                            </div>

                            <div class="card_footer-right card-param">
                                <img src="free-icon-windy-1163622.png" alt=""
                                    class="card-param-icon card-param-icon_footer" viewBox="0 0 800 800">
                                <span class="card-param-text_footer">
                                    <span class="card-param-value card-param-value_humidity">
                                        
                                    </span>%
                                </span>
                            </div>

                        </div>
                    </div>



                </div>
    `

    return {
        $card,
        $icon: $card.querySelector(".card_icon"),
        $title: $card.querySelector('.card_title'),
        $temp: $card.querySelector('.card-param-value_temp'),
        $desc: $card.querySelector('.card_desc'),
        $wind: $card.querySelector('.card-param-value_wind'),
        $humidity: $card.querySelector('.card-param-value_humidity'),
    }
}

$locationForm.addEventListener('submit', function (event) {
    event.preventDefault()


    const newCard = getNewCard()

    const location = $locationInput.value.trim()
    $locationInput.value = " "

    $cardsBox.prepend(newCard.$card)

    setTimeout( async function () {
        newCard.$card.classList.add("loading")
        

        const data = await getWeatherData(location)

        newCard.$icon.style.backgroundImage = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}10d@2x.png) `

        newCard.$title.textContent = data.name
        newCard.$desc.textContent = data.weather[0].description
        newCard.$temp.textContent = data.main.temp
        newCard.$wind.textContent = data.wind.speed
        newCard.$humidity.textContent = data.main.humidity


        console.log(data);

        setTimeout(function () {
            //  смена стиля формы
            document.querySelector('.app_container').classList.add('app_container_top')

            if (currentCard !== null) {
                // currentCard.$card.classList.remove("full")
                currentCard.$card.classList.add("glass")
            }
            currentCard = newCard

            newCard.$card.classList.remove("loading")
            newCard.$card.classList.add("full")

        }, 800)

    }, 30)


})
