
"use client";

import { useSearchParams } from "next/navigation";

export default function UserDetails() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div>
      <h1>User Details</h1>
      <p>Email: {email}</p>
    </div>
  );
}
