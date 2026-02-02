"use client";

export default function PayButton() {
  const handlePay = async () => {
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    window.location.href = data.url;
  };

  return <button onClick={handlePay}>Pay $5</button>;
}
