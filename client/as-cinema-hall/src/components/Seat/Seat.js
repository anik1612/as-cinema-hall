import { faCouch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Seat = ({ seat, handleTicketBooking }) => {
  return (
    <>
      <button
        onClick={() => handleTicketBooking(seat)}
        disabled={seat.disabled}
        className={`btn btn-${seat.color} m-2 px-3`}
      >
        {seat.i} <FontAwesomeIcon icon={faCouch} />
      </button>
    </>
  );
};

export default Seat;
