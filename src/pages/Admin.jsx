import { useEffect, useState } from "react";
import api from "../services/api";

const blank = { name:"", type:"Double", price:"", capacity:2, beds:"1 Queen Bed", image:"https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900", description:"Comfortable hotel room.", amenities:["Wi-Fi","AC","TV"], available:true };

export default function Admin() {
  const [rooms,setRooms] = useState([]);
  const [bookings,setBookings] = useState([]);
  const [form,setForm] = useState(blank);
  const [editing,setEditing] = useState(null);
  const [error,setError] = useState("");
  async function load() {
    try {
      const [r,b] = await Promise.all([api.get("/rooms"),api.get("/bookings")]);
      setRooms(r.data); setBookings(b.data);
    } catch { setError("Backend is not running. Start JSON Server on port 3000."); }
  }
  useEffect(() => { load(); }, []);
  function change(e) { setForm({...form,[e.target.name]:e.target.value}); }
  async function save(e) {
    e.preventDefault(); setError("");
    const payload = {...form, price:Number(form.price), capacity:Number(form.capacity)};
    try {
      if(editing) await api.put(`/rooms/${editing}`,payload);
      else await api.post("/rooms",payload);
      setForm(blank); setEditing(null); load();
    } catch { setError("Could not save room."); }
  }
  function edit(room) { setEditing(room.id); setForm({...room, amenities: room.amenities || []}); window.scrollTo({top:0,behavior:"smooth"}); }
  async function remove(id) {
    if(!confirm("Delete this room?")) return;
    await api.delete(`/rooms/${id}`); load();
  }
  async function updateStatus(id,status) { await api.patch(`/bookings/${id}`,{status}); load(); }
  return <section className="section page-section">
    <span className="eyebrow">MANAGEMENT PANEL</span><h1 className="page-title">Admin dashboard</h1>
    <div className="stats-grid"><div className="stat-card"><span>Total rooms</span><strong>{rooms.length}</strong></div><div className="stat-card"><span>Total bookings</span><strong>{bookings.length}</strong></div><div className="stat-card"><span>Active bookings</span><strong>{bookings.filter(b=>b.status==="Confirmed").length}</strong></div></div>
    {error && <p className="error">{error}</p>}
    <div className="admin-layout">
      <form className="admin-form" onSubmit={save}><h2>{editing ? "Edit room" : "Add a room"}</h2>
        <label>Room name<input name="name" value={form.name} onChange={change} required /></label>
        <label>Room type<select name="type" value={form.type} onChange={change}>{["Single","Double","Twin","Suite","Deluxe"].map(t=><option key={t}>{t}</option>)}</select></label>
        <label>Price per night (₹)<input type="number" min="1" name="price" value={form.price} onChange={change} required /></label>
        <label>Guest capacity<input type="number" min="1" name="capacity" value={form.capacity} onChange={change} required /></label>
        <label>Beds<input name="beds" value={form.beds} onChange={change} required /></label>
        <label>Image URL<input name="image" value={form.image} onChange={change} /></label>
        <label>Description<textarea name="description" value={form.description} onChange={change} /></label>
        <div className="form-actions"><button className="btn btn-primary">{editing ? "Update room" : "Add room"}</button>{editing && <button type="button" className="btn btn-muted" onClick={()=>{setEditing(null);setForm(blank);}}>Cancel</button>}</div>
      </form>
      <div className="admin-content"><h2>Manage rooms</h2><div className="admin-room-list">{rooms.map(room=><div className="admin-room" key={room.id}><img src={room.image} alt={room.name}/><div><strong>{room.name}</strong><small>₹{room.price} / night · {room.type}</small></div><button className="text-link" onClick={()=>edit(room)}>Edit</button><button className="remove-btn" onClick={()=>remove(room.id)}>Delete</button></div>)}</div></div>
    </div>
    <h2 className="admin-booking-title">Manage bookings</h2>
    <div className="booking-table-wrap"><table className="data-table"><thead><tr><th>Customer</th><th>Room</th><th>Dates</th><th>Total</th><th>Status</th><th>Update</th></tr></thead><tbody>{bookings.map(b=><tr key={b.id}><td>{b.customerName}<small className="table-sub">{b.customerEmail}</small></td><td>{b.roomName}</td><td>{b.checkIn} → {b.checkOut}</td><td>₹{b.totalAmount}</td><td>{b.status}</td><td><select value={b.status} onChange={e=>updateStatus(b.id,e.target.value)}><option>Confirmed</option><option>Cancelled</option><option>Checked-in</option><option>Completed</option></select></td></tr>)}</tbody></table></div>
  </section>;
}
