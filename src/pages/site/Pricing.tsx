import React from 'react';
import { Link } from 'react-router-dom';
import { SitePage } from '@/components/site/SiteShell';
import { LONG_STAY, SCOUTPASS, SHORT_STAY, priceOf, type VisaService } from '@/data/visaCatalog';

function PriceTable({ items, caption }: { items: VisaService[]; caption: string }) {
  const rows = items.flatMap((v) => [
    { key: v.slug, name: v.name, slug: v.slug, price: priceOf(v.pricing) },
    ...(v.variant ? [{ key: `${v.slug}-variant`, name: `${v.name}, ${v.variant.label.toLowerCase()}`, slug: v.slug, price: priceOf(v.variant.pricing) }] : []),
  ]);
  return (
    <div className="ogt-table-scroll">
      <table className="ogt-table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr><th scope="col">Visa</th><th scope="col">Consulate</th><th scope="col">Visa center</th><th scope="col">Our fee</th><th scope="col">Total</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key}>
              <td><Link to={`/visas/${r.slug}`}>{r.name}</Link></td>
              <td>{r.price.consularFee}</td>
              <td>{r.price.centerFee}</td>
              <td>{r.price.serviceFee}</td>
              <td>{r.price.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Pricing() {
  return (
    <SitePage title="Pricing">
      <section className="ogt-hero">
        <div className="ogt-wrap">
          <p className="ogt-eyebrow">No hidden fee, no surprise at the counter</p>
          <h1 className="ogt-h1" style={{ maxWidth: '56rem' }}>One price per visa. Every fee shown.</h1>
          <p className="ogt-lede" style={{ marginTop: '1.5rem' }}>
            Each total covers the consulate fee, the visa center fee and our service. The price is per applicant.
          </p>
        </div>
      </section>

      <section className="ogt-section-tight">
        <div className="ogt-wrap ogt-split ogt-split-wide-right">
          <div>
            <h2 className="ogt-h2">Appointment only</h2>
            <p className="ogt-muted" style={{ marginTop: '0.9rem', maxWidth: '26rem' }}>You prepare your own file. We find and secure the appointment.</p>
          </div>
          <div className="ogt-panel" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem 2rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 className="ogt-h3">ScoutPass appointment hunt</h3>
              <p className="ogt-small ogt-muted" style={{ margin: '0.4rem 0 0', maxWidth: '26rem' }}>{SCOUTPASS.refund} Consulate and center fees are separate.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <p style={{ margin: 0 }}><span className="ogt-price">{SCOUTPASS.price}</span> <span className="ogt-small ogt-muted">{SCOUTPASS.unit}</span></p>
              <Link to="/start?service=appointment" className="ogt-btn ogt-btn-shine">Hunt my appointment</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="ogt-section-tight">
        <div className="ogt-wrap">
          <h2 className="ogt-h2">Full service, short stays</h2>
          <div style={{ marginTop: '1.5rem' }}><PriceTable items={SHORT_STAY} caption="Short-stay visa prices" /></div>
        </div>
      </section>

      <section className="ogt-section-tight" style={{ paddingBottom: 'clamp(3.5rem, 8vw, 6rem)' }}>
        <div className="ogt-wrap">
          <h2 className="ogt-h2">Full service, long stays</h2>
          <div style={{ marginTop: '1.5rem' }}><PriceTable items={LONG_STAY} caption="Long-stay visa prices" /></div>
          <p className="ogt-note" style={{ marginTop: '2rem' }}>
            Consulates and visa centers change their fees. If a fee has moved by the time you apply, we tell you before you pay.
          </p>
        </div>
      </section>
    </SitePage>
  );
}
