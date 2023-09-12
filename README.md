# node-red-edgepi-relay

## EdgePi relay node that opens or closes relay

## Install
Install normally through the node-red editor or install with npm in your node-red directory
(typically located  at `~/node.red`) by running the following command:
```
npm install @edgepi-cloud/node-red-edgepi-relay
```

## Usage

### Properties
- **RPC Server**<br>
The connection to your EdgePi's RPC Server.

- **Energize**<br>
Whether to open or close the relay on input.

### Inputs
Any message can be used to trigger this node.

### Outputs
- **payload** *string*<br>
A success message stating the relay status.


**NOTE:** Currently, EdgePi nodes are only available on x86 systems.

