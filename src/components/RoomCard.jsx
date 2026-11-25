import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addRoomToCart } from "../features/bookingCartSlice";

export default function RoomCard({ room }) {
  const dispatch = useDispatch();
  return (
    <article className="room-card">
      <Link to={`/rooms/${room.id}`} className="room-image-link">
        <img src={room.image} alt={room.name} className="room-image" />
      </Link>
      <div className="room-card-body">
        <div className="room-type-row"><span className="pill">{room.type}</span><span className="muted">Up to {room.capacity} guests</span></div>
        <h3>{room.name}</h3>
        <p className="muted">{room.beds}</p>
        <div className="room-card-bottom">
          <div><strong className="price">₹{Number(room.price).toLocaleString("en-IN")}</strong><span className="muted"> / night</span></div>
          <button className="btn btn-primary btn-small" onClick={() => dispatch(addRoomToCart(room))}>Add to cart</button>
        </div>
        <Link className="text-link" to={`/rooms/${room.id}`}>View details →</Link>
      </div>
    </article>
  );
}
