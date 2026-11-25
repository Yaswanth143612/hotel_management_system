import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function MyBookings() {
  const { user } = useAuth();
  const location = useLocation();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  async function load() {
    try { const res = await api.get(`/bookings?userId=${user.id}`); setBookings(res.data.sort((a,b) => b.id-a.id)); }
    catch { setError("Could not load bookings. Start the backend server."); }
  }
  useEffect(() => { load(); }, []);
  async function cancel(id) {
    if (!confirm("Cancel this booking?")) return;
    await api.patch(`/bookings/${id}`, { status: "Cancelled" });
    load();
  }
  return <section className="section page-section">
    <span className="eyebrow">YOUR TRAVEL PLANS</span><h1 className="page-title">My bookings</h1>
    {location.state?.success && <p className="success">{location.state.success}</p>}
    {error && <p className="error">{error}</p>}
    {!bookings.length ? <div className="empty-state">No bookings yet.</div> : <div className="booking-table-wrap"><table className="data-table"><thead><tr><th>Room</th><th>Dates</th><th>Guests</th><th>Total</th><th>Status</th><th>Action</th></tr></thead><tbody>
      {bookings.map(b => <tr key={b.id}><td>{b.roomName}</td><td>{b.checkIn} → {b.checkOut}</td><td>{b.guests}</td><td>₹{Number(b.totalAmount).toLocaleString("en-IN")}</td><td><span className={`status ${b.status.toLowerCase()}`}>{b.status}</span></td><td>{b.status !== "Cancelled" && <button className="remove-btn" onClick={() => cancel(b.id)}>Cancel</button>}</td></tr>)}
    </tbody></table></div>}
  </section>;
}
