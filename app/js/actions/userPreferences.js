const UPDATE = 'UPDATE_USER_PREFERENCES';

function update(data) {
    return {
        type: UPDATE, data
    };
}

module.exports = {
    UPDATE,
    update
};
