## Options

The following options apply to the `Logger` class.

| Property      | Value               | Required | Description                                                                                                                                |
| ------------- | ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| console       | Console             | false    | The Console for the logs.                                                                                                                  |
| stdout        | NodeJS.WriteStream  | false    | The WriteStream for the output logs.                                                                                                       |
| stderr        | NodeJS.WriteStream  | false    | A WriteStream for the error logs.                                                                                                          |
| defaultFormat | LoggerLevelOptions  | false    | The default options used to fill all the possible values for Format.                                                                       |
| format        | LoggerFormatOptions | false    | The options for each log level. LogLevel.None serves to set the default for all keys, where only TimeStamp and Prefix would be overridden. |
| level         | LogLevel            | false    | The minimum log level.                                                                                                                     |
| join          | string              | false    | The string that joins different messages.                                                                                                  |
| depth         | number              | false    | The inspect depth when logging objects.                                                                                                    |
