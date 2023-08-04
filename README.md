# Easy Logger

Wrapper for your logger to do the heavy lifting, so that all you do is write logs just like a simple print-line.

## Installation

You can install the Logger package from npm using the following command:

```shell
npm install easy-logger-2
```

## Usage

Out of box, the package provides winston logger, with a flavouring on top.
You will need to ensure some env properties to be set for this to work exactly as you need.
It will still work when you don't set the env properties right, but with default values.

## Defaults

### ENV Properties
```shell
#####
##### LOG_LEVEL can be changed as per environment, like error,debug,info etc.
#####

## LOGGER PROPS { error -> info -> debug } --rtdf = file rotation date format --maxfilesize in mb
LOG_LEVEL     = debug
LOG_LIFE_DAYS = 15
LOG_MAX_FSIZE = 5
LOG_FILE_RTDF = YYYYMMDD
DATE_FORMAT   = YYYY-MM-DD HH:mm:ss
FILE_API_LOG  = helloworld-api.log
FILE_APP_LOG  = helloworld-app.log
```

## Example

### Logs
```shell
const logger = require('easy-logger-2');

logger.warn(`Warning Message`);
logger.error('Error Message`);
logger.debug(`Debug Message`);
logger.info(`Info Message`);
```

### Note
This package will help you streamline API logs across your application.