// client.js
var name=prompt("enter your name");
if(name===null){
    var name=prompt("enter your name strictly");
}
var socket = io();


const form = document.getElementById('send-container');
const messageinput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');


const append=(message,position)=>{
    const messageElement=document.createElement('div')
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.appendChild(messageElement);

}

socket.emit('new-user-joined',name);
socket.on('user-joined',(name)=>{
    append(`${name} has joined the chat`,'left');
})

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const message=messageinput.value
    socket.emit('send',message);
    append(`You:${message}`,'left');
    messageinput.value="";
})
socket.on('receive',(data)=>{
    append(`${data.name}:${data.message}`,'right');
})
socket.on('leave',name=>{
    append(`${name} has left the chat`,'left');
})


    
