// Referencias HTML

const lblTicket1     = document.querySelector( '#lblTicket1');
const lblEscritorio1 = document.querySelector( '#lblEscritorio1');
const lblTicket2     = document.querySelector( '#lblTicket2');
const lblEscritorio2 = document.querySelector( '#lblEscritorio2');
const lblTicket3     = document.querySelector( '#lblTicket3');
const lblEscritorio3 = document.querySelector( '#lblEscritorio3');
const lblTicket4     = document.querySelector( '#lblTicket4');
const lblEscritorio5 = document.querySelector( '#lblEscritorio4');

const socket = io();

socket.on( 'actual-status', ( payload ) => {

    const audio = new Audio( './audio/new-ticket.mp3' );
    audio.play();

    const [ ticket1, ticket2, ticket3, ticket4 ] = payload;

    lblTicket1.innerText     = 'Ticket ' + ticket1.number;
    lblEscritorio1.innerText = ticket1.escritorio;
    lblTicket2.innerText     = 'Ticket ' + ticket2.number;
    lblEscritorio2.innerText = ticket2.escritorio;
    lblTicket3.innerText     = 'Ticket ' + ticket3.number;
    lblEscritorio3.innerText = ticket3.escritorio;
    lblTicket4.innerText     = 'Ticket ' + ticket4.number;
    lblEscritorio5.innerText = ticket4.escritorio;

})