<template>
    <div class="calendar-day" :class="{ 'is-weekend': isWeekend, 'is-different-month': isDifferentMonth }"  @click="changeSelectedDay">
        <div>
            <span class="day-number p-1 text-center"
                  :class="{'is-today': isToday, 'is-selected': isSelected }">{{ day.date() }}</span>
        </div>
        <div class="reminders">
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
        day: Object,
        type: String,
    },
    methods: {
        changeSelectedDay() {
            this.$emit('change-selected-date', this.day)
        }
    },
    computed: {
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
    cursor: pointer;
    height: 120px;
    width: 100%;
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
</style>
