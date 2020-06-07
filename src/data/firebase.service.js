const database = require('./firebase.config').database();

module.exports = {
  findInitialMessage: () => database.ref('/initialMessage').once('value')
  .then(snapshot => snapshot.val())
  .catch(console.log),

  findMessages: () => database.ref('/messages').once('value')
    .then(snapshot => snapshot.val())
    .catch(console.log),

  findCronTimes: () => database.ref('/cronTimes').once('value')
    .then(snapshot => snapshot.val())
    .then(Object.values)
    .catch(console.log)
};
