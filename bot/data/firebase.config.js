const admin = require('firebase-admin');

const { project_id, client_email, private_key } = process.env;

module.exports = admin.initializeApp({
    credential: admin.credential.cert({ project_id, client_email, private_key }),
    databaseURL: 'https://vitinhoreal-bot.firebaseio.com'
});
