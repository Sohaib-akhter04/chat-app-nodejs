// client.js

var socket = io();
let name=prompt("enter name external")
var form = document.getElementById('send-container');
var input = document.querySelector('.messageInp');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});