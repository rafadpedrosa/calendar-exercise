import {createStore} from 'vuex'
// import calendarConst from '@/consts/calendar'

export default createStore({
    state: {
        matrixDays: null,
        calendarType: 'month'
    },
    mutations: {
        INIT_CALENDAR(state, dateNow) { // 42
            const calendarMatrixNumber = 42
            const fistDayOfMonth = dateNow.date(1)
            const weekDayIndex = fistDayOfMonth.day()
            const calendarStartDate = fistDayOfMonth.subtract(7 - (weekDayIndex), 'day')

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
        }
    },
    actions: {},
    getters: {
        matrixDays: state => state.matrixDays || [],
        calendarType: state => state.calendarType
    },
    modules: {}
})
