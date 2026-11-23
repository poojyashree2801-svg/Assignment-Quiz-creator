
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Confirmation() {
  const searchParams = useSearchParams();

  const seats = searchParams.get("seats")?.split(",") || [];

  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    const data = sessionStorage.getItem("bookingData");

    if (data) {
      setPassengers(JSON.parse(data));
    }
  }, []);

  return (
    <div style={{
      padding: "30px",
      textAlign: "center"
    }}>
      <h1>Booking Confirmed!</h1>

      <h2>Selected Seats:</h2>
      <p>{seats.join(", ")}</p>

      <h2>Passenger Details:</h2>

      {seats.map((seat) => {
        const passenger = passengers.find(
          (p) => p.seat === seat
        );

        return (
          <div
            key={seat}
            style={{
              border: "1px solid black",
              padding: "15px",
              margin: "15px auto",
              width: "300px",
              borderRadius: "8px"
            }}
          >
            <h3>Seat {seat}</h3>

            <p>
              Name: {passenger?.name || "Not entered"}
            </p>

            <p>
              Age: {passenger?.age || "Not entered"}
            </p>
          </div>
        );
      })}

      <h3>Thank you for booking!</h3>
    </div>
  );
}
