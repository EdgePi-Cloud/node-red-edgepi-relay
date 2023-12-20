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

- **State**<br>
Whether to open or close the relay.

### Inputs
- **payload** *string*<br>
The relay state.

Example input configuration:
```
msg {
    "payload": "open"
}
```

### Outputs
- **payload** *string*<br>
A success message stating the relay status.
