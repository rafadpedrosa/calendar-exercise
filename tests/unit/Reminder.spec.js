import { mount  } from '@vue/test-utils'
import dayjs from 'dayjs'
import App from '@/components/calendar/ReminderForm'
import store from '@/store/index'
import {nextTick} from 'vue'

import mitt from 'mitt'

const emitter = mitt()
const factory = (props) => {
    return mount(App, { global: {plugins: [store], mocks:{ $emitter: emitter } }, props})
}

const currentDate = dayjs(new Date)

let cmp, vm;
let saveSpy;
let addReminderSpy;
let updateReminderSpy;

const initReminderTearUp = (reminder) => {
    saveSpy = jest.spyOn(App.methods, 'save')
    addReminderSpy = jest.spyOn(App.methods, 'addReminder')
    updateReminderSpy = jest.spyOn(App.methods, 'updateReminder')

    cmp = factory({
        currentDate: currentDate,
        selectedDate: currentDate,
        selectedReminder: reminder,
    })

    vm = cmp.vm
}

describe('New Reminder Tests ', () => {
    beforeAll(() => {
        initReminderTearUp(null)
    });

    it('Should Create A New Reminder', async () => {
        vm.time = '13:00'
        vm.description = 'Rafael Pedrosa'
        vm.city = {"id":3390760,"name":"Recife","state":"","country":"BR","coord":{"lon":-34.881111,"lat":-8.05389}}

        await nextTick()
        await cmp.find('#save-button').trigger('click')

        expect(vm.color).not.toBeNull()
        expect(saveSpy).toBeCalled()
        expect(addReminderSpy).toBeCalled()
        expect(updateReminderSpy).not.toBeCalled()
    })
})

describe("Validate Reminder",  () => {
    beforeAll(() => {
        initReminderTearUp()
    });

    it('Should Validate Reminder blocking creation', async () => {
        vm.time = ''
        vm.description = 'R'

        await nextTick()

        await cmp.find('#save-button').trigger('click')

        expect(saveSpy).toBeCalled()
        expect(addReminderSpy).toBeCalled()
        expect(cmp.emitted('add-reminder')).toBeFalsy()
    })

    it('Should Validate Reminder and Allow creation', async () => {
        vm.time = '13:00'
        vm.description = 'Rafael'
        vm.city = {"id":3390760,"name":"Recife","state":"","country":"BR","coord":{"lon":-34.881111,"lat":-8.05389}}

        await cmp.find('#save-button').trigger('click')

        await nextTick()

        expect(saveSpy).toBeCalled()
        expect(addReminderSpy).toBeCalled()
        expect(cmp.emitted('add-reminder')).toBeTruthy()
    })
})

