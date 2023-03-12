//HTML References
const lblDesktop    = document.querySelector( 'h1' );
const btnAttent     = document.querySelector( 'button' );
const lblTicket     = document.querySelector( 'small' );
const divAlert      = document.querySelector( '.alert' );
const lblPendientes = document.querySelector( '#lblPendientes' );




const searchParams = new URLSearchParams( window.location.search );

if ( !searchParams.has( 'escritorio' ) ) {

    window.location = 'index.html';
    throw new Error( 'Desktop is required' );

}


const desktop = searchParams.get( 'escritorio' );
lblDesktop.innerText = desktop;

divAlert.getElementsByClassName.display = 'none';

const socket = io();

socket.on('connect', () => {

    btnAttent.disabled = false;

});

socket.on('disconnect', () => {
    
    btnAttent.disabled = true;

});

socket.on( 'tickets-pendientes', ( pendientes ) => {

    if ( pendientes === 0 ) {

        lblPendientes.style.display = 'none';

    } else {

        lblPendientes.style.display = '';
        lblPendientes.innerText = pendientes;

    }

})


btnAttent.addEventListener( 'click', () => {

    socket.emit( 'attend-ticket', { desktop }, ( { ok, ticket, msg } ) => {

        if( !ok ) {

            lblTicket.innerText = 'Nothing'
            return divAlert.style.display = '';

        }

        lblTicket.innerText = 'Ticket ' + ticket.number;

    });

});