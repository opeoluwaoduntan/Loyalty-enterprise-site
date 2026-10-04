import { naira } from "../format.js";
import { CATEGORY_ICONS } from "../icons.jsx";

export default function PartsGrid({ parts, onAdd }) {
  if (parts.length === 0) {
    return <div className="empty">No match. Try a shorter name, or message us on WhatsApp and we will check for you.</div>;
  }
  return (
    <div className="grid">
      {parts.map((p) => {
        const Icon = CATEGORY_ICONS[p.category];
        const inStock = p.stock > 0;
        return (
          <div className="item" key={p.id}>
            <div className="ph" aria-hidden="true">{Icon && <Icon />}</div>
            <div className="body">
              <h3>{p.name}</h3>
              <div className="price">{naira(p.price)}</div>
              <div className={"stock " + (inStock ? "in" : "out")}>
                {inStock ? `In stock (${p.stock})` : "Out of stock"}
              </div>
              <button className="add" disabled={!inStock} onClick={() => onAdd(p.id)}>
                {inStock ? "Add to cart" : "Unavailable"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
