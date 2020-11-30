import {mount} from '@vue/test-utils'
import jest from 'jest'
import dayjs from 'dayjs'
import App from '@/../tests/unit/components/ReminderFormTestingPropouses'
import store from '@/store/index'
import {nextTick} from 'vue'

const factory = (props) => {
    return mount(App, {global: {plugins: [store]}, props})
}

describe('Reminder Component Tests', () => {
    const currentDate = dayjs(new Date)
    let wrapper;

    beforeAll(() => {
        wrapper = factory({
            currentDate: currentDate,
            selectedDate: currentDate,
            selectedReminder: currentDate
        })
    });

    it('Should Create A Reminder!', async () => {
        wrapper.vm.time = '13:00'
        wrapper.vm.description = 'Rafael Pedrosa'

        const saveSpy = jest.spyOn(wrapper.vm, 'save')
        const addReminderSpy = jest.spyOn(wrapper.vm, 'addReminder')

        await wrapper.find('#save-button').trigger('click')

        await nextTick()

        expect(wrapper.vm.color).not.toBeNull()
        expect(saveSpy).toBeCalled()
        expect(addReminderSpy).toBeCalled()
    })
})