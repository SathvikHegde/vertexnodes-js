[![Somehost Banner](https://images-ext-1.discordapp.net/external/UZAD0bDKzzdVdVEzIReYWZHwhTRdxh7gNJyFBj00Fl4/%3Fsize%3D256/https/cdn.discordapp.com/banners/824497581420838922/5b52e64ea233711c148684e2b3f5ef1f.png)](https://somehost.xyz/)

Get your bot's details and control it without having to access the panel! (hosted on [SomeHost](https://somehost.xyz/))

## How to get API Key

1. Visit the panel [here](https://panel.somehost.xyz/).
2. Click on the user icon in the top-right.
   ![Click on the user icon](https://i.imgur.com/Q5l34Vm.png[/img])
3. Click on the "API Credentials" tab.
   ![Click "API Credentials" tab.](https://i.imgur.com/oCyBLaH.png[/img])
4. Enter a name for the key and click "Create Key".
   ![Click "Create Key"](https://i.imgur.com/DvxnR4N.png[/img])

## How to get Server ID

**NOTE**: This server ID is different from what you get by doing `!me s` in discord.

1.  Visit the panel [here](https://panel.somehost.xyz/).
2. Click on your server's name.
3. Navigate to the "Settings Tab".
4. You will see your server ID under "DEBUG INFORMATION" tab.

## Installation

Installation is done using the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install express
```

## Examples

### **getServerUsage()**

Get usage of the server.

Parameters: ServerID

```js
const SomeHost = require("somehost-js");
const host = new SomeHost("API KEY");

host.getServerUsage("server ID").then(usage => {
   console.log(usage);
}).catch(err => console.log(err));
```

Returns a JSON object like this:
```
{
  memory_bytes: 22933504,
  cpu_absolute: 0,
  disk_bytes: 8456083,
  network_rx_bytes: 1762592,
  network_tx_bytes: 46024
}
```

### **getServerDetails**

Get details of the server.

Parameters: ServerID

```js
const SomeHost = require("somehost-js");
const host = new SomeHost("API KEY");

host.getServerDetails("server ID").then(details => {
   console.log(details);
}).catch(err => console.log(err));
```

Returns a JSON object like this:
```
{
  server_owner: true,
  identifier: '05314470',
  internal_id: 2088,
  uuid: '05314470-0bee-4ab8-83c4-15d9f4d077d0',
  name: 'Server',
  node: 'Free Node - 4',
  sftp_details: { ip: 'node4.somehost.xyz', port: 1234 },
  description: '',
  limits: {
    memory: 150,
    swap: 0,
    disk: 512,
    io: 500,
    cpu: 17,
    threads: null,
    oom_disabled: true
  },
  invocation: 'if [[ ! -z ${GIT_URL} ]] && [[ -d .git ]]; then git pull ${GIT_URL}; elif [[ ! -z ${GIT_URL} ]] && [[ ! -d .git ]]; then git init && git pull ${GIT_URL}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install --production; fi;/usr/local/bin/node /home/container/index.js',
  docker_image: 'quay.io/parkervcp/pterodactyl-images:debian_nodejs-16',
  egg_features: null,
  feature_limits: { databases: 0, allocations: 0, backups: 0 },
  status: null,
  is_suspended: false,
  is_installing: false,
  is_transferring: false,
  relationships: {
    allocations: { object: 'list', data: [Array] },
    variables: { object: 'list', data: [Array] }
  }
}
```

### **setPowerState**

Set the Powerstate of the server. State can be `start`, `stop`, `kill` or `restart`.

Parameters: ServerID, Powerstate

```js
const SomeHost = require("somehost-js");
const host = new SomeHost("API KEY");

host.setPowerState("server ID", "start").then(() => {
   console.log("Successfully set powerstate to start");
}).catch(err => console.log(err));
```

Returns a true boolean expression if changing powerstate was successful.

### **getPowerState**

Get the Powerstate of the server.

Parameters: ServerID

```js
const SomeHost = require("somehost-js");
const host = new SomeHost("API KEY");

host.getPowerState("server ID").then(state => {
   console.log(state);
}).catch(err => console.log(err));
```

Returns the state of the server.

### **sendCommand**

Sends a command to the server. The server must be online to send a command to it.

Parameters: ServerID, Command

```js
const SomeHost = require("somehost-js");
const host = new SomeHost("API KEY");

host.sendCommand("server ID", "say hello").then(() => {
   console.log("Sucesfully send the command");
}).catch(err => console.log(err));
```

Returns a true boolean expression if sending the command was successful.

## LICENSE




