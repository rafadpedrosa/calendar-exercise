export default {
    // eslint-disable-next-line no-unused-vars
    install: (app, VueWorker) => {
        app.config.globalProperties.$worker = VueWorker
    }
}