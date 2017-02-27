const INCREMENT_COUNTER = module.exports.INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMENT_COUNTER = module.exports.DECREMENT_COUNTER = 'DECREMENT_COUNTER';

module.exports.increment = function increment() {
    return {
        type: INCREMENT_COUNTER
    };
};

module.exports.decrement = function decrement() {
    return {
        type: DECREMENT_COUNTER
    };
};
