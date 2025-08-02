import type { Admin } from '../types/admin';

export const mockAdmins: Admin[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@platform.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    assignedSocieties: [
      { id: 1, name: "Green Valley Residency", unitCount: 245 },
      { id: 2, name: "Sunshine Apartments", unitCount: 180 },
      { id: 3, name: "Palm Grove Society", unitCount: 320 }
    ],
    lastActivity: "2025-01-25T10:30:00Z",
    createdAt: "2024-08-15T09:00:00Z",
    loginCount: 156,
    ticketsResolved: 89,
    recentActivities: [
      {
        id: 1,
        action: "Approved resident registration",
        society: "Green Valley Residency",
        timestamp: "2025-01-25T10:30:00Z",
        type: "approval"
      },
      {
        id: 2,
        action: "Updated unit status",
        society: "Sunshine Apartments",
        timestamp: "2025-01-25T08:15:00Z",
        type: "update"
      },
      {
        id: 3,
        action: "Resolved maintenance complaint",
        society: "Palm Grove Society",
        timestamp: "2025-01-24T16:45:00Z",
        type: "resolution"
      },
      {
        id: 4,
        action: "Created new poll",
        society: "Green Valley Residency",
        timestamp: "2025-01-24T14:20:00Z",
        type: "creation"
      }
    ]
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@platform.com",
    phone: "+1 (555) 234-5678",
    status: "active",
    assignedSocieties: [
      { id: 4, name: "Oakwood Heights", unitCount: 425 },
      { id: 5, name: "Marina Bay Towers", unitCount: 305 }
    ],
    lastActivity: "2025-01-25T14:15:00Z",
    createdAt: "2024-09-10T10:30:00Z",
    loginCount: 203,
    ticketsResolved: 134,
    recentActivities: [
      {
        id: 5,
        action: "Processed maintenance request",
        society: "Oakwood Heights",
        timestamp: "2025-01-25T14:15:00Z",
        type: "resolution"
      },
      {
        id: 6,
        action: "Updated resident information",
        society: "Marina Bay Towers",
        timestamp: "2025-01-25T11:30:00Z",
        type: "update"
      }
    ]
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@platform.com",
    phone: "+1 (555) 345-6789",
    status: "inactive",
    assignedSocieties: [
      { id: 6, name: "Hillside Gardens", unitCount: 190 }
    ],
    lastActivity: "2025-01-20T07:50:00Z",
    createdAt: "2024-07-22T15:45:00Z",
    loginCount: 87,
    ticketsResolved: 45,
    recentActivities: [
      {
        id: 7,
        action: "Approved society event",
        society: "Hillside Gardens",
        timestamp: "2025-01-20T07:50:00Z",
        type: "approval"
      }
    ]
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@platform.com",
    phone: "+1 (555) 456-7890",
    status: "pending",
    assignedSocieties: [
      { id: 7, name: "Riverside Commons", unitCount: 280 },
      { id: 8, name: "Century Plaza", unitCount: 100 }
    ],
    lastActivity: "Never",
    createdAt: "2025-01-20T12:00:00Z",
    loginCount: 0,
    ticketsResolved: 0,
    recentActivities: []
  },
  {
    id: 5,
    name: "Lisa Thompson",
    email: "lisa.thompson@platform.com",
    phone: "+1 (555) 567-8901",
    status: "active",
    assignedSocieties: [
      { id: 9, name: "Golden Gate Residency", unitCount: 520 },
      { id: 10, name: "Harbor View Apartments", unitCount: 180 },
      { id: 11, name: "Maple Ridge Society", unitCount: 120 }
    ],
    lastActivity: "2025-01-25T09:45:00Z",
    createdAt: "2024-06-03T11:15:00Z",
    loginCount: 298,
    ticketsResolved: 187,
    recentActivities: [
      {
        id: 8,
        action: "Assigned new society",
        society: "Maple Ridge Society",
        timestamp: "2025-01-25T09:45:00Z",
        type: "assignment"
      },
      {
        id: 9,
        action: "Resolved billing inquiry",
        society: "Harbor View Apartments",
        timestamp: "2025-01-25T08:30:00Z",
        type: "resolution"
      }
    ]
  },
  {
    id: 6,
    name: "James Wilson",
    email: "james.wilson@platform.com",
    phone: "+1 (555) 678-9012",
    status: "active",
    assignedSocieties: [
      { id: 12, name: "Westfield Towers", unitCount: 350 }
    ],
    lastActivity: "2025-01-24T16:20:00Z",
    createdAt: "2024-10-15T14:30:00Z",
    loginCount: 142,
    ticketsResolved: 78,
    recentActivities: [
      {
        id: 10,
        action: "Updated security protocols",
        society: "Westfield Towers",
        timestamp: "2025-01-24T16:20:00Z",
        type: "update"
      }
    ]
  },
  {
    id: 7,
    name: "Maria Garcia",
    email: "maria.garcia@platform.com",
    phone: "+1 (555) 789-0123",
    status: "inactive",
    assignedSocieties: [
      { id: 13, name: "Lakeside Villas", unitCount: 95 }
    ],
    lastActivity: "2025-01-18T13:15:00Z",
    createdAt: "2024-05-20T09:45:00Z",
    loginCount: 76,
    ticketsResolved: 32,
    recentActivities: [
      {
        id: 11,
        action: "Processed visitor registration",
        society: "Lakeside Villas",
        timestamp: "2025-01-18T13:15:00Z",
        type: "approval"
      }
    ]
  },
  {
    id: 8,
    name: "Robert Taylor",
    email: "robert.taylor@platform.com",
    phone: "+1 (555) 890-1234",
    status: "pending",
    assignedSocieties: [],
    lastActivity: "Never",
    createdAt: "2025-01-22T16:00:00Z",
    loginCount: 0,
    ticketsResolved: 0,
    recentActivities: []
  }
];

export const allSocieties = [
  { id: 1, name: "Green Valley Residency", unitCount: 245 },
  { id: 2, name: "Sunshine Apartments", unitCount: 180 },
  { id: 3, name: "Palm Grove Society", unitCount: 320 },
  { id: 4, name: "Oakwood Heights", unitCount: 425 },
  { id: 5, name: "Marina Bay Towers", unitCount: 305 },
  { id: 6, name: "Hillside Gardens", unitCount: 190 },
  { id: 7, name: "Riverside Commons", unitCount: 280 },
  { id: 8, name: "Century Plaza", unitCount: 100 },
  { id: 9, name: "Golden Gate Residency", unitCount: 520 },
  { id: 10, name: "Harbor View Apartments", unitCount: 180 },
  { id: 11, name: "Maple Ridge Society", unitCount: 120 },
  { id: 12, name: "Westfield Towers", unitCount: 350 },
  { id: 13, name: "Lakeside Villas", unitCount: 95 }
];