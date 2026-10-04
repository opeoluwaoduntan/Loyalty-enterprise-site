import { useMemo, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { COMPANY, LAST_UPDATED } from "./config.js";
import { CATEGORIES, PARTS } from "./data/parts.js";
import PartsGrid from "./components/PartsGrid.jsx";
import Cart from "./components/Cart.jsx";
import Offices from "./components/Offices.jsx";

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState({}); // { partId: quantity }
  const [cartOpen, setCartOpen] = useState(false);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PARTS.filter(
      (p) => (category === "All" || p.category === category) && `${p.name} ${p.category}`.toLowerCase().includes(q)
    );
  }, [query, category]);

  const lines = Object.entries(cart).map(([id, qty]) => {
    const part = PARTS.find((p) => p.id === Number(id));
    return { part, qty };
  });
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const total = lines.reduce((n, l) => n + l.qty * l.part.price, 0);

  function change(id, delta) {
    const part = PARTS.find((p) => p.id === id);
    setCart((c) => {
      const qty = (c[id] || 0) + delta;
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else if (qty <= part.stock) next[id] = qty;
      return next;
    });
  }

  return (
    <>
      <header className="site-header">
        <div className="wrap top">
          <div className="brand">
            {COMPANY.name}
            <small>{COMPANY.tagline}</small>
          </div>
          <button className="cartbtn" onClick={() => setCartOpen(true)} aria-label="Open cart">
            <FaShoppingCart /> Cart ({count})
          </button>
        </div>
      </header>

      <main className="wrap">
        <div className="hero">
          <h1>Check which phone parts we have in stock</h1>
          <p>LCD screens, touch screens, batteries and accessories. Add what you need, then send your order to us on WhatsApp.</p>
          <input
            className="search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a part, e.g. iPhone 11 LCD"
            aria-label="Search parts"
          />
          <div className="chips">
            {CATEGORIES.map((c) => (
              <button key={c} className="chip" aria-pressed={c === category} onClick={() => setCategory(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <p className="meta">
          {visible.length} items. Stock list: {LAST_UPDATED}
        </p>
        <PartsGrid parts={visible} onAdd={(id) => change(id, 1)} />
        <Offices />
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <span>&copy; {new Date().getFullYear()} {COMPANY.name}</span>
          <span>{COMPANY.description}</span>
        </div>
      </footer>

      <Cart open={cartOpen} onClose={() => setCartOpen(false)} lines={lines} total={total} count={count} onChange={change} />
    </>
  );
}
