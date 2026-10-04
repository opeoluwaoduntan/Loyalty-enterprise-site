import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { OFFICES } from "../config.js";

export default function Offices() {
  return (
    <section className="offices">
      <h2>Visit us</h2>
      <div className="two">
        {OFFICES.map((o) => (
          <div className="box" key={o.title}>
            <h3>{o.title}</h3>
            <p><FaMapMarkerAlt /> {o.address}, {o.state}</p>
            <p><FaPhoneAlt /> {o.phone}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
