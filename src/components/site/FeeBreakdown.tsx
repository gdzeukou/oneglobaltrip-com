/** Where the money goes: consulate, visa center, and us, to scale. */

import React from 'react';
import type { VisaPricingData } from '@/data/visaPricing';
import { amount } from '@/data/visaCatalog';

const CENTER_LABEL: Record<VisaPricingData['centerType'], string> = {
  VFS: 'Visa center fee',
  BLS: 'Visa center fee',
  TLS: 'Visa center fee',
  Processing: 'Processing fee',
  Biometrics: 'Biometrics fee',
  Application: 'Application fee',
};

export default function FeeBreakdown({ price }: { price: VisaPricingData }) {
  const parts = [
    { label: 'Consulate or government fee', value: price.consularFee, cls: 'ogt-fee-a' },
    { label: CENTER_LABEL[price.centerType], value: price.centerFee, cls: 'ogt-fee-b' },
    { label: 'One Global Trip service fee', value: price.serviceFee, cls: 'ogt-fee-c' },
  ].filter((p) => amount(p.value) > 0);
  const total = parts.reduce((s, p) => s + amount(p.value), 0) || 1;

  return (
    <div>
      <div className="ogt-feebar" role="img" aria-label={parts.map((p) => `${p.label} ${p.value}`).join(', ')}>
        {parts.map((p) => <span key={p.label} className={p.cls} style={{ width: `${(amount(p.value) / total) * 100}%` }} />)}
      </div>
      <ul className="ogt-feelist">
        {parts.map((p) => (
          <li key={p.label}><i className={p.cls} aria-hidden="true" /><span>{p.label}</span><b>{p.value}</b></li>
        ))}
        <li style={{ borderTop: '1.5px solid var(--ink)', paddingTop: '0.5rem', marginTop: '0.2rem' }}>
          <span /><span style={{ fontWeight: 700 }}>Total you pay</span><b style={{ fontSize: '1.2rem', color: 'var(--ink)' }}>{price.totalPrice}</b>
        </li>
      </ul>
    </div>
  );
}
