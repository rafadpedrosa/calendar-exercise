<template>
    <div ref="reminderFormModal" id="reminderFormModal" class="modal">

        <!-- Modal content -->
        <div class="modal-content">
            <p><span ref="closeModal" id="closeModal" class="close">&times;</span></p>
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
                </form>

                <div class="">
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
import {weekDays} from '@/consts/calendar'

export default {
    name: "ReminderForm",
    data() {
        return {
            description: '',
            time: '',
            color: 'bg-info',
            colorButtons: [
                {color: 'bg-success'},
                {color: 'bg-warning'},
                {color: 'bg-info'},
                {color: 'bg-danger'},
            ]
        }
    },
    props: {
        currentDate: Object,
        selectedDate: Object,
        selectedReminder: Object
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
                    modal.style.display = "none";
                }
            }
        },
        showModal() {
            this.$refs.reminderFormModal.style.display = "block";
        },
        hideModal() {
            this.cleanInputs()
            this.$refs.reminderFormModal.style.display = "none";
        },
        save() {
            if (!this.selectedReminder) {
                this.addReminder()
            } else {
                this.updateReminder()
            }
        },
        addReminder() {
            if (this.time && this.description && this.description.length > 5) {
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
            this.description = ''
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
            this.description = ''
            this.time = ''
            this.color = 'bg-info'
        },
        setReminderSelected(selectedValue){
            this.description = selectedValue.description
            this.time = selectedValue.time
            this.color = selectedValue.color || 'bg-info'
        }
    },
    watch: {
        selectedReminder(selectedValue) {
            selectedValue = selectedValue || {}

            this.setReminderSelected(selectedValue)
        },
    },
    computed: {
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