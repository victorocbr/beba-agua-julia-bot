const CronJob = require('cron').CronJob;
const moment = require('moment');
const { findMessages, findCronTimes } = require('../data/firebase.service');

module.exports = async (sender) => {
    const [messages, cronTimes] = await Promise.all([
        findMessages(),
        findCronTimes()
    ]);

    cronTimes.forEach(cronTime => new CronJob({
        cronTime,
        onTick: () => sender(messages[moment().format('HH:mm')] || messages['error']),
        onComplete: null,
        start: true,
        timeZone: 'America/Sao_Paulo'
    }).start());
};