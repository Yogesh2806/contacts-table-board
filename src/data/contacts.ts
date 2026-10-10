import type { Contact } from '../types'

/**
 * Ten fictional contacts. The set is chosen to exercise edge cases:
 * - Qualified starts empty (an empty board group).
 * - Lena has no email, labels or notes; Kenji has no owner; Amara has no role.
 * - Oliver has a long name and company (truncation).
 * - Isabela has three labels (the "+1" overflow).
 */
export const INITIAL_CONTACTS: Contact[] = [
  {
    id: 'c1',
    name: 'Maya Patel',
    company: 'Lumen Brew',
    role: 'Head of Operations',
    email: 'maya@lumenbrew.co',
    owner: 'Arjun Rao',
    labels: ['Warm', 'Referral'],
    stage: 'Lead',
    notes: 'Met at the SaaS meetup; wants a demo in November.',
  },
  {
    id: 'c2',
    name: 'Lena Fischer',
    company: 'Kiefer & Sohn',
    role: 'Procurement lead',
    email: '',
    owner: 'Arjun Rao',
    labels: [],
    stage: 'Lead',
    notes: '',
  },
  {
    id: 'c3',
    name: 'Kenji Watanabe',
    company: 'Orbital Freight',
    role: 'VP Logistics',
    email: 'kenji.w@orbitalfreight.jp',
    owner: '',
    labels: ['Enterprise'],
    stage: 'Lead',
    notes: 'Inbound from the website form.',
  },
  {
    id: 'c4',
    name: 'Oliver Grant-Whitaker',
    company: 'Holloway & Grant Advisory',
    role: 'Senior partner',
    email: 'oliver@hollowayandgrant.co.uk',
    owner: 'Priya Shah',
    labels: [],
    stage: 'Lead',
    notes: 'Introduced by Isabela at the partner dinner.',
  },
  {
    id: 'c5',
    name: 'Daniel Okafor',
    company: 'Northwind Labs',
    role: 'CTO',
    email: 'daniel.okafor@northwind.io',
    owner: 'Sara Kim',
    labels: ['Enterprise'],
    stage: 'Prospect',
    notes: 'Needs a security review before the pilot.',
  },
  {
    id: 'c6',
    name: 'Sofia Alvarez',
    company: 'Brightloop',
    role: 'Marketing director',
    email: 'sofia@brightloop.com',
    owner: 'Sara Kim',
    labels: ['Referral'],
    stage: 'Prospect',
    notes: '',
  },
  {
    id: 'c7',
    name: 'Tom Becker',
    company: 'Fernhill Studio',
    role: 'Creative director',
    email: 'tom@fernhill.studio',
    owner: 'Arjun Rao',
    labels: ['Cold'],
    stage: 'Prospect',
    notes: 'Budget decision in Q1.',
  },
  {
    id: 'c8',
    name: 'Rahul Mehta',
    company: 'Tidepool',
    role: 'Founder',
    email: 'rahul@tidepool.in',
    owner: 'Priya Shah',
    labels: ['Startup', 'Warm'],
    stage: 'Customer',
    notes: 'Renewal due in March.',
  },
  {
    id: 'c9',
    name: 'Amara Nwosu',
    company: 'Quill & Co',
    role: '',
    email: 'amara@quillandco.com',
    owner: 'Priya Shah',
    labels: [],
    stage: 'Customer',
    notes: 'Prefers calls after 4 pm.',
  },
  {
    id: 'c10',
    name: 'Isabela Costa',
    company: 'Verdant Grid',
    role: 'Head of partnerships',
    email: 'isabela.costa@verdantgrid.energy',
    owner: 'Sara Kim',
    labels: ['Enterprise', 'Warm', 'Referral'],
    stage: 'Customer',
    notes: 'Happy to be a reference customer.',
  },
]

export const OWNERS = ['Arjun Rao', 'Priya Shah', 'Sara Kim'] as const

/** The signed-in teammate shown in the sidebar (fictional). */
export const CURRENT_USER = { name: 'Arjun Rao', role: 'Sales lead' }
