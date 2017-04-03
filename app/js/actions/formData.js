const UPDATE = 'UPDATE_FORM_DATA';
const LOAD = 'LOAD_FORM_DATA';

function update(key, data) {
    return {
        type: UPDATE, key, data
    };
}

function load(data) {
    return {
        type: LOAD, data
    };
}

module.exports = {
    UPDATE,
    update,
    LOAD,
    load,
};
