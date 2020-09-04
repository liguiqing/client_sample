# Guozhi interview for web client

# you can try login with the default account：**admin** and password **123456**

## Development

Before you can build this project, you must install and configure the following dependencies on your machine:

1. [Node.js][]: We use Node to run a development web server and build the project.
   Depending on your system, you can install Node either from source or as a pre-packaged bundle.

After installing Node, you should be able to run the following command to install development tools.
You will only need to run this command when dependencies change in [package.json](package.json).

    npm install

We use npm scripts and [Webpack][] as our build system.

Run the following commands in two separate terminals to create a blissful development experience where your browser
auto-refreshes when files change on your hard drive.

    npm run mock

Npm is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json). You can also run `npm update` and `npm install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `npm help update`.

The `npm run` command will list all of the scripts available to run for this project.

### Service workers

Service workers are commented by default, to enable them please uncomment the following code.

- The service worker registering script in index.html

```html
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(function () {
      console.log('Service Worker Registered');
    });
  }
</script>
```

Note: workbox creates the respective service worker and dynamically generate the `service-worker.js`

### Managing dependencies

For example, to add [Leaflet][] library as a runtime dependency of your application, you would run following command:

    npm install --save --save-exact leaflet

To benefit from TypeScript type definitions from [DefinitelyTyped][] repository in development, you would run following command:

    npm install --save-dev --save-exact @types/leaflet

Then you would import the JS and CSS files specified in library's installation instructions so that [Webpack][] knows about them:
Edit [src/main/webapp/app/main.ts](src/main/webapp/app/main.ts) file:

```
import 'leaflet/dist/leaflet.js';
```

Edit [src/main/webapp/content/scss/vendor.scss](src/main/webapp/content/scss/vendor.scss) file:

```
@import '~leaflet/dist/leaflet.scss';
```

Note: there are still few other things remaining to do for Leaflet that we won't detail here.

### Using vue-cli

You can also use [Vue CLI][] to display the project using vue UI.

For example, the following command:

    vue ui

will generate open Vue Project Manager. From there, you'll be able to manage your project as any other Vue.js projects.

## Testing

### Client tests

Unit tests are run by [Jest][] and written with [Jasmine][]. They're located in [src/test/javascript/](src/test/javascript/) and can be run with:
npm test

For more information, refer to the [Running tests page][].

### Code quality

Sonar is used to analyse code quality. You can start a local Sonar server (accessible on http://localhost:9001) with:

```
docker-compose -f src/main/docker/sonar.yml up -d
```

# 请在此项目目录下搜索 “前端笔试要求” ，按要求5个工作日内完成所有工作。

## 完成后请代码上传到https://github.com/ 或者其他源代码托管服务商，并将项目地址发送到 liguiqing@guozhihrm.com

### 开发过程中有任务疑问请发邮件到 liguiqing@guozhihrm.com

## Vscode launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "name": "Launch Program",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run-script", "mock"],
      "skipFiles": ["<node_internals>/**"]
    },

    {
      "type": "node",
      "request": "launch",
      "name": "Jest Debug",
      "skipFiles": ["${workspaceFolder}/node/**", "${workspaceFolder}/node_moudules/**"],
      "program": "${workspaceRoot}/node_modules/jest/bin/jest",
      "args": ["--runInBand", "--env=jsdom", "--config", "src/test/javascript/jest.conf.js", "--coverage", "false", "${fileBasename}"],
      "runtimeArgs": ["--inspect-brk", "--trace-warnings", "--unhandled-rejections=none"],
      "protocol": "inspector",
      "cwd": "${workspaceRoot}",
      "stopOnEntry": false,
      "internalConsoleOptions": "openOnSessionStart",
      "port": 9229
    }
  ]
}
```
