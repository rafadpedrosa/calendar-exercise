import {createStore} from 'vuex'
// import calendarConst from '@/consts/calendar'

export default createStore({
    state: {
        matrixDays: null,
        calendarType: 'Month',
        selectedMonth: null,
        selectedDate: null
    },
    mutations: {
        SET_SELECTED_YEAR(state, selectedYear) {
            state.selectedYear = selectedYear
        },
        SET_SELECTED_DATE(state, selectedDate) {
            state.selectedDate = selectedDate
            state.selectedMonth = selectedDate
            state.selectedYear = selectedDate
        },
        SET_SELECTED_MONTH(state, selectedMonth) {
            state.selectedMonth = selectedMonth
            state.selectedYear = selectedMonth
        },
        BUILD_CALENDAR(state, currentDate) {
            const calendarMatrixNumber = 42
            const fistDayOfMonth = currentDate.date(1).subtract(1, 'day')
            // const weekDayIndex = fistDayOfMonth.day()

            let calendarStartDate = fistDayOfMonth.startOf('week')

            let matrixVerticalIndex = -1

            state.matrixDays = Array.from({length: calendarMatrixNumber})
                .map((v, index) => index)
                .reduce((matrixDays, index) => {
                    if (index % 7 === 0) {
                        matrixDays[++matrixVerticalIndex] = []
                    }

                    matrixDays[matrixVerticalIndex].push(calendarStartDate.add(index, 'day'))

                    return matrixDays
                }, [])
        },
    },
    actions: {},
    getters: {
        calendarType: state => state.calendarType,
        matrixDays: state => state.matrixDays || [],

        selectedYear: state => state.selectedYear,
        selectedMonth: state => state.selectedMonth,
        selectedDate: state => state.selectedDate
    },
    modules: {}
})
