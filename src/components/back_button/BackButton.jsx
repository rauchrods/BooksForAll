import React from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

function BackButton({ to = "/" }) {
  return (
    <div style={{
        backgroundColor: 'rgb(44, 128, 255)',
        display: 'inline-block',
        padding: '4px 10px',
        borderRadius: '6px',
        marginBottom: '10px',
    }}>
      <Link to={to}>
        <IoMdArrowRoundBack style={{
            color: 'white',
        }}/>
      </Link>
    </div>
  );
}

export default BackButton;
