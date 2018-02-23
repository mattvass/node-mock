/** 
 * author: Matthew Vass
 * created: February 18, 2018
*/
const sqlite3 = require('sqlite3').verbose();
let response = {
    message: "replace message",
}

/**
 * Get the mocked response from the database for the given route and method
 * 
 * @param {*} route 
 * @param {*} res 
 */
module.exports.getMock = function (route, res) {
    let db = getDb(res);
    let sql = 'select response from mocks left join routes r on r.id = routeId where route = ?';

    db.get(sql, [route], (err, row) => {
        if (err) {
            res.statusCode = 500;
            return res.send({
                message: err.message,
            });
        }
        return row
            ? res.send(JSON.parse(row.response))
            : res.send({
                message: `No mock found for this route ${route}`
            });
    }).close((err) => {
        if (err) {
            res.statusCode = 500;
            return res.send({
                message: err.message,
            });
        }
        console.log('Closed nodemock database connection.');
    });
}

/**
 * Inserts a new mock into the database
 * 
 * @param {*} mock 
 * @param {*} res 
 */
module.exports.insertMock = function (mock, res) {
    let db = getDb(res);

    db.serialize(function () {
        db.run('INSERT INTO routes (\'route\') VALUES (?)', [mock.route], function (err) {
            if (err) {
                res.statusCode = 500;
                return res.send({
                    message: err.message,
                });
            }
            db.run('INSERT INTO mocks (\'routeId\', \'method\', \'response\') VALUES (?, ?, ?)',
                [this.lastID, mock.method, JSON.stringify(mock.response)], function (err) {
                    if (err) {
                        res.statusCode = 500;
                        return res.send({
                            message: err.message,
                        });
                    }
                    res.send({
                        message: "Mock created"
                    });
                }).close((err) => {
                    if (err) {
                        res.statusCode = 500;
                        return res.send({
                            message: err.message,
                        });
                    }
                    console.log('Closed nodemock database connection.');
                });
        });
    });
}

/**
 * Updates existing mocks
 * @param {*} mock 
 * @param {*} res 
 */
module.exports.updateMock = function (mock, res) {
    let db = getDb(res);

    db.serialize(function () {
        db.get('SELECT id FROM routes WHERE route = ?', [mock.route], (err, row) => {
            if (err) {
                res.statusCode = 500;
                return res.send({
                    message: err.message,
                });
            }

            db.run('UPDATE mocks set method = ?, response = ? WHERE routeId = ?',
                [mock.method, JSON.stringify(mock.response), row.id], function (err) {
                    if (err) {
                        res.statusCode = 500;
                        return res.send({
                            message: err.message,
                        });
                    }

                    return res.send({
                        message: "Mock updated",
                    });
                }).close((err) => {
                    if (err) {
                        res.statusCode = 500;
                        return res.send({
                            message: err.message,
                        });
                    }
                    console.log('Closed nodemock database connection.');
                });
        });
    });

}

/**
 * Gets database connection
 * @param {*} res 
 */
function getDb(res) {
    return new sqlite3.Database('./src/db/node-mock.sqlite', (err) => {
        if (err) {
            res.statusCode = 500;
            return res.send({
                message: err.message
            });
        }
        console.log('Connected to the nodemock database.');
    });
}
