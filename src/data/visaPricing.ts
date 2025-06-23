
export const visaPricingData = {
  schengenShortStay: {
    service: 'Schengen Short-Stay (≤90 d)',
    totalPrice: '$193',
    consularFee: '$103',
    centerFee: '$55',
    centerType: 'VFS' as const,
    serviceFee: '$35',
    included: [
      'Appointment booking at VFS Global centers',
      'Form fill + document checklist preparation',
      'Fee payments on client\'s behalf',
      'Application tracking updates via SMS/email',
      'Dedicated agent support throughout process'
    ]
  },
  schengenFullAssistance: {
    service: 'Schengen Full Assistance',
    totalPrice: '$75',
    consularFee: '$0',
    centerFee: '$0',
    centerType: 'VFS' as const,
    serviceFee: '$75',
    included: [
      'VFS Global appointment booking assistance',
      'Complete paperwork preparation and review',
      'Document checklist with requirements guide',
      'Pre-submission application verification',
      'Expert consultation on visa requirements'
    ]
  },
  canadaEntry: {
    service: 'Canada Entry (Visitor/eTA)',
    totalPrice: '$300',
    consularFee: '$200',
    centerFee: '$85',
    centerType: 'Biometrics' as const,
    serviceFee: '$15',
    included: [
      'Online application submission and tracking',
      'Biometrics appointment scheduling at VAC',
      'Document preparation and verification',
      'Application status monitoring and updates',
      'Immigration consultant guidance throughout'
    ]
  },
  nigeriaVisa: {
    service: 'Nigeria Visa Assistance',
    totalPrice: '$290',
    consularFee: '$160',
    centerFee: '$100',
    centerType: 'VFS' as const,
    serviceFee: '$30',
    included: [
      'VFS Global appointment booking nationwide',
      'Complete application form preparation',
      'Fee payment processing on your behalf',
      'Real-time application tracking updates',
      'Dedicated Nigerian visa specialist support'
    ]
  },
  ukVisa6Month: {
    service: 'UK Visa Assistance – 6-month',
    totalPrice: '$480',
    consularFee: '$160',
    centerFee: '$295',
    centerType: 'VFS' as const,
    serviceFee: '$25',
    included: [
      'UK visa application center appointments',
      'Online application form completion',
      'Priority appointment booking when available',
      'Document checklist and verification service',
      'Biometrics appointment coordination'
    ]
  },
  ukVisa5Year: {
    service: 'UK Visa Assistance – 5-year',
    totalPrice: '$995',
    consularFee: '$599',
    centerFee: '$295',
    centerType: 'VFS' as const,
    serviceFee: '$101',
    included: [
      'Long-term visa application specialist support',
      'Premium appointment booking assistance',
      'Comprehensive document review and preparation',
      'Multi-entry visa application guidance',
      'Ongoing support for 5-year validity'
    ]
  },
  brazilEVisa: {
    service: 'Brazil eVisa',
    totalPrice: '$175',
    consularFee: '$80',
    centerFee: '$0',
    centerType: 'Processing' as const,
    serviceFee: '$95',
    included: [
      'Online eVisa application submission',
      'Digital document preparation and upload',
      'Application status monitoring and alerts',
      'Tourist visa requirements consultation',
      'Express processing coordination when available'
    ]
  },
  longStayEuropeBrazil: {
    service: 'Long-Stay Europe/Brazil',
    totalPrice: '$240',
    consularFee: '$150',
    centerFee: '$55',
    centerType: 'VFS' as const,
    serviceFee: '$35',
    included: [
      'Student/work/residence visa application support',
      'Appointment booking at designated centers',
      'Long-stay document checklist preparation',
      'Embassy interview preparation guidance',
      'Residence permit application tracking'
    ]
  },
  uaeVisa: {
    service: 'UAE Tourist Visa',
    totalPrice: '$250',
    consularFee: '$120',
    centerFee: '$80',
    centerType: 'VFS' as const,
    serviceFee: '$50',
    included: [
      'UAE visa application center appointments',
      'Complete application form preparation',
      'Document verification and submission',
      'Real-time application tracking updates',
      'Tourist visa specialist support'
    ]
  },
  indiaVisa: {
    service: 'India e-Visa',
    totalPrice: '$180',
    consularFee: '$100',
    centerFee: '$0',
    centerType: 'Processing' as const,
    serviceFee: '$80',
    included: [
      'Online e-visa application submission',
      'Digital document preparation and upload',
      'Application status monitoring and alerts',
      'Tourist/business visa consultation',
      'Express processing coordination'
    ]
  },
  portugalLongStay: {
    service: 'Portugal Long-Stay Visa',
    totalPrice: '$240',
    consularFee: '$150',
    centerFee: '$55',
    centerType: 'VFS' as const,
    serviceFee: '$35',
    included: [
      'Portuguese long-stay visa application support',
      'Appointment booking at Portuguese centers',
      'Document preparation and verification',
      'Student/work/residence visa guidance',
      'Immigration specialist consultation'
    ]
  },
  norwayLongStay: {
    service: 'Norway Long-Stay Visa',
    totalPrice: '$240',
    consularFee: '$150',
    centerFee: '$55',
    centerType: 'VFS' as const,
    serviceFee: '$35',
    included: [
      'Norwegian long-stay visa application support',
      'Appointment booking at Norwegian centers',
      'Document preparation and verification',
      'Student/work visa guidance',
      'Immigration specialist consultation'
    ]
  },
  denmarkLongStay: {
    service: 'Denmark Long-Stay Visa',
    totalPrice: '$240',
    consularFee: '$150',
    centerFee: '$55',
    centerType: 'VFS' as const,
    serviceFee: '$35',
    included: [
      'Danish long-stay visa application support',
      'Appointment booking at Danish centers',
      'Document preparation and verification',
      'Student/work visa guidance',
      'Immigration specialist consultation'
    ]
  },
  finlandLongStay: {
    service: 'Finland Long-Stay Visa',
    totalPrice: '$240',
    consularFee: '$150',
    centerFee: '$55',
    centerType: 'VFS' as const,
    serviceFee: '$35',
    included: [
      'Long-stay visa application support',
      'Finnish insurance compliance guidance',
      'Appointment booking at Finnish centers',
      'Document preparation and verification',
      'Healthcare insurance consultation'
    ]
  },
  germanyLongStay: {
    service: 'Germany Long-Stay Visa',
    totalPrice: '$240',
    consularFee: '$150',
    centerFee: '$55',
    centerType: 'VFS' as const,
    serviceFee: '$35',
    included: [
      'German long-stay visa application support',
      'Appointment booking at German centers',
      'Document preparation and verification',
      'Student/work visa guidance',
      'Immigration specialist consultation'
    ]
  },
  franceLongStay: {
    service: 'France Long-Stay Visa',
    totalPrice: '$240',
    consularFee: '$150',
    centerFee: '$55',
    centerType: 'VFS' as const,
    serviceFee: '$35',
    included: [
      'French long-stay visa application support',
      'Appointment booking at French centers',
      'Document preparation and verification',
      'Student/work visa guidance',
      'Immigration specialist consultation'
    ]
  },
  switzerlandLongStay: {
    service: 'Switzerland Long-Stay Visa',
    totalPrice: '$240',
    consularFee: '$150',
    centerFee: '$55',
    centerType: 'VFS' as const,
    serviceFee: '$35',
    included: [
      'Swiss long-stay visa application support',
      'Appointment booking at Swiss centers',
      'Document preparation and verification',
      'Student/work visa guidance',
      'Immigration specialist consultation'
    ]
  }
};
