import React from "react";

export default function notfound() {
  return (
    <div
      style={{
        backgroundImage: `url(${
          process.env.PUBLIC_URL + "../Images/chatRoom.jpg"
        })`,
        height: "100vh",
      }}
    >
      <br />
      <br />
      <br />
      <div
        className="container col p-10 text-center"
        style={{
          width: "60%",
          background: "#070d13",
          opacity: "85%",
          borderRadius: "1rem",
        }}
      >
        <p
          style={{
            color: "#fff",
            fontSize: "28px",
            fontFamily: "Century Gothic",
          }}
        >
          You have to register before accessing Gamesity's content{" "}
        </p>
      </div>
    </div>
  );
}
