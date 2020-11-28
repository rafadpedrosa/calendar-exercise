<template>
    <div class="calendar-day" :class="{ 'is-weekend': isWeekend }">
        <div >
            <span class="day-number p-1 text-center" :class="{'is-today': isToday}" >{{ day.date() }}</span>
        </div>
        <div class="reminders">
        </div>
    </div>
</template>

<script>
import { FORMAT } from "@/consts/calendar";

export default {
    name: 'Days',
    props: {
        day: Object,
        type: String
    },
    computed: {
        isWeekend() {
            return this.day.day() === 0 || this.day.day() === 6
        },
        isToday() {
            return this.day.format(FORMAT.DATE) === this.$day(new Date()).format(FORMAT.DATE)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.calendar-day {
    height: 120px;
    width: 100%;
}

.day-number{
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

.is-today {
    background-color: #42b983;
    color: white;
    border: darkgreen;
    font-weight: bold;
}
</style>
