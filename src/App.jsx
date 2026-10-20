import { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Classic Black Shirt",
    price: 1800,
    category: "Shirts",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Casual White Shirt",
    price: 2200,
    category: "Shirts",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    name: "Premium Men's Suit",
    price: 6500,
    category: "Suits",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    name: "Casual Denim Jacket",
    price: 4200,
    category: "Jackets",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    name: "Men's Polo Shirt",
    price: 1600,
    category: "Shirts",
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    name: "Smart Casual Outfit",
    price: 3500,
    category: "Casual Wear",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 7,
    name: "Men's Formal Blazer",
    price: 5500,
    category: "Blazers",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 8,
    name: "Classic Men's T-Shirt",
    price: 1200,
    category: "T-Shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
  },
];

const categories = ["All pieces", ...new Set(products.map((product) => product.category))];

export default function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All pieces");
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All pieces" || product.category === category)
  );

  const addToCart = (product) => {
    setCart((items) => {
      const found = items.find((item) => item.id === product.id);
      return found
        ? items.map((item) => item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item)
        : [...items, { ...product, qty: 1 }];
    });
  };

  const changeQuantity = (productId, amount) => {
    setCart((items) => items
      .map((item) => item.id === productId ? { ...item, qty: item.qty + amount } : item)
      .filter((item) => item.qty > 0));
  };

  const itemCount = cart.reduce((count, item) => count + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const orderOnWhatsApp = () => {
    const message = "Assalam-o-Alaikum! Sanghera Collection se order:\n" +
      cart.map((item) => `${item.name} x ${item.qty} = Rs. ${item.price * item.qty}`).join("\n") +
      `\nTotal: Rs. ${total}\nMera order confirm karein.`;
    const phone = "923421723295";

    if (cart.length) {
      window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <div className="store" id="home">
      <div className="announcement">
        <span>A NEW SEASON, CONSIDERED</span>
        <a href="#collection">Discover the new collection</a>
      </div>

      <header className="navbar">
        <a className="brand" href="#home" aria-label="Sanghera Collection home">
          <span className="brand-name">SANGHERA</span>
          <span className="brand-caption">COLLECTION</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#collection">The collection</a>
          <a href="#story">Our point of view</a>
        </nav>
        <div className="nav-actions">
          <button className="text-action" type="button" onClick={() => setShowLogin(true)}>
            {loggedIn ? "Account" : "Sign in"}
          </button>
          <button className="bag-button" type="button" onClick={() => setShowCart(true)}>
            Bag <span>{String(itemCount).padStart(2, "0")}</span>
          </button>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-content">
          <p className="eyebrow">SANGHERA COLLECTION</p>
          <h1 id="hero-title">A quieter kind<br />of <em>statement.</em></h1>
          <p className="hero-description">
            Considered pieces for the moments that matter, and every day in between.
          </p>
          <a className="primary" href="#collection">Explore the collection <span aria-hidden="true">↗</span></a>
        </div>
        <p className="hero-index">01 / THE NEW EDIT</p>
      </section>

      <div className="service-strip" aria-label="Shopping services">
        <p>Thoughtful design <span>·</span> Made to be worn</p>
        <p>Explore the Sanghera edit</p>
        <p>Personal ordering via WhatsApp</p>
      </div>

      <main id="collection" className="catalog">
        <div className="catalog-heading">
          <div>
            <p className="eyebrow">THE SANGHERA EDIT</p>
            <h2>Pieces with presence.</h2>
          </div>
          <p className="catalog-intro">A considered wardrobe of modern essentials, chosen to stay with you.</p>
        </div>

        <div className="catalog-tools">
          <div className="categories" aria-label="Filter by category">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                type="button"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="search-wrap">
            <span className="sr-only">Search the collection</span>
            <input
              className="search"
              type="search"
              placeholder="Search pieces"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <span aria-hidden="true">⌕</span>
          </label>
        </div>

        <div className="results-line">
          <span>{filtered.length} {filtered.length === 1 ? "piece" : "pieces"}</span>
          <span>Designed for the everyday, kept for longer.</span>
        </div>

        {filtered.length ? (
          <div className="products">
            {filtered.map((product, index) => (
              <article className="product" key={product.id}>
                <div className="product-image-wrap">
                  <img src={product.image} alt={product.name} loading={index > 2 ? "lazy" : "eager"} />
                  <span className="product-number">SC / {String(product.id).padStart(2, "0")}</span>
                  <button className="add-button" type="button" onClick={() => addToCart(product)}>
                    Add to bag <span aria-hidden="true">+</span>
                  </button>
                </div>
                <div className="product-info">
                  <div>
                    <p className="product-category">{product.category}</p>
                    <h3>{product.name}</h3>
                  </div>
                  <strong>Rs. {product.price.toLocaleString()}</strong>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="empty-results">No pieces found. Try another search or category.</p>
        )}
      </main>

      <section className="story" id="story">
        <div className="story-image" role="img" aria-label="A considered edit of timeless clothing" />
        <div className="story-copy">
          <p className="eyebrow">A POINT OF VIEW</p>
          <h2>Wear what<br />feels like <em>you.</em></h2>
          <p>We believe getting dressed should feel personal. Sanghera brings together easy silhouettes and enduring pieces, with room for your own way of wearing them.</p>
          <a href="#collection" className="story-link">Find your piece <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      {showCart && (
        <div className="drawer-backdrop" onClick={() => setShowCart(false)}>
          <aside
            className="cart-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="panel-heading">
              <div>
                <p className="eyebrow">YOUR SELECTION</p>
                <h2 id="cart-title">The bag <span>({itemCount})</span></h2>
              </div>
              <button className="close" type="button" onClick={() => setShowCart(false)} aria-label="Close bag">×</button>
            </div>
            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>Your bag is waiting for something considered.</p>
                <button className="text-link" type="button" onClick={() => setShowCart(false)}>Continue exploring ↗</button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt="" />
                      <div className="cart-item-info">
                        <p className="product-category">{item.category}</p>
                        <h3>{item.name}</h3>
                        <strong>Rs. {(item.price * item.qty).toLocaleString()}</strong>
                        <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                          <button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label="Decrease quantity">−</button>
                          <span>{item.qty}</span>
                          <button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label="Increase quantity">+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <p><span>Subtotal</span><strong>Rs. {total.toLocaleString()}</strong></p>
                  <small>Delivery is arranged when your order is confirmed.</small>
                  <button className="primary checkout-button" type="button" onClick={orderOnWhatsApp}>
                    Continue on WhatsApp <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {showLogin && (
        <div className="modal-backdrop" onClick={() => setShowLogin(false)}>
          <section className="login-modal" role="dialog" aria-modal="true" aria-labelledby="login-title" onClick={(event) => event.stopPropagation()}>
            <button className="close" type="button" onClick={() => setShowLogin(false)} aria-label="Close sign in">×</button>
            <p className="eyebrow">SANGHERA COLLECTION</p>
            <h2 id="login-title">{loggedIn ? "Welcome back." : "A little more personal."}</h2>
            {loggedIn ? (
              <>
                <p className="account-email">Signed in as {email}</p>
                <button className="text-link" type="button" onClick={() => { setLoggedIn(false); setEmail(""); }}>Sign out</button>
              </>
            ) : (
              <form onSubmit={(event) => {
                event.preventDefault();
                setLoggedIn(true);
                setShowLogin(false);
              }}>
                <label htmlFor="email">Email address</label>
                <input id="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
                <label htmlFor="password">Password</label>
                <input id="password" type="password" required minLength="4" placeholder="Enter your password" />
                <button className="primary" type="submit">Sign in</button>
                <p className="note">This is a demo sign-in. Account details are not saved.</p>
              </form>
            )}
          </section>
        </div>
      )}

      <a className="whatsapp-float" href="https://wa.me/923421723295" target="_blank" rel="noreferrer" aria-label="Contact Sanghera Collection on WhatsApp">
        WhatsApp <span aria-hidden="true">↗</span>
      </a>

      <footer>
        <a className="brand footer-brand" href="#home" aria-label="Sanghera Collection home">
          <span className="brand-name">SANGHERA</span>
          <span className="brand-caption">COLLECTION</span>
        </a>
        <p>Considered clothing. Personal style.</p>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Sanghera Collection</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}