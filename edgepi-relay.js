module.exports = function (RED) {
  const rpc = require("@edgepi-cloud/edgepi-rpc");

  function RelayNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    let relayState = config.relayState;

    initializeNode(config).then((relay) => {
      node.on("input", async function (msg, send, done) {
        node.status({ fill: "green", shape: "dot", text: "input recieved" });

        try {
          relayState = msg.payload || relayState;
          const stateStr = relayState === true ? "closeRelay" : "openRelay";
          msg = { payload: await relay[stateStr]() };
        } catch (error) {
          console.error(error);
          msg.payload = error;
        }
        send(msg);
        done?.();
      });
    });

    async function initializeNode(config) {
      const transport =
        config.transport === "Network"
          ? `tcp://${config.tcpAddress}:${config.tcpPort}`
          : "ipc:///tmp/edgepi.pipe";

      try {
        const relay = new rpc.RelayService(transport);
        console.info("Relay node initialized on:", transport);
        node.status({
          fill: "green",
          shape: "ring",
          text: "relay initialized",
        });
        const stateStr = relayState === true ? "closeRelay" : "openRelay";
        console.info(await relay[stateStr]());
        return relay;
      } catch (error) {
        console.error(error);
        node.status({
          fill: "red",
          shape: "ring",
          text: "Initialization error",
        });
      }
    }
  }

  RED.nodes.registerType("relay", RelayNode);
};
