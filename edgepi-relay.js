module.exports = function (RED) {
  const rpc = require("@edgepi-cloud/edgepi-rpc");

  function RelayNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    setInitialConfigs(config).then((relay) => {
      node.on("input", async function (msg, send, done) {
        node.status({ fill: "green", shape: "dot", text: "input recieved" });
        try {
          const input = msg.payload === "open" ? "openRelay" : "closeRelay";
          msg.payload = await relay[input]();
        } catch (error) {
          console.error(error);
          msg.payload = error;
        }
        send(msg);
        if (done) {
          done();
        }
      });
    });

    async function setInitialConfigs(config) {
      const ipc_transport = "ipc:///tmp/edgepi.pipe";
      const tcp_transport = `tcp://${config.tcpAddress}:${config.tcpPort}`;
      const transport =
        config.transport === "Network" ? tcp_transport : ipc_transport;

      try {
        const relay = new rpc.RelayService(transport);
        console.info("Relay node initialized on:", transport);
        node.status({
          fill: "green",
          shape: "ring",
          text: "relay initialized",
        });

        await relay[config.relayState]();
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
