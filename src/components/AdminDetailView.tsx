import React from 'react';

import {
  ArrowLeft,
  Phone,
  Calendar,
  Clock,
  TrendingUp,
  Users,
  CheckCircle2,
  Building2,
  Activity,
  Edit,
  Power
} from 'lucide-react';

import type { Admin } from '../types/admin';

import {
  formatRelativeTime,
  formatFullDateTime,
  formatDate
} from '../utils/formatters';

import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Avatar } from './ui/Avatar';
import { Card } from './ui/Card';

interface AdminDetailViewProps {
  admin: Admin;
  onBack: () => void;
  onEdit: (admin: Admin) => void;
}

export const AdminDetailView: React.FC<AdminDetailViewProps> = ({
  admin,
  onBack,
  onEdit
}) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'approval':
        return <CheckCircle2 className="w-4 h-4 text-[#10B981]" />;
      case 'update':
        return <Edit className="w-4 h-4 text-[#007AFF]" />;
      case 'resolution':
        return <CheckCircle2 className="w-4 h-4 text-[#6366F1]" />;
      case 'creation':
        return <Building2 className="w-4 h-4 text-[#F59E0B]" />;
      case 'assignment':
        return <Users className="w-4 h-4 text-[#6366F1]" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Button variant="ghost" onClick={onBack} className="mr-4">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Platform Admin Details</h1>
                <p className="text-gray-600 mt-1">Comprehensive view of admin profile and activities</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => onEdit(admin)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Admin
              </Button>
              <Button variant="danger">
                <Power className="w-4 h-4 mr-2" />
                Disable
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card className="p-8 text-center">
              <Avatar name={admin.name} size="xl" className="mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{admin.name}</h2>
              <p className="text-gray-600 mb-4">{admin.email}</p>
              <Badge variant={admin.status} className="mb-6">
                {admin.status.charAt(0).toUpperCase() + admin.status.slice(1)}
              </Badge>

              <div className="space-y-4 text-left">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-3" />
                  {admin.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-3" />
                  Joined {formatDate(admin.createdAt)}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-3" />
                  Last active {formatRelativeTime(admin.lastActivity)}
                </div>
              </div>
            </Card>

            {/* Performance Metrics */}
            <Card className="p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#10B981]/10 to-[#10B981]/20 rounded-xl border border-[#10B981]/20">
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-[#10B981] mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Total Logins</div>
                      <div className="text-sm text-gray-500">All time</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-[#10B981]">{admin.loginCount}</div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#007AFF]/10 to-[#007AFF]/20 rounded-xl border border-[#007AFF]/20">
                  <div className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-[#007AFF] mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Tickets Resolved</div>
                      <div className="text-sm text-gray-500">This month</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-[#007AFF]">{admin.ticketsResolved}</div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#6366F1]/10 to-[#6366F1]/20 rounded-xl border border-[#6366F1]/20">
                  <div className="flex items-center">
                    <Building2 className="w-5 h-5 text-[#6366F1] mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Societies Managed</div>
                      <div className="text-sm text-gray-500">Currently assigned</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-[#6366F1]">{admin.assignedSocieties.length}</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Assigned Societies */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Assigned Societies</h3>
                <Button variant="outline" size="sm">
                  Manage Assignments
                </Button>
              </div>

              {admin.assignedSocieties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {admin.assignedSocieties.map((society) => (
                    <div key={society.id} className="p-4 backdrop-blur-xl bg-white/50 rounded-xl hover:bg-white/70 transition-colors border border-white/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="p-2 bg-gradient-to-r from-[#007AFF] to-[#6366F1] rounded-lg mr-3 shadow-lg">
                            <Building2 className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{society.name}</div>
                            <div className="text-sm text-gray-600">{society.unitCount} units</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Activity className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Building2 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No societies assigned yet</p>
                </div>
              )}
            </Card>

            {/* Recent Activities */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                <Button variant="outline" size="sm">
                  View All Activities
                </Button>
              </div>

              {admin.recentActivities.length > 0 ? (
                <div className="space-y-4">
                  {admin.recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start p-4 backdrop-blur-xl bg-white/50 rounded-xl border border-white/30">
                      <div className="flex-shrink-0 mr-4 mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                            <p className="text-sm text-gray-600">{activity.society}</p>
                          </div>
                          <time 
                            className="text-xs text-gray-500 whitespace-nowrap ml-4"
                            title={formatFullDateTime(activity.timestamp)}
                          >
                            {formatRelativeTime(activity.timestamp)}
                          </time>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Activity className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No recent activities</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};