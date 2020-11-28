<template>
    <div>
        <h1 class="text-center">Today: {{ currentDate.format('YYYY-MM-DD HH:mm:ss') }} </h1>
        <hr>
        <div class="offset-xl-1 col-xl-10 offset-md-1 col-sm-10">
            <div class="legend mb-2">
                <div class="active-month mr-1"></div>
                Current Date
                <div class="current-month mr-1 ml-1"></div>
                Selected Date
            </div>
            <calendar :currentDate="currentDate"></calendar>
        </div>
    </div>
</template>

<script>
import Calendar from "@/components/calendar/Calendar";

export default {
    name: 'CalendarExercise',
    components: {
        Calendar
    },
    data() {
        return {
            currentDateTime: this.$day(new Date())
        }
    },
    mounted() {
        this.$store.commit('BUILD_CALENDAR', this.currentDateTime)
        this.$store.commit('BUILD_CALENDAR', this.currentDateTime)
        this.$store.commit('BUILD_CALENDAR', this.currentDateTime)
        this.$store.commit('BUILD_CALENDAR', this.currentDateTime)

        setInterval(this.updateCurrentDateTime.bind(this), 60000)
    },
    methods: {
        updateCurrentDateTime() {
            this.currentDateTime = this.$day(new Date())
        }
    },
    computed: {
        test() {
            return Array.from({length: 6}).map((v, index) => this.$day().day(index))
        },
        currentDate() {
            return this.currentDateTime
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.legend {
    display: flex;
}

.active-month {
    background-color: #42b983;
    height: 25px;
    width: 25px;
}

.current-month {
    background-color: #007bff;
    height: 25px;
    width: 25px;
}
</style>
