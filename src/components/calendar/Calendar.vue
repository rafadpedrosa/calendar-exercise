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
                         v-on:change-selected-date="changeSelectedDate" :type="calendarType"></day>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {weekDays} from '@/consts/calendar.js'
import {mapGetters} from 'vuex'
import Day from '@/components/calendar/Day'
import Months from '@/components/calendar/Months'

export default {
    name: 'Calendar',
    props: {
        currentDate: Object
    },
    components: {
        Day,
        Months,
    },
    beforeMount() {
        this.changeSelectedYear(this.currentDate)
        this.changeSelectedMonth(this.currentDate)
        this.changeSelectedDate(this.currentDate)
    },
    methods: {
        changeSelectedDate(selectedDate) {
            this.$store.commit("SET_SELECTED_DATE", selectedDate)
        },
        changeSelectedYear(selectedYear) {
            this.$store.commit("SET_SELECTED_YEAR", selectedYear)
        },
        changeSelectedMonth(selectedMonth) {
            this.$store.commit("SET_SELECTED_MONTH", selectedMonth)
        }
    },
    watch: {
        selectedDate(value) {
            this.$store.commit('BUILD_CALENDAR', value)
        },
        selectedMonth(value) {
            this.$store.commit('BUILD_CALENDAR', value)
        },
        selectedYeah(value) {
            this.$store.commit('BUILD_CALENDAR', value)
        }
    },
    computed: {
        ...mapGetters(['matrixDays', 'calendarType', 'selectedYear', 'selectedMonth', 'selectedDate']),
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
