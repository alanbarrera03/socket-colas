const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();  

const socketController = ( socket ) => {

    socket.emit( 'last-ticket', ticketControl.last );
    socket.emit( 'actual-status', ticketControl.last4 );
    socket.emit( 'tickets-pendientes', ticketControl.tickets.length );

    socket.on('next-ticket', ( payload, callback ) => {

        const following = ticketControl.following();
        callback( following );
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length );

    });

    socket.on( 'attend-ticket', ( { desktop }, callback ) => {

        if( !desktop ) {

            return callback( {
                
                 ok: false,
                msg: 'The Desktop is required'

            } );

        }

        const ticket = ticketControl.attendTicket( desktop );

        socket.broadcast.emit( 'actual-status', ticketControl.last4 );
        socket.emit( 'tickets-pendientes', ticketControl.tickets.length );
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length );

        if( !ticket ) {

            return callback( {
                
                 ok: false,
                msg: 'you no longer have tickets pending'

            } );

        } else {

            callback( {

                ok: true,
                    ticket

            } )

        }
        // console.log( payload );

    } )


}



module.exports = {
    socketController
}

