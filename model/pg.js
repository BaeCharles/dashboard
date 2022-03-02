const confing = require('@config/config');
const { Pool } = require('pg');
const pgPool = new Pool(confing.pg);

pgPool.on('error', (err) => {
    logger.error('[pgPool] idle client error');
    logger.error(err.stack || err.message || err);
});

function _query(sql, params = []) {
    return new Promise((resolve, reject) => {
        pgPool.connect((err, client, release) => {
            logger.debug('sql : ' + sql);
            logger.debug('sql params : ' + JSON.stringify(params)?.substring(0, 1000));
            const startTime = new Date().getTime();

            if (err) {
                logger.error('Error acquiring client : ' + err.stack);
                reject(err);
                return;
            }

            try {
                client.query(sql, params, (err, result) => {
                    logger.debug('sql time : ' + (new Date().getTime() - startTime));
                    release();
                    if (err) {
                        logger.error('Error executing query : ' + err.stack);
                        reject(err);
                        return;
                    }
                    resolve(result);
                })
            } catch (err) {
                logger.error('pg query error message: ', err);
                logger.error('pg query error queryText: ' + sql);
                logger.error('pg query error params: ', params);
                release();
                reject(err);
            }
        })
    })
}

module.exports = {
    selectUserById: function (userId) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM "user" WHERE id = $1';

            _query(sql, [userId]).then(resolve).catch(reject);
        });
    }
}
