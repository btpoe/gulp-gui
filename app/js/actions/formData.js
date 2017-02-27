const UPDATE = 'UPDATE_FORM_DATA';

function update(key, data) {
    return {
        type: UPDATE, key, data
    };
}

module.exports = {
    UPDATE,
    update
};
