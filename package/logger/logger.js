require('dotenv');

const moment = require('moment');
const winston = require('winston');
require('winston-daily-rotate-file');

const logFilename       = `./logs/${process.env.FILE_APP_LOG || 'app.log'}`;
const simplifyInfoLevel = (t) => { return /^.*[dD][eE][bB][uU][gG].*$/.test(t) ? "DEBUG" : /^.*[iI][nN][fF][oO].*$/.test(t) ? "INFO" : /^.*[eE][rR][rR][oO][rR].*$/.test(t) ? "ERROR" : /^.*[wW][aA][rR][nN].*$/.test(t) ? "WARN" : "_LOG_" };

const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(info =>
    `${moment(info.timestamp).format(process.env.DATE_FORMAT || 'YYYY-MM-DD HH:mm:ss')} | ${simplifyInfoLevel(info.level)}  \t=> ${info.message}`
  )
);

const transport = new winston.transports.DailyRotateFile({
  filename: logFilename,
  format: logFormat,
  datePattern: process.env.LOG_FILE_RTDF || 'YYYYMMDD',
  maxSize: `${parseInt(process.env.LOG_MAX_FSIZE || 2)}mb`,
  maxFiles: `${parseInt(process.env.LOG_LIFE_DAYS || 30)}d`,
});

transport.on('rotate', function(oldFilename, newFilename) {
  console.log(`Rotating-File: ${oldFilename} -> ${newFilename}`);
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  format: logFormat,
  defaultMeta: { service: 'user-service' },
  transports: [
    transport,
  ],
});

if ((process.env.ENVIRONMENT || 'development') !== 'production') {
  logger.add(new winston.transports.Console({
    format: logFormat,
  }));
}

module.exports = logger;