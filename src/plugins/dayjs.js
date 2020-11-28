export default {
    // eslint-disable-next-line no-unused-vars
    install: (app, dayjs) => {
        app.config.globalProperties.$day = dayjs
    }
}