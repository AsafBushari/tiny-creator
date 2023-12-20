const tinyUrlController = require('../controllers/tinyUrl');

module.exports = (app) => {
    
    app.post('/get-full-to-tiny', tinyUrlController.getFullToTiny);
    app.post('/get-tiny-to-full', tinyUrlController.getTinyToFull);

}