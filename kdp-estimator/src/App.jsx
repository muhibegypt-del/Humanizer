import { useMemo, useState } from 'react';
import { books, marketplaces } from './data.js';
import { addBusinessDays, formatCurrency, formatDate } from './utils.js';
import './App.css';

const ALL_BOOKS = '__all__';

export default function App() {
  const [selectedBookId, setSelectedBookId] = useState(books[0].id);
  const [quantity, setQuantity] = useState(10);
  const [marketplaceId, setMarketplaceId] = useState(marketplaces[0].id);

  const marketplace = marketplaces.find((m) => m.id === marketplaceId);
  const isAllBooks = selectedBookId === ALL_BOOKS;

  const estimate = useMemo(() => {
    const qty = Math.max(1, Math.min(999, Number(quantity) || 0));
    const titles = isAllBooks ? books : books.filter((b) => b.id === selectedBookId);

    const lines = titles.map((book) => {
      const copyPrice = book.basePriceGBP * marketplace.rate;
      const subtotal = copyPrice * qty;
      return { book, copyPrice, qty, subtotal };
    });

    const totalCopies = qty * titles.length;
    const itemsSubtotal = lines.reduce((sum, l) => sum + l.subtotal, 0);
    const shippingCost = marketplace.baseShipping + totalCopies * marketplace.perCopyShipping;
    const grandTotal = itemsSubtotal + shippingCost;

    const today = new Date();
    const dispatchDate = addBusinessDays(today, marketplace.dispatchDays);
    const arrivalDate = addBusinessDays(dispatchDate, marketplace.transitDays);

    return {
      lines,
      totalCopies,
      itemsSubtotal,
      shippingCost,
      grandTotal,
      dispatchDate,
      arrivalDate
    };
  }, [isAllBooks, selectedBookId, quantity, marketplace]);

  return (
    <div className="page">
      <header className="header">
        <h1>KDP Author Copy Estimator</h1>
        <p className="subtitle">Quick price &amp; delivery estimates for author copy orders</p>
      </header>

      <main className="layout">
        <section className="card form-card">
          <h2>Order details</h2>

          <label className="field">
            <span>Book</span>
            <select
              value={selectedBookId}
              onChange={(e) => setSelectedBookId(e.target.value)}
            >
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.name}
                </option>
              ))}
              <option value={ALL_BOOKS}>All 3 books (one of each per quantity)</option>
            </select>
          </label>

          <label className="field">
            <span>Quantity {isAllBooks && <em className="hint">(per title)</em>}</span>
            <input
              type="number"
              min="1"
              max="999"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>

          <label className="field">
            <span>Marketplace</span>
            <select
              value={marketplaceId}
              onChange={(e) => setMarketplaceId(e.target.value)}
            >
              {marketplaces.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.currency})
                </option>
              ))}
            </select>
          </label>
        </section>

        <section className="card estimate-card">
          <h2>Estimate</h2>

          <div className="lines">
            {estimate.lines.map(({ book, copyPrice, qty, subtotal }) => (
              <div key={book.id} className="line">
                <div className="line-title">{book.name}</div>
                <div className="line-meta">
                  {formatCurrency(copyPrice, marketplace.symbol)} × {qty}
                </div>
                <div className="line-amount">
                  {formatCurrency(subtotal, marketplace.symbol)}
                </div>
              </div>
            ))}
          </div>

          <div className="totals">
            <div className="row">
              <span>Items subtotal</span>
              <span>{formatCurrency(estimate.itemsSubtotal, marketplace.symbol)}</span>
            </div>
            <div className="row">
              <span>
                Shipping <em className="hint">({estimate.totalCopies} {estimate.totalCopies === 1 ? 'copy' : 'copies'})</em>
              </span>
              <span>{formatCurrency(estimate.shippingCost, marketplace.symbol)}</span>
            </div>
            <div className="row grand">
              <span>Grand total</span>
              <span>{formatCurrency(estimate.grandTotal, marketplace.symbol)}</span>
            </div>
          </div>

          <div className="arrival">
            <div className="arrival-label">Estimated arrival</div>
            <div className="arrival-date">{formatDate(estimate.arrivalDate)}</div>
            <div className="arrival-meta">
              Dispatch by {formatDate(estimate.dispatchDate)} ·
              {' '}{marketplace.dispatchDays}d print + {marketplace.transitDays}d transit (business days)
            </div>
          </div>

          <p className="disclaimer">
            Estimates only — actual shipping calculated at Amazon checkout.
          </p>
        </section>
      </main>

      <footer className="footer">
        Currency rates &amp; shipping costs are hardcoded approximations.
      </footer>
    </div>
  );
}
