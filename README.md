# node-red-edgepi-relay

## EdgePi relay node that opens or closes relay

## Install
Install normally through the node-red editor or install with npm in your node-red directory by running the following command:
```
npm install @edgepi-cloud/node-red-edgepi-relay
```

## Usage

### Properties
**RPC Server**
The connection to your EdgePi's RPC Server.

**Energize**
Whether to open or close the relay on input.

### Inputs
Any message can be used to trigger this node.

### Outputs
**payload** *string*
A success message stating the relay status.

### References
- [GitHub](https://github.com/edgepi-cloud/node-red-edgepi-relay) - The node's GitHub repository
