module.exports = {
    renderLogin,
    getUserData
}

const pg = require('@model/pg');

function renderLogin(req, res) {
    res.render('auth/login', { title: '로그인'});
}

function getUserData(req, res) {
    const userId = req.body.userId;
    doLogin(userId)
        .then((result) => {
            console.log(result);
        })
}

function doLogin(userId) {
    return new Promise((resolve, reject) => {
        pg.selectUserById(userId)
        .then((result) => {
            console.log(result);
            resolve(result);
        })
        .catch((err) => {
            console.log(err);
            reject(err);
        })
    })
}