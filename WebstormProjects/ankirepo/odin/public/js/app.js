var socket = io();
var createAccount = document.getElementById("btn-create");
window.addEventListener("load",function () {
   socket.emit('connecting',123);
});

createAccount.addEventListener("click",function () {
   alert('btn clicked');

});