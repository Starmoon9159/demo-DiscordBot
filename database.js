const Datastore = require('nedb')
db = {}
db.users = new Datastore(`path/to/users.db`);
db.users.loadDatabase(
    console.log('成功加載[users.db]')
);





module.exports = function userdb_insert(user_name, user_id) {
    var doc = {
        username: user_name,
        userid: user_id,
        money: 100
    }
    db.users.insert(doc, function (err, newDoc) { });
};