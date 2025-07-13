import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Country {
  code: string;
  name: string;
  flag: string;
  prefix: string;
}

const countries: Country[] = [
  { code: 'AD', name: 'Andorra', flag: '🇦🇩', prefix: '+376' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', prefix: '+971' },
  { code: 'AF', name: 'Afghanistan', flag: '🇦🇫', prefix: '+93' },
  { code: 'AG', name: 'Antigua and Barbuda', flag: '🇦🇬', prefix: '+1' },
  { code: 'AI', name: 'Anguilla', flag: '🇦🇮', prefix: '+1' },
  { code: 'AL', name: 'Albania', flag: '🇦🇱', prefix: '+355' },
  { code: 'AM', name: 'Armenia', flag: '🇦🇲', prefix: '+374' },
  { code: 'AO', name: 'Angola', flag: '🇦🇴', prefix: '+244' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', prefix: '+54' },
  { code: 'AS', name: 'American Samoa', flag: '🇦🇸', prefix: '+1' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', prefix: '+43' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', prefix: '+61' },
  { code: 'AW', name: 'Aruba', flag: '🇦🇼', prefix: '+297' },
  { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿', prefix: '+994' },
  { code: 'BA', name: 'Bosnia and Herzegovina', flag: '🇧🇦', prefix: '+387' },
  { code: 'BB', name: 'Barbados', flag: '🇧🇧', prefix: '+1' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', prefix: '+880' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', prefix: '+32' },
  { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫', prefix: '+226' },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬', prefix: '+359' },
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭', prefix: '+973' },
  { code: 'BI', name: 'Burundi', flag: '🇧🇮', prefix: '+257' },
  { code: 'BJ', name: 'Benin', flag: '🇧🇯', prefix: '+229' },
  { code: 'BM', name: 'Bermuda', flag: '🇧🇲', prefix: '+1' },
  { code: 'BN', name: 'Brunei', flag: '🇧🇳', prefix: '+673' },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴', prefix: '+591' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', prefix: '+55' },
  { code: 'BS', name: 'Bahamas', flag: '🇧🇸', prefix: '+1' },
  { code: 'BT', name: 'Bhutan', flag: '🇧🇹', prefix: '+975' },
  { code: 'BW', name: 'Botswana', flag: '🇧🇼', prefix: '+267' },
  { code: 'BY', name: 'Belarus', flag: '🇧🇾', prefix: '+375' },
  { code: 'BZ', name: 'Belize', flag: '🇧🇿', prefix: '+501' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', prefix: '+1' },
  { code: 'CD', name: 'Democratic Republic of the Congo', flag: '🇨🇩', prefix: '+243' },
  { code: 'CF', name: 'Central African Republic', flag: '🇨🇫', prefix: '+236' },
  { code: 'CG', name: 'Republic of the Congo', flag: '🇨🇬', prefix: '+242' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', prefix: '+41' },
  { code: 'CI', name: 'Ivory Coast', flag: '🇨🇮', prefix: '+225' },
  { code: 'CK', name: 'Cook Islands', flag: '🇨🇰', prefix: '+682' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', prefix: '+56' },
  { code: 'CM', name: 'Cameroon', flag: '🇨🇲', prefix: '+237' },
  { code: 'CN', name: 'China', flag: '🇨🇳', prefix: '+86' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', prefix: '+57' },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷', prefix: '+506' },
  { code: 'CU', name: 'Cuba', flag: '🇨🇺', prefix: '+53' },
  { code: 'CV', name: 'Cape Verde', flag: '🇨🇻', prefix: '+238' },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾', prefix: '+357' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', prefix: '+420' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', prefix: '+49' },
  { code: 'DJ', name: 'Djibouti', flag: '🇩🇯', prefix: '+253' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', prefix: '+45' },
  { code: 'DM', name: 'Dominica', flag: '🇩🇲', prefix: '+1' },
  { code: 'DO', name: 'Dominican Republic', flag: '🇩🇴', prefix: '+1' },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿', prefix: '+213' },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨', prefix: '+593' },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪', prefix: '+372' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', prefix: '+20' },
  { code: 'ER', name: 'Eritrea', flag: '🇪🇷', prefix: '+291' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', prefix: '+34' },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹', prefix: '+251' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', prefix: '+358' },
  { code: 'FJ', name: 'Fiji', flag: '🇫🇯', prefix: '+679' },
  { code: 'FK', name: 'Falkland Islands', flag: '🇫🇰', prefix: '+500' },
  { code: 'FM', name: 'Micronesia', flag: '🇫🇲', prefix: '+691' },
  { code: 'FO', name: 'Faroe Islands', flag: '🇫🇴', prefix: '+298' },
  { code: 'FR', name: 'France', flag: '🇫🇷', prefix: '+33' },
  { code: 'GA', name: 'Gabon', flag: '🇬🇦', prefix: '+241' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', prefix: '+44' },
  { code: 'GD', name: 'Grenada', flag: '🇬🇩', prefix: '+1' },
  { code: 'GE', name: 'Georgia', flag: '🇬🇪', prefix: '+995' },
  { code: 'GF', name: 'French Guiana', flag: '🇬🇫', prefix: '+594' },
  { code: 'GG', name: 'Guernsey', flag: '🇬🇬', prefix: '+44' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', prefix: '+233' },
  { code: 'GI', name: 'Gibraltar', flag: '🇬🇮', prefix: '+350' },
  { code: 'GL', name: 'Greenland', flag: '🇬🇱', prefix: '+299' },
  { code: 'GM', name: 'Gambia', flag: '🇬🇲', prefix: '+220' },
  { code: 'GN', name: 'Guinea', flag: '🇬🇳', prefix: '+224' },
  { code: 'GP', name: 'Guadeloupe', flag: '🇬🇵', prefix: '+590' },
  { code: 'GQ', name: 'Equatorial Guinea', flag: '🇬🇶', prefix: '+240' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', prefix: '+30' },
  { code: 'GT', name: 'Guatemala', flag: '🇬🇹', prefix: '+502' },
  { code: 'GU', name: 'Guam', flag: '🇬🇺', prefix: '+1' },
  { code: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼', prefix: '+245' },
  { code: 'GY', name: 'Guyana', flag: '🇬🇾', prefix: '+592' },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰', prefix: '+852' },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳', prefix: '+504' },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷', prefix: '+385' },
  { code: 'HT', name: 'Haiti', flag: '🇭🇹', prefix: '+509' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺', prefix: '+36' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', prefix: '+62' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', prefix: '+353' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱', prefix: '+972' },
  { code: 'IM', name: 'Isle of Man', flag: '🇮🇲', prefix: '+44' },
  { code: 'IN', name: 'India', flag: '🇮🇳', prefix: '+91' },
  { code: 'IO', name: 'British Indian Ocean Territory', flag: '🇮🇴', prefix: '+246' },
  { code: 'IQ', name: 'Iraq', flag: '🇮🇶', prefix: '+964' },
  { code: 'IR', name: 'Iran', flag: '🇮🇷', prefix: '+98' },
  { code: 'IS', name: 'Iceland', flag: '🇮🇸', prefix: '+354' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', prefix: '+39' },
  { code: 'JE', name: 'Jersey', flag: '🇯🇪', prefix: '+44' },
  { code: 'JM', name: 'Jamaica', flag: '🇯🇲', prefix: '+1' },
  { code: 'JO', name: 'Jordan', flag: '🇯🇴', prefix: '+962' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', prefix: '+81' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', prefix: '+254' },
  { code: 'KG', name: 'Kyrgyzstan', flag: '🇰🇬', prefix: '+996' },
  { code: 'KH', name: 'Cambodia', flag: '🇰🇭', prefix: '+855' },
  { code: 'KI', name: 'Kiribati', flag: '🇰🇮', prefix: '+686' },
  { code: 'KM', name: 'Comoros', flag: '🇰🇲', prefix: '+269' },
  { code: 'KN', name: 'Saint Kitts and Nevis', flag: '🇰🇳', prefix: '+1' },
  { code: 'KP', name: 'North Korea', flag: '🇰🇵', prefix: '+850' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', prefix: '+82' },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼', prefix: '+965' },
  { code: 'KY', name: 'Cayman Islands', flag: '🇰🇾', prefix: '+1' },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿', prefix: '+7' },
  { code: 'LA', name: 'Laos', flag: '🇱🇦', prefix: '+856' },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧', prefix: '+961' },
  { code: 'LC', name: 'Saint Lucia', flag: '🇱🇨', prefix: '+1' },
  { code: 'LI', name: 'Liechtenstein', flag: '🇱🇮', prefix: '+423' },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰', prefix: '+94' },
  { code: 'LR', name: 'Liberia', flag: '🇱🇷', prefix: '+231' },
  { code: 'LS', name: 'Lesotho', flag: '🇱🇸', prefix: '+266' },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹', prefix: '+370' },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', prefix: '+352' },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻', prefix: '+371' },
  { code: 'LY', name: 'Libya', flag: '🇱🇾', prefix: '+218' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦', prefix: '+212' },
  { code: 'MC', name: 'Monaco', flag: '🇲🇨', prefix: '+377' },
  { code: 'MD', name: 'Moldova', flag: '🇲🇩', prefix: '+373' },
  { code: 'ME', name: 'Montenegro', flag: '🇲🇪', prefix: '+382' },
  { code: 'MF', name: 'Saint Martin', flag: '🇲🇫', prefix: '+590' },
  { code: 'MG', name: 'Madagascar', flag: '🇲🇬', prefix: '+261' },
  { code: 'MH', name: 'Marshall Islands', flag: '🇲🇭', prefix: '+692' },
  { code: 'MK', name: 'North Macedonia', flag: '🇲🇰', prefix: '+389' },
  { code: 'ML', name: 'Mali', flag: '🇲🇱', prefix: '+223' },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲', prefix: '+95' },
  { code: 'MN', name: 'Mongolia', flag: '🇲🇳', prefix: '+976' },
  { code: 'MO', name: 'Macau', flag: '🇲🇴', prefix: '+853' },
  { code: 'MP', name: 'Northern Mariana Islands', flag: '🇲🇵', prefix: '+1' },
  { code: 'MQ', name: 'Martinique', flag: '🇲🇶', prefix: '+596' },
  { code: 'MR', name: 'Mauritania', flag: '🇲🇷', prefix: '+222' },
  { code: 'MS', name: 'Montserrat', flag: '🇲🇸', prefix: '+1' },
  { code: 'MT', name: 'Malta', flag: '🇲🇹', prefix: '+356' },
  { code: 'MU', name: 'Mauritius', flag: '🇲🇺', prefix: '+230' },
  { code: 'MV', name: 'Maldives', flag: '🇲🇻', prefix: '+960' },
  { code: 'MW', name: 'Malawi', flag: '🇲🇼', prefix: '+265' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', prefix: '+52' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', prefix: '+60' },
  { code: 'MZ', name: 'Mozambique', flag: '🇲🇿', prefix: '+258' },
  { code: 'NA', name: 'Namibia', flag: '🇳🇦', prefix: '+264' },
  { code: 'NC', name: 'New Caledonia', flag: '🇳🇨', prefix: '+687' },
  { code: 'NE', name: 'Niger', flag: '🇳🇪', prefix: '+227' },
  { code: 'NF', name: 'Norfolk Island', flag: '🇳🇫', prefix: '+672' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', prefix: '+234' },
  { code: 'NI', name: 'Nicaragua', flag: '🇳🇮', prefix: '+505' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', prefix: '+31' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', prefix: '+47' },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵', prefix: '+977' },
  { code: 'NR', name: 'Nauru', flag: '🇳🇷', prefix: '+674' },
  { code: 'NU', name: 'Niue', flag: '🇳🇺', prefix: '+683' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', prefix: '+64' },
  { code: 'OM', name: 'Oman', flag: '🇴🇲', prefix: '+968' },
  { code: 'PA', name: 'Panama', flag: '🇵🇦', prefix: '+507' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪', prefix: '+51' },
  { code: 'PF', name: 'French Polynesia', flag: '🇵🇫', prefix: '+689' },
  { code: 'PG', name: 'Papua New Guinea', flag: '🇵🇬', prefix: '+675' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', prefix: '+63' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰', prefix: '+92' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', prefix: '+48' },
  { code: 'PM', name: 'Saint Pierre and Miquelon', flag: '🇵🇲', prefix: '+508' },
  { code: 'PN', name: 'Pitcairn Islands', flag: '🇵🇳', prefix: '+64' },
  { code: 'PR', name: 'Puerto Rico', flag: '🇵🇷', prefix: '+1' },
  { code: 'PS', name: 'Palestine', flag: '🇵🇸', prefix: '+970' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', prefix: '+351' },
  { code: 'PW', name: 'Palau', flag: '🇵🇼', prefix: '+680' },
  { code: 'PY', name: 'Paraguay', flag: '🇵🇾', prefix: '+595' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦', prefix: '+974' },
  { code: 'RE', name: 'Réunion', flag: '🇷🇪', prefix: '+262' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴', prefix: '+40' },
  { code: 'RS', name: 'Serbia', flag: '🇷🇸', prefix: '+381' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', prefix: '+7' },
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼', prefix: '+250' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', prefix: '+966' },
  { code: 'SB', name: 'Solomon Islands', flag: '🇸🇧', prefix: '+677' },
  { code: 'SC', name: 'Seychelles', flag: '🇸🇨', prefix: '+248' },
  { code: 'SD', name: 'Sudan', flag: '🇸🇩', prefix: '+249' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', prefix: '+46' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', prefix: '+65' },
  { code: 'SH', name: 'Saint Helena', flag: '🇸🇭', prefix: '+290' },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮', prefix: '+386' },
  { code: 'SJ', name: 'Svalbard and Jan Mayen', flag: '🇸🇯', prefix: '+47' },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰', prefix: '+421' },
  { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱', prefix: '+232' },
  { code: 'SM', name: 'San Marino', flag: '🇸🇲', prefix: '+378' },
  { code: 'SN', name: 'Senegal', flag: '🇸🇳', prefix: '+221' },
  { code: 'SO', name: 'Somalia', flag: '🇸🇴', prefix: '+252' },
  { code: 'SR', name: 'Suriname', flag: '🇸🇷', prefix: '+597' },
  { code: 'SS', name: 'South Sudan', flag: '🇸🇸', prefix: '+211' },
  { code: 'ST', name: 'São Tomé and Príncipe', flag: '🇸🇹', prefix: '+239' },
  { code: 'SV', name: 'El Salvador', flag: '🇸🇻', prefix: '+503' },
  { code: 'SX', name: 'Sint Maarten', flag: '🇸🇽', prefix: '+1' },
  { code: 'SY', name: 'Syria', flag: '🇸🇾', prefix: '+963' },
  { code: 'SZ', name: 'Eswatini', flag: '🇸🇿', prefix: '+268' },
  { code: 'TC', name: 'Turks and Caicos Islands', flag: '🇹🇨', prefix: '+1' },
  { code: 'TD', name: 'Chad', flag: '🇹🇩', prefix: '+235' },
  { code: 'TF', name: 'French Southern Territories', flag: '🇹🇫', prefix: '+262' },
  { code: 'TG', name: 'Togo', flag: '🇹🇬', prefix: '+228' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', prefix: '+66' },
  { code: 'TJ', name: 'Tajikistan', flag: '🇹🇯', prefix: '+992' },
  { code: 'TK', name: 'Tokelau', flag: '🇹🇰', prefix: '+690' },
  { code: 'TL', name: 'Timor-Leste', flag: '🇹🇱', prefix: '+670' },
  { code: 'TM', name: 'Turkmenistan', flag: '🇹🇲', prefix: '+993' },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳', prefix: '+216' },
  { code: 'TO', name: 'Tonga', flag: '🇹🇴', prefix: '+676' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', prefix: '+90' },
  { code: 'TT', name: 'Trinidad and Tobago', flag: '🇹🇹', prefix: '+1' },
  { code: 'TV', name: 'Tuvalu', flag: '🇹🇻', prefix: '+688' },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼', prefix: '+886' },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', prefix: '+255' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', prefix: '+380' },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬', prefix: '+256' },
  { code: 'UM', name: 'United States Minor Outlying Islands', flag: '🇺🇲', prefix: '+1' },
  { code: 'US', name: 'United States', flag: '🇺🇸', prefix: '+1' },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾', prefix: '+598' },
  { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿', prefix: '+998' },
  { code: 'VA', name: 'Vatican City', flag: '🇻🇦', prefix: '+39' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines', flag: '🇻🇨', prefix: '+1' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪', prefix: '+58' },
  { code: 'VG', name: 'British Virgin Islands', flag: '🇻🇬', prefix: '+1' },
  { code: 'VI', name: 'United States Virgin Islands', flag: '🇻🇮', prefix: '+1' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', prefix: '+84' },
  { code: 'VU', name: 'Vanuatu', flag: '🇻🇺', prefix: '+678' },
  { code: 'WF', name: 'Wallis and Futuna', flag: '🇼🇫', prefix: '+681' },
  { code: 'WS', name: 'Samoa', flag: '🇼🇸', prefix: '+685' },
  { code: 'YE', name: 'Yemen', flag: '🇾🇪', prefix: '+967' },
  { code: 'YT', name: 'Mayotte', flag: '🇾🇹', prefix: '+262' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', prefix: '+27' },
  { code: 'ZM', name: 'Zambia', flag: '🇿🇲', prefix: '+260' },
  { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼', prefix: '+263' }
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const PhoneInput = ({ value, onChange, placeholder = "Enter phone number", className }: PhoneInputProps) => {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  
  // Extract country code and number from value
  const getPhoneNumber = () => {
    if (!value) return '';
    return value.replace(selectedCountry.prefix, '').trim();
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    const phoneNumber = getPhoneNumber();
    const newValue = phoneNumber ? `${country.prefix} ${phoneNumber}` : country.prefix;
    onChange(newValue);
    setOpen(false);
  };

  const handlePhoneChange = (phoneNumber: string) => {
    // Remove any non-digit characters except spaces and hyphens
    const cleanNumber = phoneNumber.replace(/[^\d\s-]/g, '');
    const newValue = cleanNumber ? `${selectedCountry.prefix} ${cleanNumber}` : selectedCountry.prefix;
    onChange(newValue);
  };

  return (
    <div className={cn("flex", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[180px] justify-between rounded-r-none border-r-0"
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">{selectedCountry.flag}</span>
              <span className="text-sm">{selectedCountry.prefix}</span>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={`${country.name} ${country.code}`}
                    onSelect={() => handleCountrySelect(country)}
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <span className="text-lg">{country.flag}</span>
                      <span className="flex-1">{country.name}</span>
                      <span className="text-sm text-muted-foreground">{country.prefix}</span>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedCountry.code === country.code ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        placeholder={placeholder}
        value={getPhoneNumber()}
        onChange={(e) => handlePhoneChange(e.target.value)}
        className="rounded-l-none"
      />
    </div>
  );
};