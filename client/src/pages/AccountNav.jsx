import { Link, useLocation, useParams } from "react-router-dom";

export default function AccountNav() {
  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[2];
  if (subpage === undefined) {
    subpage = "profile";
  }
  function linkClasses(type = null) {
    let classes = "inline-flex gap-1 py-2 px-6 rounded-full";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    } else {
      classes += " bg-gray-200";
    }
    return classes;
  }
  return (
    <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
      <Link className={linkClasses("profile")} to={"/account"}>
        My Profile
      </Link>
      <Link className={linkClasses("bookings")} to={"/account/bookings"}>
        My Bookings
      </Link>
      <Link className={linkClasses("places")} to={"/account/places"}>
        My Accomodations
      </Link>
    </nav>
  );
}
