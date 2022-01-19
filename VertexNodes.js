const fetch = require("node-fetch");

class VertexNodes {

  constructor(apikey) {
    if(!apikey) throw new Error("[VertexNodes.js] Missing API Key");
    if(typeof apikey != "string") throw new Error("[VertexNodes] API Key must be a string");

    this.apikey = apikey;
  }

  async getServerUsage(serverID) {
    /**
    * @param {string} serverID
    */

    if(!serverID) throw new Error("[VertexNodes.js: getServerUsage()] Missing Sever ID");
    if(typeof serverID != "string") throw new Error("[VertexNodes.js: getServerUsage()] Server ID must be a string");

    const res = await fetch(`https://panel.vertexnodes.com/api/client/servers/${serverID}/resources`, {
      method: "GET",
      headers: {"Authorization": `Bearer ${this.apikey}`, "Content-Type": "application/json", "Accept": "application/json"}
    });

    if(res.status == 404) throw new Error(`[VertexNodes.js: getServerUsage()] Server with ID ${serverID} not found`);
    if(res.status != 200) throw new Error("[VertexNodes.js: getServerUsage()] An unexpected error has occurred");

    const usage = await res.json();

    return usage.attributes.resources;
  }

  async getServerDetails(serverID) {
    /**
    * @param {string} serverID
    */

    if(!serverID) throw new Error("[VertexNodes.js: getServerDetails()] Missing Sever ID");
    if(typeof serverID != "string") throw new Error("[VertexNodes.js: getServerDetails()] Server ID must be a string");

    const res = await fetch(`https://panel.vertexnodes.com/api/client/servers/${serverID}`, {
      method: "GET",
      headers: {"Authorization": `Bearer ${this.apikey}`, "Content-Type": "application/json", "Accept": "application/json"}
    });

    if(res.status == 404) throw new Error(`[VertexNodes.js: getServerDetails()] Server with ID ${serverID} not found`);
    if(res.status != 200) throw new Error("[VertexNodes.js: getServerDetails()] An unexpected error has occurred");

    const details = await res.json();

    return details.attributes;
  }

  async setPowerState(serverID, powerstate) {
    /**
    * @param {string} serverID
    * @param {string} powerstate
    */
    if(!serverID) throw new Error("[VertexNodes.js: setPowerState()] Missing Sever ID");
    if(typeof serverID != "string") throw new Error("[VertexNodes.js: setPowerState()] Server ID must be a string");

    if(!powerstate) throw new Error("[VertexNodes.js: setPowerState()] Missing the Parameter Power State");
    if(typeof powerstate != "string") throw new Error("[VertexNodes.js: setPowerState()] Power State must be a string");
    if(!["start", "stop", "kill", "restart"].includes(powerstate.toLowerCase())) throw new Error("[VertexNodes.js: setPowerState()] Power State must be: 'start', 'stop', 'kill' or 'restart'");

    const res = await fetch(`https://panel.vertexnodes.com/api/client/servers/${serverID}/power`, {
      method: "POST",
      body: JSON.stringify({signal: powerstate}),
      headers: {"Authorization": `Bearer ${this.apikey}`, "Content-Type": "application/json", "Accept": "application/json"}
    });

    if(res.status == 404) throw new Error(`[VertexNodes.js: setPowerState()] Server with ID ${serverID} not found`);
    if(res.status != 204) throw new Error("[VertexNodes.js: setPowerState()] An unexpected error has occurred");

    return true;
  }

  async getPowerState(serverID) {
    /**
    * @param {string} serverID
    */
    if(!serverID) throw new Error("[VertexNodes.js: getPowerState()] Missing Sever ID");
    if(typeof serverID != "string") throw new Error("[VertexNodes.js: getPowerState()] Server ID must be a string");

    const res = await fetch(`https://panel.vertexnodes.com/api/client/servers/${serverID}/resources`, {
      method: "GET",
      headers: {"Authorization": `Bearer ${this.apikey}`, "Content-Type": "application/json", "Accept": "application/json"}
    });

    if(res.status == 404) throw new Error(`[VertexNodes.js: getPowerState()] Server with ID ${serverID} not found`);
    if(res.status != 200) throw new Error("[VertexNodes.js: getPowerState()] An unexpected error has occurred");

    const powerstate = await res.json();

    return powerstate.attributes.current_state;
  }

  async sendCommand(serverID, Command) {
    /**
    * @param {string} serverID
    * @param {string} Command
    */
    if(!serverID) throw new Error("[VertexNodes.js: sendCommand()] Missing Sever ID");
    if(typeof serverID != "string") throw new Error("[VertexNodes.js: sendCommand()] Server ID must be a string");

    if(!Command) throw new Error("[VertexNodes.js: sendCommand()] Missing the Parameter Command");

    const res = await fetch(`https://panel.vertexnodes.com/api/client/servers/${serverID}/command`, {
      method: "POST",
      body: JSON.stringify({command: Command}),
      headers: {"Authorization": `Bearer ${this.apikey}`, "Content-Type": "application/json", "Accept": "application/json"}
    });

    if(res.status == 404) throw new Error(`[VertexNodes.js: sendCommand()] Server with ID ${serverID} not found`);
    if(res.status == 502) throw new Error("[VertexNodes.js: sendCommand()] Server must be online to send a command");
    if(res.status != 204) throw new Error("[VertexNodes.js: setPowerState()] An unexpected error has occurred");

    return true;
  }
}

module.exports = VertexNodes;
