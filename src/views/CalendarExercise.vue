<template>
    <calendar></calendar>
</template>

<script>
import Calendar from "@/components/Calendar";

export default {
    name: 'Calendar',
    components:{
        Calendar
    },
    props: {
        msg: String
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
