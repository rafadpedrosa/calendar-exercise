<template>
    <div class="calendar-day" :class="{ 'is-weekend': isWeekend, 'is-different-month': isDifferentMonth }"
         @click="changeSelectedDay">
        <div>
            <span class="day-number p-1 text-center"
                  :class="{'is-today': isToday, 'is-selected': isSelected }">{{ day.date() }}</span>
        </div>
        <div class="reminders col-12">
            <div @click.stop.prevent="selectReminder(reminder)" class="reminder px-2"
                 v-for="reminder in sortedRemindersByTime"
                 :class="[reminder.color]"
                 :key="reminder.index">
                <div class="reminder-text" >{{ reminder.description }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import {FORMAT} from "@/consts/calendar";

export default {
    name: 'Days',
    props: {
        selectedMonth: Object,
        selectedDate: Object,
        currentDate: Object,
        reminders: Array,
        day: Object,
        type: String,
    },
    methods: {
        selectReminder(reminder) {
            console.error(":::", reminder)
            this.$emit('select-reminder', {dateKey: this.selectedDate.format('YYYY-MM-DD'), ...reminder})
            // eslint-disable-next-line no-undef
            $('#reminderFormModal').modal('show')
        },
        changeSelectedDay() {
            if (!this.isDifferentMonth) {
                // eslint-disable-next-line no-undef
                $('#reminderFormModal').modal('show')
            }
            this.$emit('change-selected-date', this.day)
        }
    },
    computed: {
        sortedRemindersByTime() {
            const byTime = (a,b) => a.time > b.time ? 1 : a.time < b.time ? -1 : 0

            return [...this.reminders].sort(byTime)
        },
        isDifferentMonth() {
            const selectedDate = this.selectedMonth || this.selectedDate || this.currentDate
            return selectedDate.month() !== this.day.month()
        },
        isWeekend() {
            // return this.day.day() === 0 || this.day.day() === 6 // it's ugly with that
            return false
        },
        isToday() {
            return this.day.format(FORMAT.DATE) === this.$day(new Date()).format(FORMAT.DATE)
        },
        isSelected() {
            return this.selectedDate ? this.day.format("YYYY-MM-DD") === this.selectedDate.format("YYYY-MM-DD") : false
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.calendar-day {
    overflow-y: auto;
    cursor: pointer;
    height: 120px;
    width: 100%;
    padding-bottom: 15px;
}

.day-number {
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 1%;
    width: 25px;
    font-size: 12px;
    z-index: 1;

}

.is-weekend {
    background-color: #eee;
}

.is-different-month {
    background-color: #eee;
}

.is-selected {
    background-color: #007bff;
    color: white;
    border: darkgreen;
    font-weight: bold;
}

.is-today {
    background-color: #42b983;
    color: white;
    border: darkgreen;
    font-weight: bold;
}

.reminders {
    padding-top: 30px;
}

.reminder {
    border: 1px solid #ccc;
    border-radius: 3px;
    color: white;
}

.reminder.bg-warning {
    color: black;
}

.reminder:hover {
    color: white;
    background-color: #007bff;
}

.reminder-text {
    white-space: nowrap;
    overflow: hidden;
    width: 100px;
    text-overflow: ellipsis;
}
</style>
