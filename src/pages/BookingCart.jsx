import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearCart, removeRoomFromCart } from "../features/bookingCartSlice";
import { useAuth } from "../context/AuthContext";

export default function BookingCart() {
  const rooms = useSelector(state => state.bookingCart);
  const dispatch = useDispatch();
  const { user } = useAuth();
  const navigate = useNavigate();
  const total = rooms.reduce((sum, room) => sum + Number(room.price), 0);
  function continueBooking() {
    if (!user) { alert("Please login before booking."); navigate("/login"); return; }
    navigate("/checkout");
  }
  return <section className="section page-section">
    <span className="eyebrow">YOUR SELECTION</span><h1 className="page-title">Booking cart</h1>
    {!rooms.length ? <div className="empty-state"><h2>Your cart is empty</h2><p className="muted">Add a room to start planning your stay.</p><Link to="/rooms" className="btn btn-primary">Explore rooms</Link></div> :
      <div className="cart-layout"><div className="cart-list">{rooms.map(room => <div className="cart-item" key={room.id}><img src={room.image} alt={room.name}/><div className="cart-item-info"><h3>{room.name}</h3><p className="muted">{room.type} · {room.beds}</p><strong>₹{Number(room.price).toLocaleString("en-IN")} / night</strong></div><button className="remove-btn" onClick={() => dispatch(removeRoomFromCart(room.id))}>Remove</button></div>)}</div>
      <aside className="summary-card"><h3>Booking summary</h3><p>{rooms.length} selected room(s)</p><div className="summary-total"><span>Starting total / night</span><strong>₹{total.toLocaleString("en-IN")}</strong></div><button className="btn btn-primary btn-full" onClick={continueBooking}>Continue to booking</button><button className="clear-btn" onClick={() => dispatch(clearCart())}>Clear cart</button></aside></div>}
  </section>;
}
