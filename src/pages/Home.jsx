import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import RoomCard from "../components/RoomCard";

export default function Home() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => { api.get("/rooms").then(res => setRooms(res.data.slice(0, 3))).catch(() => {}); }, []);
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">WELCOME TO GRANDSTAY</span>
          <h1>Your comfort is<br /><em>our destination.</em></h1>
          <p>Thoughtfully designed rooms, warm hospitality and a stay worth remembering.</p>
          <Link to="/rooms" className="btn btn-gold">Explore rooms <span>→</span></Link>
        </div>
        <div className="hero-note"><span>✦</span><div><strong>Stay a little longer</strong><small>Feel right at home</small></div></div>
      </section>
      <section className="section">
        <div className="section-heading"><div><span className="eyebrow">A PLACE TO UNWIND</span><h2>Rooms made for you</h2></div><Link className="text-link" to="/rooms">View all rooms →</Link></div>
        <div className="room-grid">{rooms.map(room => <RoomCard key={room.id} room={room} />)}</div>
      </section>
      <section className="feature-strip">
        <div><span>✧</span><strong>Comfort first</strong><small>Thoughtful spaces</small></div>
        <div><span>⌁</span><strong>Easy booking</strong><small>Simple and convenient</small></div>
        <div><span>♡</span><strong>Warm service</strong><small>Here for your stay</small></div>
      </section>
    </>
  );
}
