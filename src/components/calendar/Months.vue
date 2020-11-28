<template>
    <div class="calendar-month flex-row justify-content-center">
        <nav class="pagination-nav">
            <ul class="pagination">
                <li class="page-item"><span class="button-back page-link"
                                            @click="changeMoth(selectedMonth.month() -1)"
                                            v-html="'<'"></span>
                </li>

                <li class="page-item" :class="{ 'active': isActive(month.index)}" v-for="month in months"
                    :key="month.index"><span @click="changeMoth(month.index)"
                                             :class="{ 'is-actual-month': isActualMonth(month.index)}"
                                             class="page-link button-month">{{ month.name }}</span>
                </li>

                <li class="page-item"><span class="button-next page-link"
                                            @click="changeMoth(selectedMonth.month() + 1)"
                                            v-html="'>'"></span></li>
            </ul>
        </nav>
    </div>
</template>

<script>
import {months} from '@/consts/calendar'

export default {
    name: 'Months',
    props: {
        currentDate: Object,
        selectedMonth: Object,
        calendarType: String
    },
    computed: {
        getSelectedMonth() {
            return this.selectedMonth
        },
        months() {
            const toMonthObject = (monthName, index) => {
                return {name: monthName, index}
            }
            return months.map(toMonthObject)
        },
    },
    methods: {
        changeMoth(index) {
            this.$emit('change-month', this.getSelectedMonth.month(index))
        },
        changeYear(index) {
            this.$emit('change-year', this.getSelectedMonth.month(index))
        },
        isActive(monthIndex) {
            return monthIndex === this.getSelectedMonth.month()
        },
        isActualMonth(monthIndex) {
            return monthIndex === this.currentDate.month()
        }
    }

}
</script>

<style scoped>
.is-actual-month {
    background-color: #42b983;
    color: white;
}
</style>
