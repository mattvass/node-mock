/** 
 * author: Matthew Vass
 * created: February 18, 2018
*/
const mock = require('../db/nodedb');

module.exports = function (app, db) {
    
    app.all('/mock/*', (req, res) => {
        mock.getMock(req.params[0], res);
    });

    app.post('/api', (req, res) => {
        mock.insertMock(req.body, res);
    });

    app.put('/api', (req, res) => {
        mock.updateMock(req.body, res);
    });
};