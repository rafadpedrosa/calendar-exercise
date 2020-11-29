import {createStore} from 'vuex'
// import calendarConst from '@/consts/calendar'

export default createStore({
    state: {
        matrixDays: null,
        calendarType: 'Month',
        selectedMonth: null,
        selectedDate: null,
        selectedReminder: null,
        reminders: {},
    },
    mutations: {
        SET_SELECTED_REMINDER(state, selectedReminder) {
            console.log(selectedReminder)
            state.selectedReminder = selectedReminder
        },
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
        ADD_REMINDER(state, newReminder) {
            const daysReminders = state.reminders[newReminder.dateKey] || []

            newReminder.index = daysReminders.length
            daysReminders.push(newReminder)
            state.reminders[newReminder.dateKey] = daysReminders
        },
        UPDATE_REMINDER(state, reminderToUpdate) {
            state.reminders[reminderToUpdate.dateKey][reminderToUpdate.index] = reminderToUpdate
        },
        REMOVE_REMINDER(state, removeToReminder) {
            state.reminders[removeToReminder.dateKey].splice(removeToReminder.index,1)
        }
    },
    actions: {
        addReminder({getters, commit}, reminderObject) {
            commit('ADD_REMINDER', reminderObject)
            commit('BUILD_CALENDAR', getters.selectedDate)
        },
        removeReminder({getters, commit}, reminderObject) {
            commit('REMOVE_REMINDER', reminderObject)
            commit('SET_SELECTED_REMINDER', null)
            commit('BUILD_CALENDAR', getters.selectedDate)
        },
        updateReminder({getters, commit}, reminderObject) {
            commit('UPDATE_REMINDER', reminderObject)
            commit('BUILD_CALENDAR', getters.selectedDate)
        }
    },
    getters: {
        calendarType: state => state.calendarType,
        matrixDays: state => state.matrixDays || [],

        reminders: state => state.reminders,
        selectedReminder: state => state.selectedReminder,
        selectedYear: state => state.selectedYear,
        selectedMonth: state => state.selectedMonth,
        selectedDate: state => state.selectedDate,
    },
    modules: {}
})
