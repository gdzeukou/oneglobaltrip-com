
// National visa categories and their specific requirements
export interface NationalVisaCategory {
  id: string;
  name: string;
  description: string;
  processingTime: string;
  financialRequirement: string;
  additionalRequirements: string[];
  pathToPR?: string;
  pathToCitizenship?: string;
}

export const nationalVisaCategories = {
  // Work-related visas
  work: {
    schengen: {
      'eu-blue-card': {
        id: 'eu-blue-card',
        name: 'EU Blue Card',
        description: 'For highly skilled professionals with university degrees',
        processingTime: '60-90 business days',
        financialRequirement: 'Job offer with salary 1.5x national average',
        additionalRequirements: ['University degree', 'Job contract', 'Health insurance'],
        pathToPR: '5 years',
        pathToCitizenship: '5-8 years with language test'
      },
      'red-white-red': {
        id: 'red-white-red',
        name: 'Red-White-Red Card (Austria)',
        description: 'Points-based skilled worker visa for Austria',
        processingTime: '60-90 business days',
        financialRequirement: 'Minimum salary thresholds',
        additionalRequirements: ['Points assessment', 'German language', 'Qualifications'],
        pathToPR: '5 years',
        pathToCitizenship: '6 years with B2 German'
      }
    },
    uk: {
      'skilled-worker': {
        id: 'skilled-worker',
        name: 'UK Skilled Worker Visa',
        description: 'For skilled professionals with job offers',
        processingTime: '8-12 weeks',
        financialRequirement: '£1,270 maintenance funds',
        additionalRequirements: ['Certificate of Sponsorship', 'English proficiency', 'Skill level RQF3+'],
        pathToPR: '5 years (Indefinite Leave to Remain)',
        pathToCitizenship: '6 years with Life in UK test'
      }
    },
    usa: {
      'h1b': {
        id: 'h1b',
        name: 'H-1B Specialty Occupation',
        description: 'For professionals in specialty occupations',
        processingTime: '2-6 months',
        financialRequirement: 'Prevailing wage requirements',
        additionalRequirements: ['Bachelor\'s degree', 'Employer petition', 'Labor Condition Application'],
        pathToPR: 'Available through employer sponsorship',
        pathToCitizenship: '5 years after green card'
      },
      'l1': {
        id: 'l1',
        name: 'L-1 Intracompany Transfer',
        description: 'For employees transferring within same company',
        processingTime: '2-4 months',
        financialRequirement: 'Company financial proof',
        additionalRequirements: ['1 year with company abroad', 'Managerial/specialized role'],
        pathToPR: 'Available through employer sponsorship',
        pathToCitizenship: '5 years after green card'
      }
    },
    canada: {
      'express-entry': {
        id: 'express-entry',
        name: 'Express Entry (Federal Skilled Worker)',
        description: 'Points-based system for permanent residence',
        processingTime: '6 months',
        financialRequirement: 'CAD $13,310+ (single applicant)',
        additionalRequirements: ['Language tests', 'Educational assessment', 'Work experience'],
        pathToPR: 'Direct pathway to PR',
        pathToCitizenship: '3 years of PR'
      }
    }
  },

  // Student visas
  study: {
    schengen: {
      'student-visa': {
        id: 'student-visa',
        name: 'National Student Visa (Type D)',
        description: 'For degree programs longer than 90 days',
        processingTime: '30-60 business days',
        financialRequirement: '€8,000-12,000 per year',
        additionalRequirements: ['University acceptance', 'Health insurance', 'Academic transcripts'],
        pathToPR: 'Available after graduation with job offer',
        pathToCitizenship: '5-8 years depending on country'
      }
    },
    uk: {
      'student-visa': {
        id: 'student-visa',
        name: 'UK Student Visa',
        description: 'For courses longer than 6 months',
        processingTime: '3-8 weeks',
        financialRequirement: '£1,334/month (up to 9 months)',
        additionalRequirements: ['CAS from licensed sponsor', 'English proficiency', 'TB test'],
        pathToPR: 'Graduate route then skilled worker',
        pathToCitizenship: '5+ years total pathway'
      }
    }
  },

  // Family reunification
  family: {
    schengen: {
      'family-reunification': {
        id: 'family-reunification',
        name: 'Family Reunification Visa',
        description: 'For joining EU/Schengen resident family members',
        processingTime: '30-90 business days',
        financialRequirement: 'Sponsor\'s income proof',
        additionalRequirements: ['Relationship proof', 'Accommodation proof', 'Health insurance'],
        pathToPR: '5 years',
        pathToCitizenship: '5-8 years with integration requirements'
      }
    }
  },

  // Investor/Golden visas
  investor: {
    portugal: {
      'golden-visa': {
        id: 'golden-visa',
        name: 'Portugal Golden Visa',
        description: 'Investment-based residency program',
        processingTime: '6-12 months',
        financialRequirement: '€280,000-500,000 investment',
        additionalRequirements: ['Investment maintenance', 'Clean criminal record', 'Health insurance'],
        pathToPR: '5 years',
        pathToCitizenship: '6 years with A2 Portuguese'
      }
    },
    spain: {
      'golden-visa': {
        id: 'golden-visa',
        name: 'Spain Golden Visa',
        description: 'Investment-based residency program',
        processingTime: '2-6 months',
        financialRequirement: '€500,000+ real estate investment',
        additionalRequirements: ['Investment maintenance', 'Health insurance', 'Clean criminal record'],
        pathToPR: '5 years continuous residence',
        pathToCitizenship: '10 years with Spanish language test'
      }
    },
    greece: {
      'golden-visa': {
        id: 'golden-visa',
        name: 'Greece Golden Visa',
        description: 'Real estate investment residency',
        processingTime: '2-4 months',
        financialRequirement: '€250,000-800,000 depending on area',
        additionalRequirements: ['Property maintenance', 'Health insurance'],
        pathToPR: '5 years',
        pathToCitizenship: '7 years with Greek language'
      }
    },
    uae: {
      'golden-visa': {
        id: 'golden-visa',
        name: 'UAE Golden Visa',
        description: '5-10 year renewable residency',
        processingTime: '1-3 months',
        financialRequirement: 'AED 2M+ investment or specialized skills',
        additionalRequirements: ['Investment maintenance', 'Medical fitness'],
        pathToPR: 'Renewable long-term residency',
        pathToCitizenship: 'No direct pathway to citizenship'
      }
    }
  },

  // Digital nomad visas
  digitalNomad: {
    portugal: {
      'digital-nomad': {
        id: 'digital-nomad',
        name: 'Portugal Digital Nomad Visa',
        description: 'For remote workers and freelancers',
        processingTime: '60-90 days',
        financialRequirement: '€760/month minimum income',
        additionalRequirements: ['Remote work proof', 'Health insurance', 'Accommodation'],
        pathToPR: 'Possible after 5 years',
        pathToCitizenship: '6 years with language requirement'
      }
    },
    estonia: {
      'digital-nomad': {
        id: 'digital-nomad',
        name: 'Estonia Digital Nomad Visa',
        description: 'For remote workers up to 1 year',
        processingTime: '15-30 days',
        financialRequirement: '€3,500/month income',
        additionalRequirements: ['Remote employment/business proof', 'Health insurance'],
        pathToPR: 'Not direct, but can apply for other permits',
        pathToCitizenship: '8 years total residence'
      }
    },
    uae: {
      'digital-nomad': {
        id: 'digital-nomad',
        name: 'UAE Remote Work Visa',
        description: '1-year renewable remote work permit',
        processingTime: '2-4 weeks',
        financialRequirement: '$5,000/month minimum income',
        additionalRequirements: ['Employment proof', 'Health insurance', 'Medical fitness'],
        pathToPR: 'Can lead to other UAE residence permits',
        pathToCitizenship: 'No direct pathway'
      }
    }
  }
};

// Regional movement rules
export const regionalMovementRules = {
  schengen: {
    typeD: {
      description: 'Type D national visa allows residence in issuing country + 90 days travel in other Schengen states',
      allowedTravel: '90 days in 180-day period in other Schengen countries',
      restrictions: 'Cannot work in other Schengen countries without permits'
    }
  },
  eu_eea: {
    freedomOfMovement: {
      description: 'EU/EEA citizens enjoy freedom of movement, work, and residence',
      allowedTravel: 'Unlimited within EU/EEA',
      restrictions: 'May need to register for stays >3 months'
    }
  },
  gcc: {
    gulfCooperation: {
      description: 'GCC citizens have preferential treatment in Gulf states',
      allowedTravel: 'Simplified visa processes between GCC countries',
      restrictions: 'Varies by specific bilateral agreements'
    }
  }
};

// Get national visa categories for a destination
export const getNationalVisaCategories = (destination: string, purpose: string) => {
  const categories = [];
  
  // Determine region
  const isSchengen = ['austria', 'belgium', 'france', 'germany', 'italy', 'spain', 'portugal', 'greece', 'netherlands'].includes(destination);
  
  if (purpose === 'work' || purpose === 'business') {
    if (isSchengen) {
      categories.push(nationalVisaCategories.work.schengen['eu-blue-card']);
      if (destination === 'austria') {
        categories.push(nationalVisaCategories.work.schengen['red-white-red']);
      }
    } else if (destination === 'uk') {
      categories.push(nationalVisaCategories.work.uk['skilled-worker']);
    } else if (destination === 'usa') {
      categories.push(nationalVisaCategories.work.usa.h1b, nationalVisaCategories.work.usa.l1);
    } else if (destination === 'canada') {
      categories.push(nationalVisaCategories.work.canada['express-entry']);
    }
  }
  
  if (purpose === 'study') {
    if (isSchengen) {
      categories.push(nationalVisaCategories.study.schengen['student-visa']);
    } else if (destination === 'uk') {
      categories.push(nationalVisaCategories.study.uk['student-visa']);
    }
  }
  
  // Always include investor options for eligible countries
  if (['portugal', 'spain', 'greece'].includes(destination)) {
    categories.push(nationalVisaCategories.investor[destination as keyof typeof nationalVisaCategories.investor]['golden-visa']);
  } else if (destination === 'uae') {
    categories.push(nationalVisaCategories.investor.uae['golden-visa']);
  }
  
  // Digital nomad options
  if (['portugal', 'estonia', 'uae'].includes(destination)) {
    categories.push(nationalVisaCategories.digitalNomad[destination as keyof typeof nationalVisaCategories.digitalNomad]['digital-nomad']);
  }
  
  return categories;
};
