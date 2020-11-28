<template>
    <div>
        <h1 class="text-center">Today: {{ dateNow.format('YYYY-MM-DD HH:mm:ss') }} </h1>
        <hr>
        <div class="offset-xl-1 col-xl-10 offset-md-1 col-sm-10">
            <calendar></calendar>
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
    mounted() {
        setInterval(this.updateCurrentDateTime.bind(this), 1000)
    },
    data() {
        return {
            currentDateTime: this.$day(new Date())
        }
    },
    computed: {
        test() {
            return Array.from({length: 6}).map((v, index) => this.$day().day(index))
        },
        dateNow() {
            return this.currentDateTime
        }
    },
    methods: {
        updateCurrentDateTime() {
            this.currentDateTime = this.$day(new Date())
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
