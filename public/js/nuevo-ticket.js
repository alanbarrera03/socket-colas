//HTML Reference
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear       = document.querySelector('button');

const socket = io();

socket.on('connect', () => {

    btnCrear.disabled = false;

});

socket.on('disconnect', () => {
    
    btnCrear.disabled = true;

});

socket.on( 'last-ticket', ( last ) => {

    lblNuevoTicket.innerText = 'Ticket ' + last;

})


btnCrear.addEventListener( 'click', () => {
    
    socket.emit( 'next-ticket', null, ( ticket ) => {
        
        // console.log( 'sdfsdfa', ticket );
        lblNuevoTicket.innerText = ticket;


    });

});