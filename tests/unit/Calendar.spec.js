import {mount} from '@vue/test-utils'
import dayjs from 'dayjs'
import App from '@/components/calendar/Calendar'
import store from '@/store/index'
import { nextTick } from 'vue'
import mitt from 'mitt'

const emitter = mitt()
const factory = (props) => {
    return mount(App, {global: {plugins: [store], mocks:{ $day: dayjs, $emitter: emitter } }, props })
}

let cmp, vm;

const currentDate = dayjs(new Date)

const initReminderTearUp = () => {
    cmp = factory({
        currentDate: currentDate.subtract(1,'day')
    })

    vm = cmp.vm
}

describe('Calendar Component Tests',  () => {

    beforeAll(() => {
        initReminderTearUp()
    });

    it('Should have Selected Date equals to current.vue!', async () => {
        vm.$store.commit('SET_SELECTED_DATE', currentDate)

        await nextTick()

        expect(vm.selectedDate.format('YYYY-DD-MM')).toBe(currentDate.format('YYYY-DD-MM'))
    })

    it('Should have Selected Date less than before', async () => {
        const oldDate = vm.selectedDate
        vm.$store.commit('SET_SELECTED_DATE', vm.selectedDate.subtract(1,'month'))

        await nextTick()

        expect(vm.selectedDate.format('YYYY')).toBe(oldDate.format('YYYY'))
        expect(vm.selectedDate.month()).toBeLessThan(oldDate.month())
    })
})