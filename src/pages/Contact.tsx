import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { OgtPage } from '@/components/ogt/OgtShell';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  return (
    <OgtPage>
      <section className="pt-10 max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-zinc-500">One Global Trip — Contact</p>
        <h1 className="mt-3 font-display font-black text-4xl md:text-5xl text-[#001a41]">Talk to a human.</h1>
        <p className="mt-3 text-zinc-600 leading-relaxed">For a trip, a live price, or a visa question, start here. This form prepares your message. It does not pretend to send it to a backend that is not connected.</p>
        {sent ? (
          <div className="mt-6 border border-emerald-200 bg-emerald-50 rounded-2xl p-6">
            <p className="font-bold">Message prepared.</p>
            <p className="mt-1 text-sm text-zinc-600">Name: {name}<br />Email: {email}<br />Message: {message}</p>
            <p className="mt-3 text-sm text-zinc-600">Next step: start your trip and a concierge picks it up from there. <Link to="/startmytrip" className="underline font-semibold">Start my trip</Link></p>
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" className="w-full border border-zinc-300 rounded-md px-4 py-3 text-sm" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Your email" className="w-full border border-zinc-300 rounded-md px-4 py-3 text-sm" />
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="Where are you going, when, and what do you need?" rows={5} className="w-full border border-zinc-300 rounded-md px-4 py-3 text-sm" />
            <button className="bg-zinc-900 text-white font-semibold px-5 py-3 rounded-md text-sm">Prepare my message</button>
          </form>
        )}
      </section>
    </OgtPage>
  );
}
