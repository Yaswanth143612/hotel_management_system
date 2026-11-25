import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import RoomCard from "../components/RoomCard";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/rooms").then(res => setRooms(res.data)).catch(() => alert("Could not load rooms. Start the backend server.")).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let result = rooms.filter(room =>
      room.name.toLowerCase().includes(search.toLowerCase()) &&
      (type === "All" || room.type === type)
    );
    if (sort === "low") result = [...result].sort((a,b) => a.price-b.price);
    if (sort === "high") result = [...result].sort((a,b) => b.price-a.price);
    return result;
  }, [rooms, search, type, sort]);

  return (
    <section className="section page-section">
      <span className="eyebrow">FIND YOUR ROOM</span><h1 className="page-title">Explore our rooms</h1>
      <p className="muted page-intro">Choose a space that makes your trip feel special.</p>
      <div className="filters">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search rooms..." />
        <select value={type} onChange={e => setType(e.target.value)}><option>All</option>{["Single","Double","Twin","Suite","Deluxe"].map(t => <option key={t}>{t}</option>)}</select>
        <select value={sort} onChange={e => setSort(e.target.value)}><option value="default">Sort by price</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select>
      </div>
      {loading ? <p>Loading rooms...</p> : filtered.length ? <div className="room-grid">{filtered.map(room => <RoomCard key={room.id} room={room} />)}</div> : <div className="empty-state">No rooms match your search.</div>}
    </section>
  );
}
