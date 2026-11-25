import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../services/api";
import { addRoomToCart } from "../features/bookingCartSlice";

export default function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => { api.get(`/rooms/${id}`).then(res => setRoom(res.data)).catch(() => setRoom(false)); }, [id]);
  if (room === null) return <p className="section">Loading room...</p>;
  if (!room) return <section className="section"><h2>Room not found</h2><Link to="/rooms">Back to rooms</Link></section>;
  return (
    <section className="section page-section">
      <Link to="/rooms" className="text-link">← Back to rooms</Link>
      <div className="details-layout">
        <img className="details-image" src={room.image} alt={room.name} />
        <div className="details-copy"><span className="pill">{room.type}</span><h1>{room.name}</h1><p>{room.description}</p>
          <p><strong>Bed:</strong> {room.beds}</p><p><strong>Capacity:</strong> {room.capacity} guests</p>
          <h3>Amenities</h3><div className="amenities">{room.amenities.map(item => <span key={item}>✓ {item}</span>)}</div>
          <p className="detail-price">₹{Number(room.price).toLocaleString("en-IN")} <small>/ night</small></p>
          <button className="btn btn-primary" onClick={() => dispatch(addRoomToCart(room))}>Add to booking cart</button>
        </div>
      </div>
    </section>
  );
}
