import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-slate max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
          
          <p className="text-muted-foreground mb-8">Last updated: 11 July 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Who We Are</h2>
            <p className="text-foreground/90 leading-relaxed">
              One GlobalTrip LLC ("One GlobalTrip," "we," "our" or "us") is a U.S.‑registered travel and visa‑assistance company headquartered in Houston, Texas. We help travelers book trips, secure visas, renew passports and access related concierge services. This Privacy Policy explains how we collect, use, share and protect your personal information when you visit oneglobaltrip.com (the "Site") or engage our services, and it describes your choices and rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Scope</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">This Policy applies to information we process about:</p>
            <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
              <li>Visitors to our Site and mobile experiences;</li>
              <li>Individuals who create an account or use our AI Visa Officer Document Verificator;</li>
              <li>Customers who book travel, visa, insurance or passport‑renewal services with us;</li>
              <li>Any other person who interacts with us online, by email, phone or in person.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Information We Collect</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              We collect the following categories of data, which may include Sensitive Personal Information (e.g., passport numbers):
            </p>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left font-semibold">Category</th>
                    <th className="border border-border p-3 text-left font-semibold">Examples</th>
                    <th className="border border-border p-3 text-left font-semibold">Legal Classification</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-3">Identification & Contact</td>
                    <td className="border border-border p-3">Full name; date & place of birth; nationality; mailing address; email; phone</td>
                    <td className="border border-border p-3">Personal Data</td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td className="border border-border p-3">Travel Documentation</td>
                    <td className="border border-border p-3">Passport number; expiration date; prior visas; invitation letters; sponsorship letters</td>
                    <td className="border border-border p-3">Sensitive Personal Data / Special Category (GDPR Art. 9)</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3">Payment & Billing</td>
                    <td className="border border-border p-3">Tokenised card details; billing address; transaction history</td>
                    <td className="border border-border p-3">Personal & Financial Data</td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td className="border border-border p-3">Account Credentials</td>
                    <td className="border border-border p-3">Username; hashed password; MFA tokens; audit logs</td>
                    <td className="border border-border p-3">Personal Data</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3">Technical & Usage</td>
                    <td className="border border-border p-3">IP address; device ID; browser type; cookies; referring URLs; interaction logs; approximate geolocation</td>
                    <td className="border border-border p-3">Usage Data</td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td className="border border-border p-3">Marketing Preferences</td>
                    <td className="border border-border p-3">Opt‑in/opt‑out status; communication history</td>
                    <td className="border border-border p-3">Personal Data</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-foreground/90 leading-relaxed mb-4">We obtain data:</p>
            <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
              <li>Directly from you (forms, uploads, calls, emails, in‑person meetings);</li>
              <li>Automatically via cookies and analytics;</li>
              <li>From third parties such as airlines, hotels, payment processors, identity‑verification vendors and public databases.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. How We Use Your Information</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">We process data only when we have a lawful basis, including:</p>
            <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
              <li><strong>Contract Performance</strong> – to book travel, complete visa or passport applications, process payments and deliver customer support.</li>
              <li><strong>Consent</strong> – where required for marketing emails, AI document analysis or optional services. You may withdraw consent at any time.</li>
              <li><strong>Legal Obligation</strong> – to comply with immigration, customs, tax and record‑keeping laws.</li>
              <li><strong>Legitimate Interests</strong> – to secure our systems, prevent fraud, improve our services and pursue business goals that do not override your rights.</li>
              <li><strong>Vital Interests</strong> – in emergencies that may threaten life or safety.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Sensitive Information</h2>
            <p className="text-foreground/90 leading-relaxed">
              We process passport details and other sensitive travel documents only for the purpose of facilitating the travel or visa services you request. Such data are stored encrypted at rest and are deleted or anonymised 60 days after your case closes, unless law or audit requirements mandate a longer retention period.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Sharing & Disclosure</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">We do not sell your personal information. We share data only as necessary:</p>
            <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
              <li><strong>Government & Consular Authorities</strong> – to submit visa/passport applications or comply with border‑control regulations.</li>
              <li><strong>Service Providers</strong> – secure cloud hosting, email delivery (e.g., Resend), AI document‑verification partners, payment processors (PCI‑DSS compliant) and customer‑relationship platforms.</li>
              <li><strong>Business Partners</strong> – airlines, hotels, insurance companies, cruise lines and tour operators when you book related services.</li>
              <li><strong>Legal & Safety</strong> – when required by law, court order or to protect our rights, users or the public.</li>
              <li><strong>Business Transfers</strong> – in connection with mergers, acquisitions or asset sales, subject to standard confidentiality safeguards.</li>
            </ul>
            <p className="text-foreground/90 leading-relaxed mt-4">
              Each vendor is contractually bound to process data under strict confidentiality and security standards (including GDPR Art. 28 Data Processing Agreements and U.S. state privacy statutes).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. International Data Transfers</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              If you are located in the European Economic Area (EEA), United Kingdom or other regions with data‑transfer restrictions, we rely on:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
              <li>Adequacy decisions where applicable;</li>
              <li>Standard Contractual Clauses (SCCs) approved by the European Commission;</li>
              <li>Other lawful transfer mechanisms.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Cookies & Tracking Technologies</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">We use first‑ and third‑party cookies to:</p>
            <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
              <li>Enable essential site functions and MFA;</li>
              <li>Measure and improve site performance (analytics);</li>
              <li>Personalise content and marketing.</li>
            </ul>
            <p className="text-foreground/90 leading-relaxed mt-4">
              You can manage cookies through your browser settings or our Cookie Preference Centre. Disabling some cookies may limit site functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Data Security</h2>
            <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
              <li>Encryption of data in transit (TLS 1.3) and at rest (AES‑256);</li>
              <li>Zero‑trust access controls with role‑based permissions;</li>
              <li>Multi‑factor authentication (MFA) for staff accounts;</li>
              <li>Regular penetration testing and vulnerability scanning;</li>
              <li>Least‑privilege principle and staff privacy training.</li>
            </ul>
            <p className="text-foreground/90 leading-relaxed mt-4">
              Despite our efforts, no method of transmission or storage is 100% secure. We encourage you to keep passwords confidential and enable MFA on your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Data Retention</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              We retain personal data only as long as necessary to fulfil the purposes outlined above, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
              <li><strong>Sensitive travel documents</strong> – deleted or anonymised 60 days after completion, unless law requires longer;</li>
              <li><strong>Customer account records</strong> – maintained while your account is active and for up to five years thereafter for tax/audit purposes;</li>
              <li><strong>Marketing records</strong> – until you opt out or two years after your last interaction.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Your Rights & Choices</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">Depending on your residence, you may have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
              <li>Access personal data we hold about you;</li>
              <li>Correct inaccurate or incomplete data;</li>
              <li>Delete or erase certain data;</li>
              <li>Restrict or object to processing;</li>
              <li>Data portability in a machine‑readable format;</li>
              <li>Opt out of marketing;</li>
              <li>Limit the use of Sensitive Personal Information (California CPRA);</li>
              <li>Non‑discrimination for exercising your rights.</li>
            </ul>
            <p className="text-foreground/90 leading-relaxed mt-4">
              To exercise rights, email privacy@oneglobaltrip.com or write to the address below. We will verify your identity and respond within the timeframe required by law (typically 30 days).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">12. Children's Privacy</h2>
            <p className="text-foreground/90 leading-relaxed">
              Our services are not directed to children under 13. We do not knowingly collect personal data from minors. If we learn we have gathered such data without parental consent, we will delete it promptly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">13. Third‑Party Sites & Services</h2>
            <p className="text-foreground/90 leading-relaxed">
              Our Site may link to third‑party websites or services. Their privacy practices are independent of ours; please review their policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">14. Updates to This Policy</h2>
            <p className="text-foreground/90 leading-relaxed">
              We may update this Policy to reflect changes in laws or our practices. We will post the revised version on this page with a new "Last updated" date. For material changes, we will provide prominent notice (e.g., via email or dashboard notification).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">15. Contact Us</h2>
            <div className="bg-muted p-6 rounded-lg">
              <p className="text-foreground/90 leading-relaxed mb-2"><strong>One GlobalTrip LLC</strong></p>
              <p className="text-foreground/90 leading-relaxed mb-2">Attn: Privacy Officer</p>
              <p className="text-foreground/90 leading-relaxed mb-2">2929 Allen Parkway, Suite 200</p>
              <p className="text-foreground/90 leading-relaxed mb-2">Houston, TX 77019, USA</p>
              <p className="text-foreground/90 leading-relaxed mb-2">Email: privacy@oneglobaltrip.com</p>
              <p className="text-foreground/90 leading-relaxed">Phone: +1 (832) 555‑0150</p>
            </div>
            <p className="text-foreground/90 leading-relaxed mt-4">
              If you are in the EEA/UK and believe we have not resolved your concern, you may lodge a complaint with your local supervisory authority.
            </p>
          </section>

          <div className="text-center text-muted-foreground mt-12 pt-8 border-t border-border">
            <p>© 2025 One GlobalTrip LLC. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;