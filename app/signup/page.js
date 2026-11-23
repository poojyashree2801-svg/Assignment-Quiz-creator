
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCustomer } from "../authmanager";

export default function Signup() {
  const router = useRouter();

  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getConfPassword, setConfPassword] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>Create Account</div>

      <InputField
        placeholder={"Email"}
        type="text"
        userInputTyped={(emailValue) => {
          setEmail(emailValue);
        }}
      />

      <InputField
        placeholder={"Password"}
        type="password"
        userInputTyped={(passwordValue) => {
          setPassword(passwordValue);
        }}
      />

      <InputField
        placeholder={"Confirm Password"}
        type="password"
        userInputTyped={(confPassValue) => {
          setConfPassword(confPassValue);
        }}
      />

      <button
        style={{
          background: "orange",
          width: "200px",
        }}
        onClick={async () => {
          if (
            getEmail.trim() === "" ||
            getPassword === "" ||
            getConfPassword === ""
          ) {
            alert("All Fields are mandatory!");
            return;
          } else if (!getEmail.includes("@")) {
            alert("Enter Valid Email!");
            return;
          } else if (getPassword !== getConfPassword) {
            alert("Both Passwords should match!");
            return;
          } else if (getPassword.length < 8) {
            alert("Weak Password: Min. supported length is 8");
            return;
          }

          const result = await createCustomer(
            getEmail.trim(),
            getPassword,
            getConfPassword
          );

          if (result) {
            router.push(
              `/user-details?email=${encodeURIComponent(getEmail.trim())}`
            );
          }
        }}
      >
        Create Account
      </button>
    </div>
  );
}

function InputField({ placeholder, type, userInputTyped }) {
  return (
    <input
      style={{
        width: "200px",
        height: "50px",
        border: "2px solid blue",
      }}
      placeholder={placeholder}
      type={type}
      onChange={(event) => {
        userInputTyped(event.target.value);
      }}
    />
  );
}
