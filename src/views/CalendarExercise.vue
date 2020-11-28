<template>
    <div>
        <h1 class="text-center">Today: {{ dateNow.format('YYYY-MM-DD') }} </h1>
        <hr>
        <calendar :dateNow="dateNow"></calendar>
    </div>
</template>

<script>
import Calendar from "@/components/Calendar";

export default {
    name: 'CalendarExercise',
    components: {
        Calendar
    },
    computed:{
        dateNow(){
            return this.$day(new Date())
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
