export default {
    // eslint-disable-next-line no-unused-vars
    install: (app, lodash) => {
        app.config.globalProperties.$_ = lodash
    }
}