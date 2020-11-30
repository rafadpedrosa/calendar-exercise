export default {
    // eslint-disable-next-line no-unused-vars
    install: (app, emitter) => {
        app.config.globalProperties.$emitter = emitter
    }
}