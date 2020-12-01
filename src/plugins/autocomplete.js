import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'

export default {
    // eslint-disable-next-line no-unused-vars
    install: (app, emitter) => {
        app.component('autocomplete', VueBootstrapTypeahead)
    }
}