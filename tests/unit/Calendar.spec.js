import {mount} from '@vue/test-utils'
import dayjs from 'dayjs'
import App from '@/../tests/unit/components/CalendarTestingPropouses'
import store from '@/store/index'
import { nextTick } from 'vue'

const factory = (props) => {
    return mount(App, {global: {plugins: [store]}, props})
}

describe('Calendar Component Tests',  () => {

    const currentDate = dayjs(new Date)
    let wrapper;

    beforeAll(() => {
        wrapper = factory({
            currentDate: currentDate.subtract(1,'day')
        })
    });

    it('Should have Selected Date equals to current.vue!', async () => {
        wrapper.vm.$store.commit('SET_SELECTED_DATE', currentDate)

        await nextTick()

        expect(wrapper.vm.selectedDate.format('YYYY-DD-MM')).toBe(currentDate.format('YYYY-DD-MM'))
    })

    it('Should have Selected Date less than before!', async () => {
        const oldDate = wrapper.vm.selectedDate
        wrapper.vm.$store.commit('SET_SELECTED_DATE', wrapper.vm.selectedDate.subtract(1,'month'))

        await nextTick()

        expect(wrapper.vm.selectedDate.format('YYYY')).toBe(oldDate.format('YYYY'))
        expect(wrapper.vm.selectedDate.month()).toBeLessThan(oldDate.month())
    })

    it('Should have Selected Date less than before!', async () => {
        const oldDate = wrapper.vm.selectedDate
        wrapper.vm.$store.commit('SET_SELECTED_DATE', wrapper.vm.selectedDate.subtract(1,'month'))

        await nextTick()

        expect(wrapper.vm.selectedDate.format('YYYY')).toBe(oldDate.format('YYYY'))
        expect(wrapper.vm.selectedDate.month()).toBeLessThan(oldDate.month())
    })
})


describe('Calendar Component Tests',  () => {

    const currentDate = dayjs(new Date)
    let wrapper;

    beforeAll(() => {
        wrapper = factory({
            currentDate: currentDate.subtract(1,'day')
        })
    });

    it('Should Create A Reminder!', async () => {
        const oldDate = wrapper.vm.selectedDate
        wrapper.vm.$store.commit('SET_SELECTED_DATE', wrapper.vm.selectedDate.subtract(1,'month'))

        await nextTick()

        expect(wrapper.vm.selectedDate.format('YYYY')).toBe(oldDate.format('YYYY'))
        expect(wrapper.vm.selectedDate.month()).toBeLessThan(oldDate.month())
    })
})