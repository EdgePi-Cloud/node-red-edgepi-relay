module.exports = function (RED) {
    const rpc = require('@edgepi-cloud/edgepi-rpc')
  
    function RelayNode(config) {
      // Create new node instance with user config
      RED.nodes.createNode(this, config);
      const node = this;
      const ipc_transport = "ipc:///tmp/edgepi.pipe"
      const tcp_transport = `tcp://${config.tcpAddress}:${config.tcpPort}`
      const transport = (config.transport === "Network") ? tcp_transport : ipc_transport;
      const relayState = (config.relayState)
  
      // init new relay instance
      const relay = new rpc.RelayService(transport)
  
      if (relay){
        console.info("Relay node initialized on:", transport);
        node.status({fill:"green", shape:"ring", text:"relay initialized"});
      }
  
      // Input event listener
      node.on('input', async function(msg,send,done){
        node.status({fill:"green", shape:"dot", text:"input recieved"});
        try{
          const response = await relay[relayState]();
          msg.payload = response;
        }
        catch(error){
          msg.payload = error;
          console.error(error)
        }
        
        send(msg)
        
        if (done) {
          done();
        }
      });
  
    }
    
    RED.nodes.registerType('relay', RelayNode);
    
  };