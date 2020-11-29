<template>
    <div class="calendar">
        <h3 class="py-3" >Day Selected: {{ selectedDateFormatted }} </h3>

        <h3>{{ selectedMonth.format("MMMM") }} {{ selectedYear.format("YYYY") }}</h3>

        <months
            v-on:change-month="changeSelectedMonth"
            v-on:change-year="changeSelectedYear"
            :selectedMonth="selectedMonth || currentDate" :current-date="currentDate"
            :calendarType="calendarType">
        </months>

        <table class="table border table-bordered" v-if="matrixDays">
            <thead>
            <tr>
                <th class="text-center calendar-header" v-for="weekDay in weekDays" :key="weekDay">
                    {{ weekDay }}
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(week, index) in matrixDays" :key="index">
                <td v-for="day in week" :key="day.format('MM-DD')" class="p-0">
                    <day :day="day"
                         :current-date="currentDate"
                         :selected-date="selectedDate"
                         :selected-month="selectedMonth"
                         :reminders="dayReminders(day)"
                         :type="calendarType"
                         v-on:change-selected-date="changeSelectedDate"
                         v-on:select-reminder="selectReminder"
                    ></day>
                </td>
            </tr>
            </tbody>
        </table>

        <reminder-form
            :current-date="currentDate"
            :selected-date="selectedDate"
            :selected-reminder="selectedReminder"
            v-on:add-reminder="addReminder"
            v-on:remove-reminder="removeReminder"
            v-on:update-reminder="updateReminder"
        ></reminder-form>
    </div>
</template>

<script>
import {weekDays} from '@/consts/calendar.js'
import {mapGetters, mapActions} from 'vuex'
import Day from '@/components/calendar/Day'
import Months from '@/components/calendar/Months'
import ReminderForm from '@/components/calendar/ReminderForm'

export default {
    name: 'Calendar',
    props: {
        currentDate: Object
    },
    components: {
        Day,
        Months,
        ReminderForm,
    },
    beforeMount() {
        this.changeSelectedYear(this.currentDate)
        this.changeSelectedMonth(this.currentDate)
        this.changeSelectedDate(this.currentDate)
    },
    methods: {
        ...mapActions(['addReminder', 'removeReminder', 'updateReminder']),
        selectReminder(reminderObject) {
            this.$store.commit("SET_SELECTED_REMINDER", reminderObject)
        },
        dayReminders(day) {
            return this.reminders[day.format('YYYY-MM-DD')] || []
        },
        changeSelectedDate(selectedDate) {
            this.$store.commit("SET_SELECTED_REMINDER", null)
            this.$store.commit("SET_SELECTED_DATE", selectedDate)
        },
        changeSelectedYear(selectedYear) {
            this.$store.commit("SET_SELECTED_YEAR", selectedYear)
        },
        changeSelectedMonth(selectedMonth) {
            this.$store.commit("SET_SELECTED_MONTH", selectedMonth)
        },
        updateCalendar(date){
            this.$store.commit('BUILD_CALENDAR', date)
        }
    },
    watch: {
        selectedDate(date) {
            this.updateCalendar(date)
        },
        selectedMonth(date) {
            this.updateCalendar(date)
        },
        selectedYeah(date) {
            this.updateCalendar(date)
        }
    },
    computed: {
        ...mapGetters(['matrixDays', 'calendarType', 'selectedYear', 'selectedMonth', 'selectedDate', 'selectedReminder', 'reminders',]),
        weekDays() {
            return weekDays;
        },
        selectedDateFormatted(){
            return this.selectedDate ? this.selectedDate.format('DD') : "Not selected Yet"
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.calendar {
    border: 0 solid black;
}

.calendar-header {
    width: 14.2%;
}
</style>
