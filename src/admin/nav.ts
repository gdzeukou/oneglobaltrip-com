/**
 * The console's sections, grouped the way the Houston Signing Pro console
 * groups its own: Today, then what came in, then the work, then people and
 * setup.
 */

import type { LucideIcon } from 'lucide-react';
import {
  FileText,
  FolderOpen,
  Inbox,
  LayoutDashboard,
  Mail,
  Plane,
  PlaneTakeoff,
  ReceiptText,
  Settings,
  ShieldCheck,
  UserPlus,
  Users,
} from 'lucide-react';

export type Section =
  | 'overview'
  | 'requests'
  | 'leads'
  | 'orders'
  | 'refunds'
  | 'applications'
  | 'flights'
  | 'people'
  | 'admins'
  | 'documents'
  | 'comms'
  | 'setup';

export const SECTIONS: Section[] = [
  'overview',
  'requests',
  'leads',
  'orders',
  'refunds',
  'applications',
  'flights',
  'people',
  'admins',
  'documents',
  'comms',
  'setup',
];

export interface NavItem {
  id: Section;
  label: string;
  icon: LucideIcon;
  count?: number;
  alert?: boolean;
}

export interface NavGroup {
  label?: string;
  items: NavItem[];
}

export interface NavCounts {
  requests?: number;
  orders?: number;
  refunds?: number;
}

export function nav(c: NavCounts = {}): NavGroup[] {
  return [
    { items: [{ id: 'overview', label: 'Today', icon: LayoutDashboard }] },
    {
      label: 'Inbox',
      items: [
        { id: 'requests', label: 'Requests', icon: Inbox, count: c.requests, alert: true },
        { id: 'leads', label: 'Eligibility leads', icon: UserPlus },
      ],
    },
    {
      label: 'Work',
      items: [
        { id: 'orders', label: 'Appointment hunts', icon: Plane, count: c.orders },
        { id: 'refunds', label: 'Refunds', icon: ReceiptText, count: c.refunds, alert: true },
        { id: 'applications', label: 'Visa applications', icon: FileText },
        { id: 'flights', label: 'Flight bookings', icon: PlaneTakeoff },
      ],
    },
    {
      label: 'People',
      items: [
        { id: 'people', label: 'Accounts', icon: Users },
        { id: 'documents', label: 'Documents', icon: FolderOpen },
        { id: 'comms', label: 'Messages sent', icon: Mail },
      ],
    },
    {
      label: 'Setup',
      items: [
        { id: 'admins', label: 'Admins', icon: ShieldCheck },
        { id: 'setup', label: 'Tools & links', icon: Settings },
      ],
    },
  ];
}

export const TITLES: Record<Section, { title: string; description?: string }> = {
  overview: { title: 'Today', description: 'What needs you now, and what came in lately.' },
  requests: { title: 'Requests', description: 'Everything sent from the site’s forms. Move each one to an answer.' },
  leads: { title: 'Eligibility leads', description: 'People who ran the eligibility check and left their email.' },
  orders: { title: 'Appointment hunts', description: 'Paid ScoutPass orders. Record each stage as it happens.' },
  refunds: { title: 'Refunds', description: 'Refund requests on appointment hunts.' },
  applications: { title: 'Visa applications', description: 'Applications started in the older online form.' },
  flights: { title: 'Flight bookings', description: 'Flights booked through the travel agent.' },
  people: { title: 'Accounts', description: 'Everyone with a One Global Trip account.' },
  admins: { title: 'Admins', description: 'Who can open this console. Only give it to people on the team.' },
  documents: { title: 'Documents', description: 'Passports, photos and proofs travelers uploaded.' },
  comms: { title: 'Messages sent', description: 'Emails and texts sent to travelers about their hunt.' },
  setup: { title: 'Tools & links', description: 'The outside services One Global Trip runs on.' },
};
