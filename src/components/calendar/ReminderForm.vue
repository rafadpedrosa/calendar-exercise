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
                        <label for="reminderDate">Description</label>
                        <input type="time" v-model="time" class="form-control" id="reminderDate"
                               aria-describedby="reminderHelp" placeholder="Enter Reminder Description" required>
                        <small id="reminderDateHelp" class="form-text text-muted">Description should be less than 30
                            chars.</small>
                    </div>
                    <div class="form-group">
                        <label for="reminderDescription">Description</label>
                        <input required maxlength="30" @keydown.enter="save" type="text" v-model="description"
                               class="form-control" id="reminderDescription" aria-describedby="reminderHelp"
                               placeholder="Enter Reminder Description">
                        <small id="reminderDescriptionHelp" class="form-text text-muted">Description should be less than
                            30 chars.</small>
                    </div>
                    <div class="form-group">
                        <label for="reminderDescription">City</label>
                        <autocomplete
                            ref="autocomplete"
                            @hit="city = $event"
                            :serializer="s => s.name"
                            placeholder="Type an City"
                            :data="cities"
                            auto-select
                        ></autocomplete>
                    </div>

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
                        @click="removeReminder">Remove Reminder
                </button>
                <button id="save-button" type="submit" class="btn btn-primary" form="reminderForm" @click="save">
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
import citiesJson from '@/consts/city.list.json'
import '@trevoreyre/autocomplete-vue/dist/style.css'
import axios from 'axios'

export default {
    name: "ReminderForm",
    data() {
        return {
            description: '',
            time: '',
            color: 'bg-info',
            city: null,
            weather: {},
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
        let autocomplete = ref('autocomplete')

        return {
            reminderFormModal,
            autocomplete
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
        configModalOutSideClick(){
            var modal = document.getElementById("reminderFormModal");

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target == modal) {
                    this.hideModal()
                }
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
            if (!this.selectedReminder) {
                this.addReminder()
            } else {
                this.updateReminder()
            }
        },
        addReminder() {
            const city = this.city || {}

            if (this.time && this.description && this.description.length > 5 && city.description) {
                this.$emit('add-reminder', this.reminderObject())
                this.$emitter.emit('hide-modal')
            }
        },
        removeReminder() {
            this.$emit('remove-reminder', this.reminderObject())
            this.cleanInputs()
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
                color: this.color
            }
        },
        cleanInputs() {
            if(this.autocomplete) this.autocomplete.inputValue = ""

            this.description = ''
            this.time = ''
            this.color = 'bg-info'
            this.weather = {}
            this.city = null
        },
        setReminderSelected(selectedValue){
            this.description = selectedValue.description
            this.time = selectedValue.time
            this.color = selectedValue.color || 'bg-info'
        },
        setWeather({data}) {
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
        }
    },
    watch: {
        city(city){
            if(city) axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=1c04382da56e8ee5c86103ca068e5785`)
                .then(this.setWeather.bind(this))
        },
        selectedReminder(selectedValue) {
            selectedValue = selectedValue || {}

            this.setReminderSelected(selectedValue)
        },
    },
    computed: {
        weatherIcons(){
            return weatherIcons
        },
        cities() {
            return citiesJson
        },
        actualSelectedDayFormatted() {
            return `${weekDays[this.selectedDate.day()]} ${this.selectedDate.format('DD')} from ${this.selectedDate.format('MMMM')}`
        }
    },
}
</script>

<style scoped>

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