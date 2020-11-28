<template>
    <div class="calendar">
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
                    <day :day="day" :type="calendarType"></day>
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

export default {
    name: 'Calendar',
    components:{
        Day
    },
    mounted() {
        this.$store.commit('INIT_CALENDAR', this.$day(new Date()))
    },
    computed: {
        ...mapGetters(['matrixDays','calendarType']),
        weekDays() {
            return weekDays;
        },
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
