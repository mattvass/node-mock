/** 
 * author: Matthew Vass
 * created: February 18, 2018
*/
const mockRoutes = require('./mock_routes');
module.exports = function (app, db) {
    mockRoutes(app, db);
    // Other route groups could go here, in the future
};