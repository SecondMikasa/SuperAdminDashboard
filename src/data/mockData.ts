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
      { id: 2, name: "Sunshine Apartments", unitCount: 180 }
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
        society: "Green Valley Residency",
        timestamp: "2025-01-24T16:45:00Z",
        type: "resolution"
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
      { id: 3, name: "Oakwood Heights", unitCount: 425 },
      { id: 4, name: "Marina Bay Towers", unitCount: 305 },
      { id: 5, name: "Crystal Gardens", unitCount: 198 }
    ],
    lastActivity: "2025-01-25T14:15:00Z",
    createdAt: "2024-09-10T10:30:00Z",
    loginCount: 203,
    ticketsResolved: 134,
    recentActivities: [
      {
        id: 4,
        action: "Processed maintenance request",
        society: "Oakwood Heights",
        timestamp: "2025-01-25T14:15:00Z",
        type: "resolution"
      },
      {
        id: 5,
        action: "Updated resident information",
        society: "Marina Bay Towers",
        timestamp: "2025-01-25T11:30:00Z",
        type: "update"
      },
      {
        id: 6,
        action: "Created community event",
        society: "Crystal Gardens",
        timestamp: "2025-01-24T09:20:00Z",
        type: "creation"
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
      },
      {
        id: 8,
        action: "Updated parking allocation",
        society: "Hillside Gardens",
        timestamp: "2025-01-19T14:30:00Z",
        type: "update"
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
      { id: 10, name: "Harbor View Apartments", unitCount: 180 }
    ],
    lastActivity: "2025-01-25T09:45:00Z",
    createdAt: "2024-06-03T11:15:00Z",
    loginCount: 298,
    ticketsResolved: 187,
    recentActivities: [
      {
        id: 9,
        action: "Resolved billing inquiry",
        society: "Harbor View Apartments",
        timestamp: "2025-01-25T09:45:00Z",
        type: "resolution"
      },
      {
        id: 10,
        action: "Approved new resident",
        society: "Golden Gate Residency",
        timestamp: "2025-01-25T08:30:00Z",
        type: "approval"
      },
      {
        id: 11,
        action: "Updated facility booking",
        society: "Harbor View Apartments",
        timestamp: "2025-01-24T15:20:00Z",
        type: "update"
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
      { id: 11, name: "Westfield Towers", unitCount: 350 },
      { id: 12, name: "Pine Valley Estate", unitCount: 275 }
    ],
    lastActivity: "2025-01-24T16:20:00Z",
    createdAt: "2024-10-15T14:30:00Z",
    loginCount: 142,
    ticketsResolved: 78,
    recentActivities: [
      {
        id: 12,
        action: "Updated security protocols",
        society: "Westfield Towers",
        timestamp: "2025-01-24T16:20:00Z",
        type: "update"
      },
      {
        id: 13,
        action: "Processed visitor pass",
        society: "Pine Valley Estate",
        timestamp: "2025-01-24T13:45:00Z",
        type: "approval"
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
        id: 14,
        action: "Processed visitor registration",
        society: "Lakeside Villas",
        timestamp: "2025-01-18T13:15:00Z",
        type: "approval"
      }
    ]
  },
  {
    id: 8,
    name: "Alex Thompson",
    email: "alex.thompson@platform.com",
    phone: "+1 (555) 890-1234",
    status: "active",
    assignedSocieties: [
      { id: 14, name: "Skyline Apartments", unitCount: 380 },
      { id: 15, name: "Garden Court Society", unitCount: 165 }
    ],
    lastActivity: "2025-01-25T11:20:00Z",
    createdAt: "2024-11-08T16:00:00Z",
    loginCount: 89,
    ticketsResolved: 56,
    recentActivities: [
      {
        id: 15,
        action: "Resolved noise complaint",
        society: "Skyline Apartments",
        timestamp: "2025-01-25T11:20:00Z",
        type: "resolution"
      },
      {
        id: 16,
        action: "Updated maintenance schedule",
        society: "Garden Court Society",
        timestamp: "2025-01-24T10:15:00Z",
        type: "update"
      },
      {
        id: 17,
        action: "Approved society meeting",
        society: "Skyline Apartments",
        timestamp: "2025-01-23T16:30:00Z",
        type: "approval"
      }
    ]
  },
  {
    id: 9,
    name: "Rachel Martinez",
    email: "rachel.martinez@platform.com",
    phone: "+1 (555) 901-2345",
    status: "active",
    assignedSocieties: [
      { id: 16, name: "Sunset Heights", unitCount: 290 },
      { id: 17, name: "Meadowbrook Estates", unitCount: 220 }
    ],
    lastActivity: "2025-01-25T15:45:00Z",
    createdAt: "2024-12-01T08:30:00Z",
    loginCount: 67,
    ticketsResolved: 42,
    recentActivities: [
      {
        id: 26,
        action: "Approved maintenance budget",
        society: "Sunset Heights",
        timestamp: "2025-01-25T15:45:00Z",
        type: "approval"
      },
      {
        id: 27,
        action: "Updated resident contact info",
        society: "Meadowbrook Estates",
        timestamp: "2025-01-25T12:20:00Z",
        type: "update"
      }
    ]
  },
  {
    id: 10,
    name: "Kevin O'Connor",
    email: "kevin.oconnor@platform.com",
    phone: "+1 (555) 012-3456",
    status: "inactive",
    assignedSocieties: [
      { id: 18, name: "Riverside Park", unitCount: 155 }
    ],
    lastActivity: "2025-01-15T09:30:00Z",
    createdAt: "2024-04-18T14:20:00Z",
    loginCount: 124,
    ticketsResolved: 67,
    recentActivities: [
      {
        id: 28,
        action: "Processed lease renewal",
        society: "Riverside Park",
        timestamp: "2025-01-15T09:30:00Z",
        type: "approval"
      }
    ]
  },
  {
    id: 11,
    name: "Amanda Foster",
    email: "amanda.foster@platform.com",
    phone: "+1 (555) 123-4567",
    status: "pending",
    assignedSocieties: [
      { id: 19, name: "Willowbrook Commons", unitCount: 340 }
    ],
    lastActivity: "Never",
    createdAt: "2025-01-23T10:15:00Z",
    loginCount: 0,
    ticketsResolved: 0,
    recentActivities: []
  },
  {
    id: 12,
    name: "Daniel Park",
    email: "daniel.park@platform.com",
    phone: "+1 (555) 234-5678",
    status: "active",
    assignedSocieties: [
      { id: 20, name: "Northgate Towers", unitCount: 480 },
      { id: 21, name: "Elmwood Gardens", unitCount: 195 },
      { id: 22, name: "Brookside Village", unitCount: 125 }
    ],
    lastActivity: "2025-01-25T13:10:00Z",
    createdAt: "2024-03-12T11:45:00Z",
    loginCount: 312,
    ticketsResolved: 198,
    recentActivities: [
      {
        id: 29,
        action: "Resolved water leak complaint",
        society: "Northgate Towers",
        timestamp: "2025-01-25T13:10:00Z",
        type: "resolution"
      },
      {
        id: 30,
        action: "Updated parking rules",
        society: "Elmwood Gardens",
        timestamp: "2025-01-24T16:30:00Z",
        type: "update"
      },
      {
        id: 31,
        action: "Approved community garden project",
        society: "Brookside Village",
        timestamp: "2025-01-24T11:15:00Z",
        type: "approval"
      }
    ]
  },
  {
    id: 13,
    name: "Sophie Williams",
    email: "sophie.williams@platform.com",
    phone: "+1 (555) 345-6789",
    status: "active",
    assignedSocieties: [
      { id: 23, name: "Oceanview Residences", unitCount: 365 }
    ],
    lastActivity: "2025-01-25T08:45:00Z",
    createdAt: "2024-09-25T13:20:00Z",
    loginCount: 145,
    ticketsResolved: 89,
    recentActivities: [
      {
        id: 32,
        action: "Updated security system",
        society: "Oceanview Residences",
        timestamp: "2025-01-25T08:45:00Z",
        type: "update"
      },
      {
        id: 33,
        action: "Processed guest registration",
        society: "Oceanview Residences",
        timestamp: "2025-01-24T14:20:00Z",
        type: "approval"
      }
    ]
  },
  {
    id: 14,
    name: "Robert Davis",
    email: "robert.davis@platform.com",
    phone: "+1 (555) 456-7890",
    status: "inactive",
    assignedSocieties: [
      { id: 24, name: "Highland Park", unitCount: 210 },
      { id: 25, name: "Valley View Apartments", unitCount: 175 }
    ],
    lastActivity: "2025-01-12T16:20:00Z",
    createdAt: "2024-02-08T09:30:00Z",
    loginCount: 198,
    ticketsResolved: 112,
    recentActivities: [
      {
        id: 34,
        action: "Approved facility maintenance",
        society: "Highland Park",
        timestamp: "2025-01-12T16:20:00Z",
        type: "approval"
      },
      {
        id: 35,
        action: "Updated tenant information",
        society: "Valley View Apartments",
        timestamp: "2025-01-12T10:45:00Z",
        type: "update"
      }
    ]
  },
  {
    id: 15,
    name: "Jennifer Lee",
    email: "jennifer.lee@platform.com",
    phone: "+1 (555) 567-8901",
    status: "active",
    assignedSocieties: [
      { id: 26, name: "Springdale Heights", unitCount: 285 },
      { id: 27, name: "Maplewood Court", unitCount: 140 }
    ],
    lastActivity: "2025-01-25T17:30:00Z",
    createdAt: "2024-07-14T15:10:00Z",
    loginCount: 176,
    ticketsResolved: 94,
    recentActivities: [
      {
        id: 36,
        action: "Resolved heating issue",
        society: "Springdale Heights",
        timestamp: "2025-01-25T17:30:00Z",
        type: "resolution"
      },
      {
        id: 37,
        action: "Created monthly newsletter",
        society: "Maplewood Court",
        timestamp: "2025-01-25T14:15:00Z",
        type: "creation"
      }
    ]
  },
  {
    id: 16,
    name: "Thomas Anderson",
    email: "thomas.anderson@platform.com",
    phone: "+1 (555) 678-9012",
    status: "pending",
    assignedSocieties: [],
    lastActivity: "Never",
    createdAt: "2025-01-24T12:00:00Z",
    loginCount: 0,
    ticketsResolved: 0,
    recentActivities: []
  },
  {
    id: 17,
    name: "Nicole Brown",
    email: "nicole.brown@platform.com",
    phone: "+1 (555) 789-0123",
    status: "active",
    assignedSocieties: [
      { id: 28, name: "Crescent Bay Towers", unitCount: 420 },
      { id: 29, name: "Fairfield Gardens", unitCount: 230 }
    ],
    lastActivity: "2025-01-25T12:50:00Z",
    createdAt: "2024-01-30T10:45:00Z",
    loginCount: 267,
    ticketsResolved: 156,
    recentActivities: [
      {
        id: 38,
        action: "Updated fire safety protocols",
        society: "Crescent Bay Towers",
        timestamp: "2025-01-25T12:50:00Z",
        type: "update"
      },
      {
        id: 39,
        action: "Approved pool maintenance",
        society: "Fairfield Gardens",
        timestamp: "2025-01-24T09:30:00Z",
        type: "approval"
      }
    ]
  },
  {
    id: 18,
    name: "Christopher Taylor",
    email: "christopher.taylor@platform.com",
    phone: "+1 (555) 890-1234",
    status: "active",
    assignedSocieties: [
      { id: 30, name: "Grandview Estates", unitCount: 315 }
    ],
    lastActivity: "2025-01-25T16:15:00Z",
    createdAt: "2024-06-20T14:30:00Z",
    loginCount: 134,
    ticketsResolved: 78,
    recentActivities: [
      {
        id: 40,
        action: "Processed move-in request",
        society: "Grandview Estates",
        timestamp: "2025-01-25T16:15:00Z",
        type: "approval"
      },
      {
        id: 41,
        action: "Updated landscaping schedule",
        society: "Grandview Estates",
        timestamp: "2025-01-24T13:45:00Z",
        type: "update"
      }
    ]
  }
];

export const mockSocieties = [
  { id: 1, name: "Green Valley Residency", unitCount: 245 },
  { id: 2, name: "Sunshine Apartments", unitCount: 180 },
  { id: 3, name: "Oakwood Heights", unitCount: 425 },
  { id: 4, name: "Marina Bay Towers", unitCount: 305 },
  { id: 5, name: "Crystal Gardens", unitCount: 198 },
  { id: 6, name: "Hillside Gardens", unitCount: 190 },
  { id: 7, name: "Riverside Commons", unitCount: 280 },
  { id: 8, name: "Century Plaza", unitCount: 100 },
  { id: 9, name: "Golden Gate Residency", unitCount: 520 },
  { id: 10, name: "Harbor View Apartments", unitCount: 180 },
  { id: 11, name: "Westfield Towers", unitCount: 350 },
  { id: 12, name: "Pine Valley Estate", unitCount: 275 },
  { id: 13, name: "Lakeside Villas", unitCount: 95 },
  { id: 14, name: "Skyline Apartments", unitCount: 380 },
  { id: 15, name: "Garden Court Society", unitCount: 165 },
  { id: 16, name: "Sunset Heights", unitCount: 290 },
  { id: 17, name: "Meadowbrook Estates", unitCount: 220 },
  { id: 18, name: "Riverside Park", unitCount: 155 },
  { id: 19, name: "Willowbrook Commons", unitCount: 340 },
  { id: 20, name: "Northgate Towers", unitCount: 480 },
  { id: 21, name: "Elmwood Gardens", unitCount: 195 },
  { id: 22, name: "Brookside Village", unitCount: 125 },
  { id: 23, name: "Oceanview Residences", unitCount: 365 },
  { id: 24, name: "Highland Park", unitCount: 210 },
  { id: 25, name: "Valley View Apartments", unitCount: 175 },
  { id: 26, name: "Springdale Heights", unitCount: 285 },
  { id: 27, name: "Maplewood Court", unitCount: 140 },
  { id: 28, name: "Crescent Bay Towers", unitCount: 420 },
  { id: 29, name: "Fairfield Gardens", unitCount: 230 },
  { id: 30, name: "Grandview Estates", unitCount: 315 }
];

// All recent activities across the platform (20+ activities)
export const allRecentActivities = [
  {
    id: 1,
    action: "Approved resident registration",
    society: "Green Valley Residency",
    timestamp: "2025-01-25T10:30:00Z",
    type: "approval",
    adminName: "Sarah Johnson"
  },
  {
    id: 2,
    action: "Updated unit status",
    society: "Sunshine Apartments",
    timestamp: "2025-01-25T08:15:00Z",
    type: "update",
    adminName: "Sarah Johnson"
  },
  {
    id: 3,
    action: "Resolved maintenance complaint",
    society: "Green Valley Residency",
    timestamp: "2025-01-24T16:45:00Z",
    type: "resolution",
    adminName: "Sarah Johnson"
  },
  {
    id: 4,
    action: "Processed maintenance request",
    society: "Oakwood Heights",
    timestamp: "2025-01-25T14:15:00Z",
    type: "resolution",
    adminName: "Michael Chen"
  },
  {
    id: 5,
    action: "Updated resident information",
    society: "Marina Bay Towers",
    timestamp: "2025-01-25T11:30:00Z",
    type: "update",
    adminName: "Michael Chen"
  },
  {
    id: 6,
    action: "Created community event",
    society: "Crystal Gardens",
    timestamp: "2025-01-24T09:20:00Z",
    type: "creation",
    adminName: "Michael Chen"
  },
  {
    id: 7,
    action: "Approved society event",
    society: "Hillside Gardens",
    timestamp: "2025-01-20T07:50:00Z",
    type: "approval",
    adminName: "Emily Rodriguez"
  },
  {
    id: 8,
    action: "Updated parking allocation",
    society: "Hillside Gardens",
    timestamp: "2025-01-19T14:30:00Z",
    type: "update",
    adminName: "Emily Rodriguez"
  },
  {
    id: 9,
    action: "Resolved billing inquiry",
    society: "Harbor View Apartments",
    timestamp: "2025-01-25T09:45:00Z",
    type: "resolution",
    adminName: "Lisa Thompson"
  },
  {
    id: 10,
    action: "Approved new resident",
    society: "Golden Gate Residency",
    timestamp: "2025-01-25T08:30:00Z",
    type: "approval",
    adminName: "Lisa Thompson"
  },
  {
    id: 11,
    action: "Updated facility booking",
    society: "Harbor View Apartments",
    timestamp: "2025-01-24T15:20:00Z",
    type: "update",
    adminName: "Lisa Thompson"
  },
  {
    id: 12,
    action: "Updated security protocols",
    society: "Westfield Towers",
    timestamp: "2025-01-24T16:20:00Z",
    type: "update",
    adminName: "James Wilson"
  },
  {
    id: 13,
    action: "Processed visitor pass",
    society: "Pine Valley Estate",
    timestamp: "2025-01-24T13:45:00Z",
    type: "approval",
    adminName: "James Wilson"
  },
  {
    id: 14,
    action: "Processed visitor registration",
    society: "Lakeside Villas",
    timestamp: "2025-01-18T13:15:00Z",
    type: "approval",
    adminName: "Maria Garcia"
  },
  {
    id: 15,
    action: "Resolved noise complaint",
    society: "Skyline Apartments",
    timestamp: "2025-01-25T11:20:00Z",
    type: "resolution",
    adminName: "Alex Thompson"
  },
  {
    id: 16,
    action: "Updated maintenance schedule",
    society: "Garden Court Society",
    timestamp: "2025-01-24T10:15:00Z",
    type: "update",
    adminName: "Alex Thompson"
  },
  {
    id: 17,
    action: "Approved society meeting",
    society: "Skyline Apartments",
    timestamp: "2025-01-23T16:30:00Z",
    type: "approval",
    adminName: "Alex Thompson"
  },
  {
    id: 18,
    action: "Created maintenance ticket",
    society: "Green Valley Residency",
    timestamp: "2025-01-23T14:20:00Z",
    type: "creation",
    adminName: "Sarah Johnson"
  },
  {
    id: 19,
    action: "Updated society bylaws",
    society: "Marina Bay Towers",
    timestamp: "2025-01-23T11:45:00Z",
    type: "update",
    adminName: "Michael Chen"
  },
  {
    id: 20,
    action: "Approved budget proposal",
    society: "Golden Gate Residency",
    timestamp: "2025-01-22T16:10:00Z",
    type: "approval",
    adminName: "Lisa Thompson"
  },
  {
    id: 21,
    action: "Resolved parking dispute",
    society: "Westfield Towers",
    timestamp: "2025-01-22T13:30:00Z",
    type: "resolution",
    adminName: "James Wilson"
  },
  {
    id: 22,
    action: "Updated emergency contacts",
    society: "Skyline Apartments",
    timestamp: "2025-01-22T09:15:00Z",
    type: "update",
    adminName: "Alex Thompson"
  },
  {
    id: 23,
    action: "Processed society registration",
    society: "Garden Court Society",
    timestamp: "2025-01-21T15:40:00Z",
    type: "approval",
    adminName: "Alex Thompson"
  },
  {
    id: 24,
    action: "Created announcement",
    society: "Sunshine Apartments",
    timestamp: "2025-01-21T12:25:00Z",
    type: "creation",
    adminName: "Sarah Johnson"
  },
  {
    id: 25,
    action: "Updated resident directory",
    society: "Crystal Gardens",
    timestamp: "2025-01-21T10:50:00Z",
    type: "update",
    adminName: "Michael Chen"
  },
  {
    id: 26,
    action: "Approved maintenance budget",
    society: "Sunset Heights",
    timestamp: "2025-01-25T15:45:00Z",
    type: "approval",
    adminName: "Rachel Martinez"
  },
  {
    id: 27,
    action: "Updated resident contact info",
    society: "Meadowbrook Estates",
    timestamp: "2025-01-25T12:20:00Z",
    type: "update",
    adminName: "Rachel Martinez"
  },
  {
    id: 28,
    action: "Processed lease renewal",
    society: "Riverside Park",
    timestamp: "2025-01-15T09:30:00Z",
    type: "approval",
    adminName: "Kevin O'Connor"
  },
  {
    id: 29,
    action: "Resolved water leak complaint",
    society: "Northgate Towers",
    timestamp: "2025-01-25T13:10:00Z",
    type: "resolution",
    adminName: "Daniel Park"
  },
  {
    id: 30,
    action: "Updated parking rules",
    society: "Elmwood Gardens",
    timestamp: "2025-01-24T16:30:00Z",
    type: "update",
    adminName: "Daniel Park"
  },
  {
    id: 31,
    action: "Approved community garden project",
    society: "Brookside Village",
    timestamp: "2025-01-24T11:15:00Z",
    type: "approval",
    adminName: "Daniel Park"
  },
  {
    id: 32,
    action: "Updated security system",
    society: "Oceanview Residences",
    timestamp: "2025-01-25T08:45:00Z",
    type: "update",
    adminName: "Sophie Williams"
  },
  {
    id: 33,
    action: "Processed guest registration",
    society: "Oceanview Residences",
    timestamp: "2025-01-24T14:20:00Z",
    type: "approval",
    adminName: "Sophie Williams"
  },
  {
    id: 34,
    action: "Approved facility maintenance",
    society: "Highland Park",
    timestamp: "2025-01-12T16:20:00Z",
    type: "approval",
    adminName: "Robert Davis"
  },
  {
    id: 35,
    action: "Updated tenant information",
    society: "Valley View Apartments",
    timestamp: "2025-01-12T10:45:00Z",
    type: "update",
    adminName: "Robert Davis"
  },
  {
    id: 36,
    action: "Resolved heating issue",
    society: "Springdale Heights",
    timestamp: "2025-01-25T17:30:00Z",
    type: "resolution",
    adminName: "Jennifer Lee"
  },
  {
    id: 37,
    action: "Created monthly newsletter",
    society: "Maplewood Court",
    timestamp: "2025-01-25T14:15:00Z",
    type: "creation",
    adminName: "Jennifer Lee"
  },
  {
    id: 38,
    action: "Updated fire safety protocols",
    society: "Crescent Bay Towers",
    timestamp: "2025-01-25T12:50:00Z",
    type: "update",
    adminName: "Nicole Brown"
  },
  {
    id: 39,
    action: "Approved pool maintenance",
    society: "Fairfield Gardens",
    timestamp: "2025-01-24T09:30:00Z",
    type: "approval",
    adminName: "Nicole Brown"
  },
  {
    id: 40,
    action: "Processed move-in request",
    society: "Grandview Estates",
    timestamp: "2025-01-25T16:15:00Z",
    type: "approval",
    adminName: "Christopher Taylor"
  },
  {
    id: 41,
    action: "Updated landscaping schedule",
    society: "Grandview Estates",
    timestamp: "2025-01-24T13:45:00Z",
    type: "update",
    adminName: "Christopher Taylor"
  }
];

// Performance metrics for dashboard
export const performanceMetrics = {
  totalAdmins: 18,
  activeAdmins: 12,
  inactiveAdmins: 3,
  pendingAdmins: 3,
  totalSocieties: 30,
  totalUnits: 7543,
  totalActivities: 41,
  avgTicketsPerAdmin: 89,
  avgLoginsPerAdmin: 142
};