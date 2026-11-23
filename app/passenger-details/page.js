
"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PassengerDetails() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const seats = searchParams.get("seats")?.split(",") || [];

  const [passengers, setPassengers] = useState({});

  const handleChange = (seat, field, value) => {
    setPassengers((prev) => ({
      ...prev,
      [seat]: {
        ...prev[seat],
        [field]: value
      }
    }));
  };

  const confirmBooking = () => {
    const bookingData = seats.map((seat) => ({
      seat: seat,
      name: passengers[seat]?.name || "",
      age: passengers[seat]?.age || ""
    }));

    sessionStorage.setItem(
      "bookingData",
      JSON.stringify(bookingData)
    );

    router.push(
      `/confirmation?seats=${seats.join(",")}`
    );
  };

  return (
    <div style={{
      padding: "30px",
      textAlign: "center"
    }}>
      <h1>Passenger Details</h1>

      {seats.map((seat) => (
        <div
          key={seat}
          style={{
            border: "1px solid black",
            padding: "20px",
            margin: "20px auto",
            width: "300px",
            borderRadius: "8px"
          }}
        >
          <h2>Seat {seat}</h2>

          <input
            type="text"
            placeholder="Passenger Name"
            value={passengers[seat]?.name || ""}
            onChange={(e) =>
              handleChange(seat, "name", e.target.value)
            }
            style={{
              padding: "10px",
              margin: "5px",
              width: "90%"
            }}
          />

          <input
            type="number"
            placeholder="Age"
            value={passengers[seat]?.age || ""}
            onChange={(e) =>
              handleChange(seat, "age", e.target.value)
            }
            style={{
              padding: "10px",
              margin: "5px",
              width: "90%"
            }}
          />
        </div>
      ))}

      <button
        onClick={confirmBooking}
        disabled={seats.length === 0}
        style={{
          padding: "12px 25px",
          marginTop: "20px",
          cursor: "pointer"
        }}
      >
        Confirm Booking
      </button>
    </div>
  );
}

