module.exports = function (RED) {
    //const rpc = require('@edgepi-cloud/edgepi-rpc')
  
    function RelayNode(config) {
      // Create new node instance with user config
      RED.nodes.createNode(this, config);
      const node = this;
      const ipc_transport = "ipc:///tmp/edgepi.pipe"
      const tcp_transport = `tcp://${config.tcpAddress}:${config.tcpPort}`
      const transport = (config.transport === "Network") ? tcp_transport : ipc_transport;
  

    
      // init new dout instance
    //   const relay = new rpc.RelayService(transport)
  
    //   if (relay){
    //     console.info("Relay node initialized on:", transport);
    //     node.status({fill:"green", shape:"ring", text:"d-out initialized"});
    //   }
  
      // Input event listener
    //   node.on('input', async function(msg,send,done){
    //     node.status({fill:"green", shape:"dot", text:"input recieved"});
    //     try{
    //       msg.payload = response;
    //     }
    //     catch(error){
    //       msg.payload = error;
    //       console.error(error)
    //     }
        
    //     send(msg)
        
    //     if (done) {
    //       done();
    //     }
    //   });
  
      node.on('close', (done) => {
        node.status({ fill: 'grey', shape: 'ring', text: 'relay node terminated' });
        done();
      });
    }
    
    RED.nodes.registerType('edgepi-relay-node', RelayNode);
    
  };