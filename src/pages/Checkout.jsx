import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { clearCart } from "../features/bookingCartSlice";
import { useAuth } from "../context/AuthContext";

export default function Checkout() {
  const rooms = useSelector(state => state.bookingCart);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dates, setDates] = useState({ checkIn: "", checkOut: "", guests: 1 });
  const [error, setError] = useState("");
  const nights = dates.checkIn && dates.checkOut ? Math.ceil((new Date(dates.checkOut)-new Date(dates.checkIn))/86400000) : 0;
  const total = rooms.reduce((sum, room) => sum + Number(room.price), 0) * Math.max(nights, 0);
  async function submit(e) {
    e.preventDefault(); setError("");
    if (!rooms.length) { setError("Your booking cart is empty."); return; }
    if (nights <= 0) { setError("Check-out date must be after check-in date."); return; }
    try {
      await Promise.all(rooms.map(room => api.post("/bookings", {
        userId: user.id, customerName: user.name, customerEmail: user.email,
        roomId: room.id, roomName: room.name, checkIn: dates.checkIn, checkOut: dates.checkOut,
        guests: Number(dates.guests), nights, totalAmount: Number(room.price) * nights,
        status: "Confirmed", createdAt: new Date().toISOString()
      })));
      dispatch(clearCart());
      navigate("/my-bookings", { state: { success: "Your booking has been placed successfully." } });
    } catch { setError("Booking failed. Please check that the backend is running."); }
  }
  return <section className="auth-section"><form className="auth-card checkout-card" onSubmit={submit}>
    <span className="eyebrow">CONFIRM YOUR STAY</span><h1>Booking details</h1>
    <p className="muted">{rooms.length} room(s) selected</p>
    {error && <p className="error">{error}</p>}
    <label>Check-in<input type="date" min={new Date().toISOString().slice(0,10)} value={dates.checkIn} onChange={e => setDates({...dates,checkIn:e.target.value})} required /></label>
    <label>Check-out<input type="date" min={dates.checkIn || new Date().toISOString().slice(0,10)} value={dates.checkOut} onChange={e => setDates({...dates,checkOut:e.target.value})} required /></label>
    <label>Guests<input type="number" min="1" max="8" value={dates.guests} onChange={e => setDates({...dates,guests:e.target.value})} required /></label>
    <div className="checkout-total"><span>Estimated total</span><strong>₹{total.toLocaleString("en-IN")}</strong></div>
    <small className="muted">Demo project only. No online payment is collected.</small>
    <button className="btn btn-primary btn-full">Confirm booking</button>
  </form></section>;
}
