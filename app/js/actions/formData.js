const UPDATE = 'UPDATE';

function update(key, data) {
    console.log(key, data);
    return {
        type: UPDATE, key, data
    };
}

module.exports = {
    UPDATE,
    update
};
