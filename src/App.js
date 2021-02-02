import React, {useState} from "react";

import './index.css';
import {Seat} from "./Seat";


function App() {
    const numberOfSeats = 48;

    const [tickets, setTickets] = useState( 1 );
    const [seats, setSeats] = useState(
        new Array( numberOfSeats )
            .fill( 'free' )
            .map( ( s ) => Math.random() < 0.5 ? s : 'occupied' )
    );

    const handleSeatClick = ( seat ) => {
        if ( seats[ seat ] === 'free' ) {

            // count how many items in our seats array has status "selected"
            const selectedSeats = seats.reduce((a, c) => {
                if(c === 'selected') return a + 1;
                return a;
            }, 0)

            // if allready selected all tickets return from this method
            if(selectedSeats >= tickets) return;


            // modify seat with index `seat` to status "selected"
            setSeats( seats.map( ( status, i ) => {
                if ( i === seat ) return 'selected';
                return status;
            } ) )

        } else if( seats[ seat ] === 'selected' ){
            // modify seat with index `seat` to status "free"
            setSeats( seats.map( ( status, i ) => {
                if ( i === seat ) return 'free';
                return status;
            } ) )
        }
    }

    return (
        <div className="App">
            <div>
                <label>
                    How many tickets do you want?
                    <select value={tickets} onChange={( e ) => setTickets( e.target.value )}>
                        {
                            ( new Array( 10 ) ).fill( null ).map( ( n, i ) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ) )
                        }
                    </select>
                </label>

            </div>
            <div className="carriage">
                {
                    ( new Array( numberOfSeats / 4 ) ).fill( null ).map( ( n, row ) => (
                        <div key={row} className="carriage-row">
                            <div onClick={() => handleSeatClick( row * 4 + 0 )}>
                                <Seat number={row * 4 + 1} status={seats[ row * 4 + 0 ]}/>
                            </div>

                            <div onClick={() => handleSeatClick( row * 4 + 1 )}>
                                <Seat number={row * 4 + 2} status={seats[ row * 4 + 1 ]}/>
                            </div>

                            <div className="aisle-spacer"></div>

                            <div onClick={() => handleSeatClick( row * 4 + 2 )}>
                                <Seat number={row * 4 + 3} status={seats[ row * 4 + 2 ]}/>
                            </div>
                            <div onClick={() => handleSeatClick( row * 4 + 3 )}>
                                <Seat number={row * 4 + 4} status={seats[ row * 4 + 3 ]}/>
                            </div>
                        </div>
                    ) )
                }

            </div>
        </div>
    );
}

export default App;
