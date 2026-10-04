import { FaWhatsapp } from "react-icons/fa";
import { COMPANY, WHATSAPP } from "../config.js";
import { naira } from "../format.js";

export default function Cart({ open, onClose, lines, total, count, onChange }) {
  const message =
    `Hello ${COMPANY.name}, I would like to order:\n` +
    lines.map((l) => `${l.qty}x ${l.part.name}, ${naira(l.qty * l.part.price)}`).join("\n") +
    `\nTotal: ${naira(total)}\nPlease confirm availability.`;
  const link = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

  return (
    <div className={"sheet" + (open ? " open" : "")} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="panel" role="dialog" aria-label="Your cart">
        <h2>
          Your order
          <button className="close" onClick={onClose} aria-label="Close cart">&times;</button>
        </h2>

        {lines.length === 0 ? (
          <div className="empty">Your cart is empty. Add a part to start your order.</div>
        ) : (
          lines.map(({ part, qty }) => (
            <div className="row" key={part.id}>
              <div>
                <b>{part.name}</b>
                <span>{naira(part.price)} each</span>
              </div>
              <div className="qty">
                <button onClick={() => onChange(part.id, -1)} aria-label="Remove one">&minus;</button>
                <span>{qty}</span>
                <button onClick={() => onChange(part.id, 1)} aria-label="Add one">+</button>
              </div>
            </div>
          ))
        )}

        <div className="total">
          <span>Total</span>
          <span>{naira(total)}</span>
        </div>
        <a
          className="wa"
          href={count ? link : undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!count}
          style={{ opacity: count ? 1 : 0.5 }}
        >
          <FaWhatsapp /> Send order on WhatsApp
        </a>
        <p className="note">We confirm availability and the final price on WhatsApp before you pay.</p>
      </div>
    </div>
  );
}
