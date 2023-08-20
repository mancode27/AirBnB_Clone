import { useEffect, useState } from "react";
import AccountNav from "./AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import {
  differenceInBusinessDays,
  differenceInCalendarDays,
  format,
} from "date-fns";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"
            >
              <div className="w-48 ">
                <PlaceImg place={booking.place} />
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-xl font-bold">{booking.place.title}</h2>
                <BookingDates
                  booking={booking}
                  className="p-1 border-t border-gray-300 mt-1"
                />
                <div className="text-xl mt-2 flex gap-1 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                      clipRule="evenodd"
                    />
                  </svg>{" "}
                  {differenceInCalendarDays(
                    new Date(booking.checkOut),
                    new Date(booking.checkIn)
                  )}{" "}
                  Nights | Rs. {booking.price} paid
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
