// import websocketStore from "svelte-websocket-store";

// const initialValue = 7;
// export const bidplayerid = websocketStore("ws://localhost:8999", initialValue);


import { writable } from 'svelte/store';

const playebid = writable({});

const socket = new WebSocket('ws://localhost:8999');


// Connection opened
socket.addEventListener('open', function (event) {
    console.log("It's open");
});

// Listen for messages
socket.addEventListener('message', function (event) {
	console.log("Getting the Player details")
    playebid.set(event.data);
});

const sendMessage = (message) => {
	if (socket.readyState <= 1) {
		console.log("Sending Player details to the User Room")
		socket.send(message);
	}
}


export default {
	subscribe: playebid.subscribe,
	sendMessage
}