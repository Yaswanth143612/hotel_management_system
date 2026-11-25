import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import RoomDetails from "./pages/RoomDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookingCart from "./pages/BookingCart";
import Checkout from "./pages/Checkout";
import MyBookings from "./pages/MyBookings";
import Admin from "./pages/Admin";

export default function App() {
  return <BrowserRouter><div className="app-shell"><Navbar /><main className="main-content"><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/rooms" element={<Rooms />} />
    <Route path="/rooms/:id" element={<RoomDetails />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/booking-cart" element={<BookingCart />} />
    <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
    <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
    <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />
    <Route path="*" element={<section className="section empty-state"><h1>404 – Page not found</h1></section>} />
  </Routes></main><Footer /></div></BrowserRouter>;
}
