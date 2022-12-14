<div align="center">
    <img src="https://raw.githubusercontent.com/snowcrystals/.github/main/logo.png" width="100px" />
    <h1>@snowcrystals/icicle</h1>
  
  <p>The bridge between code and terminal to print beautiful messages 🎨</p>
  
  <p align="center">
    <img alt="Version" src="https://img.shields.io/badge/version-1.0.1-blue.svg" />
    <a href="/LICENSE" target="_blank">
      <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
    </a>
  </p>

  <a href="https://ijskoud.dev/discord" target="_blank">
    <img src="https://ijskoud.dev/discord/banner" />
  </a>
</div>

---

## Information

@snowcrystals/icicle is a logger package which you can use to print beautiful messages in the console. Apart from serving as a logger is also has a couple customisable settings, to learn more about that [click here](#options)

## Install

```
npm i @snowcrystals/icicle
yarn add @snowcrystals/icicle
```

The following example is written using TypeScript.
```ts
import { Logger } from "@snowcrystals/icicle";
const icicle = new Logger();
icicle.info("Hello World!"); // 2022-11-25 20:18:33 INFO  Hello World!
```

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


## Author

👤 **ijsKoud**

-   Website: https://ijskoud.dev/
-   Email: <hi@ijskoud.dev>
-   Twitter: [@ijsKoud](https://ijskoud.dev/twitter)
-   Github: [@ijsKoud](https://github.com/ijsKoud)

## Donate

This will always be open source project, even if I don't receive donations. But there are still people out there that want to donate, so if you do here is the link [PayPal](https://ijskoud.dev/paypal) or to [Ko-Fi](https://ijskoud.dev/kofi). Thanks in advance! I really appriciate it <3

## License

Project is licensed under the © [**MIT License**](/LICENSE)

---
