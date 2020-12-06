<template>
    <div ref="reminderFormModal" id="reminderFormModal" class="modal">

        <!-- Modal content -->
        <div class="modal-content">
            <p><span ref="closeModal" id="closeModal" class="close" @click="close">&times;</span></p>
            <div class="modal-body">
                <form id="reminderForm">
                    <p>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-clock" fill="currentColor"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z"/>
                            <path fill-rule="evenodd"
                                  d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
                        </svg>
                        {{ actualSelectedDayFormatted }}
                    </p>

                    <div class="form-group">
                        <label for="reminderDate">Time *</label>
                        <input name="time" type="time" v-model="time" class="form-control" id="reminderDate"
                               aria-describedby="reminderHelp" placeholder="Enter Reminder Description" required>
                        <small id="reminderDateHelp" v-if="isTimeValid" class="form-text text-danger">Time is required</small>
                    </div>
                    <div class="form-group">
                        <label for="reminderDescription">Description *</label>
                        <input name="description" required maxlength="30" @keydown.enter.stop.prevent="save" type="text" v-model="description"
                               class="form-control" id="reminderDescription" aria-describedby="reminderHelp"
                               placeholder="Enter Reminder Description">
                        <small id="reminderDescriptionHelpRequired" v-if="isDescriptionValid" class="form-text text-danger">Description is required and should be less than 30 chars.</small>
                    </div>
                    <div class="form-group">
                        <label for="reminderDescription">Search for a City</label>
                        <iframe  v-if="isLoadingCities" src="https://giphy.com/embed/3oEjI6SIIHBdRxXI40" width="50" height="50" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                        <autocomplete
                            v-model="query"
                            :data="cities"
                            @input="fetchCities"
                            @hit="fetchWeather($event)"
                            :serializer="s => s.name"
                            placeholder="Type an City"
                            ref="autocompleteComponent"
                        ></autocomplete>
                        <small v-if="isCityValid" class="form-text text-danger">You have to select a city</small>
                    </div>

                    <p v-if="city">Selected City: {{ city.name }}</p>
                    <div class="col-md-12 border-light-gray border rounded d-sm-inline-flex" v-if="weather && weather.description">
                        <div class="col-5 text-center">
                            <img  :src="weather.iconImage" :alt="weather.description" />
                            <div><span>{{weather.description}}</span></div>
                        </div>
                        <div class="col-7 py-2 small">
                            <ul style="list-style-type: none;" class="m-0  border-left border-light-gray">
                                <li>Feels Like: {{ weather.temp.feels_like }}°C</li>
                                <li>Humidity: {{ weather.temp.humidity }}</li>
                                <li>Pressure: {{ weather.temp.pressure }}</li>
                                <li>Temp Current: {{ weather.temp.temp_current }}°C</li>
                                <li>Temp Max: {{ weather.temp.temp_max }}°C</li>
                                <li>Temp Min: {{ weather.temp.temp_min }}°C</li>
                            </ul>
                        </div>
                    </div>
                </form>

                <div class="pt-3">
                    <p><span>Selected Color:</span>
                        <button class="block-color mx-1" :class="[color]"></button>
                    </p>
                    <button class="block-color mx-1" @click="color = button.color" :class="[button.color]"
                            v-for="(button, index) in colorButtons" :key="index"></button>
                </div>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-danger" form="reminderForm" v-if="selectedReminder"
                        @click.stop.prevent="removeReminder">Remove Reminder
                </button>
                <button id="save-button" type="submit" class="btn btn-primary" form="reminderForm" @click.stop.prevent="save">
                    {{ selectedReminder ? 'Update Reminder' : 'Add Reminder' }}
                </button>
                <button type="button" class="btn btn-secondary" @click="close">Close</button>
            </div>
        </div>

    </div>
</template>

<script>
import { ref } from 'vue'
import {weekDays, weatherIcons} from '@/consts/calendar'
import axios from 'axios'

export default {
    name: "ReminderForm",
    data() {
        return {
            worker: null,
            query: '',
            isLoadingCities: false,
            description: '',
            time: '',
            color: 'bg-info',
            city: '',
            citySearch: "",
            firstSubmit: true,
            weather: {},
            cities: [],
            colorButtons: [
                {color: 'bg-success'},
                {color: 'bg-warning'},
                {color: 'bg-info'},
                {color: 'bg-danger'},
            ],
        }
    },
    props: {
        currentDate: Object,
        selectedDate: Object,
        selectedReminder: Object
    },
    setup () {
        let reminderFormModal = ref('reminderFormModal')
        let autocompleteComponent = ref('autocompleteComponent')

        return {
            reminderFormModal,
            autocompleteComponent
        }
    },
    mounted() {
        this.configModalOutSideClick()

        this.$emitter.on("show-modal", this.showModal.bind(this))
        this.$emitter.on("hide-modal", this.hideModal.bind(this))
    },
    unmounted() {
        this.$emitter.off("show-modal")
        this.$emitter.off("hide-modal")
    },
    methods: {
        fetchCities() {
            this.worker = null

            const query = this.autocompleteComponent.inputValue.toLowerCase() || ''
            if(query && query.length > 2) {
                this.cities = []
                this.isLoadingCities = true
                const fetchCities = () => fetch('http://localhost:8080/city.list.json')
                    .then(response => response.json())
                    .then(data => this.cities = data.filter(city => city.name.toLowerCase().startsWith(query)))
                    .then(() => this.isLoadingCities = false)

                const runWorker = () => {
                    this.worker = this.$worker.create()
                        .postMessage(`Fetching cities!`)
                        .then(console.log)
                        .then(fetchCities.bind(this))
                        .catch(console.error)
                        .then(() => this.isLoadingCities = false)

                    this.worker = null
                }

                this.$_.debounce(runWorker, 150)()
            } else {
                // nothing for now.
                this.isLoadingCities = false
                this.cities = []
                if(!query) {
                    this.city = null
                    this.weather = null
                }
            }
        },
        configModalOutSideClick(){
            var modal = document.getElementById("reminderFormModal");

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = (event) => {
                if (event.target == modal) this.hideModal()
            }
        },
        showModal() {
            if(this.reminderFormModal) this.reminderFormModal.style.display = "block";
        },
        hideModal() {
            this.cleanInputs()
            if(this.reminderFormModal)  this.reminderFormModal.style.display = "none";
        },
        save() {
            this.firstSubmit = false
            const city = this.city || {}

            if (this.time && this.description && city.name) {
                if (!this.selectedReminder) {
                    this.addReminder()
                } else {
                    this.updateReminder()
                }
            }
        },
        addReminder() {
            this.$emit('add-reminder', this.reminderObject())
            this.$emitter.emit('hide-modal')
        },
        removeReminder() {
            this.$emit('remove-reminder', this.reminderObject())
            this.$emitter.emit('hide-modal')
        },
        updateReminder() {
            this.$emit('update-reminder', this.reminderObject())
            this.$emitter.emit('hide-modal')
        },
        close() {
            this.$emitter.emit('hide-modal')
        },
        reminderObject() {
            const selectedReminder = this.selectedReminder || {}

            return {
                dateKey: this.selectedDate.format('YYYY-MM-DD'),
                description: this.description,
                time: this.time,
                index: selectedReminder.index,
                city: this.city,
                color: this.color
            }
        },
        cleanInputs() {
            if(this.autocompleteComponent) this.autocompleteComponent.inputValue = ""

            this.firstSubmit = true
            this.description = ''
            this.time = ''
            this.color = 'bg-info'
            this.weather = {}
            this.city = null
        },
        setReminderSelected(selectedValue = { city: {} }){
            selectedValue.city = selectedValue.city || { city: {} }

            this.description = selectedValue.description
            this.time = selectedValue.time
            this.color = selectedValue.color || 'bg-info'
            this.autocompleteComponent.inputValue = selectedValue.city.name || ""

            if(selectedValue.city.name) this.fetchWeather(selectedValue.city)
        },
        fetchWeather(city){
            this.city = city

            if(city) axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=1c04382da56e8ee5c86103ca068e5785`)
                .then(this.setWeather.bind(this))
        },
        setWeather({data}) {
            // eslint-disable-next-line no-debugger
            debugger
            const convertCelsius = (temperature) => {
                return Math.round(temperature - 273.15)
            }

            const wind = `${(data.wind.speed * 1000)/ 60}km/h`

            const temp = {
                feels_like : convertCelsius(data.main.feels_like),
                humidity: data.main.humidity,
                pressure: data.main.pressure,
                temp_current : convertCelsius(data.main.temp),
                temp_max : convertCelsius(data.main.temp_max),
                temp_min : convertCelsius(data.main.temp_min),
            }

            // need to read more the docs. Sometimes come two. Should it be the possibilities of the day?
            const dataWeather = data.weather[0] || []
            const [,iconCode, dayNightCode] = /(\d+)(\w)/g.exec(dataWeather.icon)
            const iconImage = this.weatherIcons[iconCode][dayNightCode]

            this.weather = {
                description: dataWeather.description,
                iconImage,
                wind,
                temp
            }

            this.city.weather = this.weather
        }
    },
    watch: {
        selectedReminder(selectedValue) {
            selectedValue = selectedValue || {}

            this.setReminderSelected(selectedValue)
        },
    },
    computed: {
        isTimeValid(){
            return !this.time && !this.firstSubmit
        },
        isCityValid(){
            return !this.city && !this.firstSubmit
        },
        isDescriptionValid(){
            return !this.description && !this.firstSubmit
        },
        weatherIcons() {
            return weatherIcons
        },
        actualSelectedDayFormatted() {
            return `${weekDays[this.selectedDate.day()]} ${this.selectedDate.format('DD')} from ${this.selectedDate.format('MMMM')}`
        }
    },
}
</script>

<style scoped>
.giphy-embed{
    position: absolute;
    transform: translate(0px, -15px);
}

/* The Modal (background) */
.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 30%;
    min-width: 560px;
}

.border-light-gray {
    border-color: #ccc;
}

/* The Close Button */
.close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}

.block-color {
    cursor: pointer;
    padding: 10px;
    width: 10px;
    border: 1px solid #eee;
    border-radius: 5px;
}
</style>