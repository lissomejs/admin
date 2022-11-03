const { type, generator, helpers } = require('./scripts/create-component');

module.exports = function (plop) {
    plop.setGenerator(type, generator);

    Object.entries(helpers).forEach( ([key, helper]) => {
        plop.setHelper(key, helper);
    });
};
