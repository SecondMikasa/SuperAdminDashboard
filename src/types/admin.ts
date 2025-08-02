export interface Society {
  id: number;
  name: string;
  unitCount: number;
}

export interface Activity {
  id: number;
  action: string;
  society: string;
  timestamp: string;
  type: 'approval' | 'update' | 'resolution' | 'creation' | 'assignment';
}

export interface Admin {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  assignedSocieties: Society[];
  lastActivity: string;
  createdAt: string;
  loginCount: number;
  ticketsResolved: number;
  recentActivities: Activity[];
  avatar?: string;
}

export type SortField = 'name' | 'lastActivity' | 'societyCount' | 'loginCount' | 'ticketsResolved';
export type SortDirection = 'asc' | 'desc';
export type StatusFilter = 'all' | 'active' | 'inactive' | 'pending';