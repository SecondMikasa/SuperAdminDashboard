import {
  ArrowLeft,
  Edit,
  UserX,
  Phone,
  Calendar,
  Clock,
  TrendingUp,
  CheckCircle,
  Building2,
  MoreHorizontal,
} from 'lucide-react';

import type { Admin } from '../types/admin';

import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from './ui/Card';
import {
  Avatar,
  AvatarFallback
} from "./ui/Avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./ui/Dropdown-menu"

import { format } from "date-fns"

interface AdminDetailViewProps {
  admin: Admin
  onBack: () => void
  onEdit: (admin: Admin) => void
  onToggleStatus: (admin: Admin) => void
}

export function AdminDetailView({ admin, onBack, onEdit, onToggleStatus }: AdminDetailViewProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800 border-green-200",
      inactive: "bg-red-100 text-red-800 border-red-200",
      pending: "bg-orange-100 text-orange-800 border-orange-200",
    }
    return variants[status as keyof typeof variants] || variants.pending
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "approval":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "update":
        return <Edit className="w-4 h-4 text-blue-500" />
      case "maintenance":
        return <Building2 className="w-4 h-4 text-orange-500" />
      default:
        return <CheckCircle className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="flex-1 p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <Card className="mb-4 sm:mb-6">
        <div className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="flex flex-col items-center sm:flex-row sm:items-center text-center sm:text-left">
              <Button variant="glass" onClick={onBack} className="mb-2 sm:mb-0 sm:mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
              </Button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">Platform Admin Details</h1>
                <p className="text-gray-600 text-sm sm:text-base mt-0.5">Comprehensive view of admin profile and activities</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <Button onClick={() => onEdit(admin)} variant="primary">
                <Edit className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Edit Admin</span>
                <span className="sm:hidden">Edit</span>
              </Button>
              <Button
                onClick={() => onToggleStatus(admin)}
                variant={admin.status === "active" ? "error" : "success"}
              >
                <UserX className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">
                  {admin.status === "active" ? "Disable" : "Enable"}
                </span>
                <span className="sm:hidden">
                  {admin.status === "active" ? "Disable" : "Enable"}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </Card>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Profile Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4 sm:p-6 text-center">
              <Avatar className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4">
                <AvatarFallback className="bg-blue-100 text-blue-600 text-lg sm:text-xl lg:text-2xl font-bold">
                  {getInitials(admin.name)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{admin.name}</h2>
              <p className="text-gray-600 mb-3 text-sm sm:text-base break-all">{admin.email}</p>
              <Badge variant="outline" className={getStatusBadge(admin.status)}>
                {admin.status.charAt(0).toUpperCase() + admin.status.slice(1)}
              </Badge>

              <div className="mt-4 sm:mt-6 space-y-3 text-left">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-3 flex-shrink-0" />
                  <span className="break-all">{admin.phone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-3 flex-shrink-0" />
                  <span>Joined {format(new Date(admin.createdAt), "MMM dd, yyyy")}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-3 flex-shrink-0" />
                  <span>Last active{" "}
                    {admin.lastActivity === "Never" ? "Never" : format(new Date(admin.lastActivity), "MMM dd, yyyy")}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="mt-4 sm:mt-6">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between p-2 sm:p-3 bg-green-50 rounded-lg">
                <div className="flex items-center min-w-0 flex-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  </div>
                  <div className="ml-2 sm:ml-3 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Total Logins</p>
                    <p className="text-xs text-gray-500">All time</p>
                  </div>
                </div>
                <div className="text-lg sm:text-2xl font-bold text-green-600 flex-shrink-0">{admin.loginCount}</div>
              </div>

              <div className="flex items-center justify-between p-2 sm:p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center min-w-0 flex-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div className="ml-2 sm:ml-3 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Tickets Resolved</p>
                    <p className="text-xs text-gray-500">This month</p>
                  </div>
                </div>
                <div className="text-lg sm:text-2xl font-bold text-blue-600 flex-shrink-0">{admin.ticketsResolved}</div>
              </div>

              <div className="flex items-center justify-between p-2 sm:p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center min-w-0 flex-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  </div>
                  <div className="ml-2 sm:ml-3 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Societies Managed</p>
                    <p className="text-xs text-gray-500">Currently assigned</p>
                  </div>
                </div>
                <div className="text-lg sm:text-2xl font-bold text-purple-600 flex-shrink-0">{admin.assignedSocieties.length}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Assigned Societies */}
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <CardTitle className="text-base sm:text-lg">Assigned Societies</CardTitle>
              <Button variant="outline" size="sm" className="self-start sm:self-auto">
                <span className="hidden sm:inline">Manage Assignments</span>
                <span className="sm:hidden">Manage</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {admin.assignedSocieties.map((society) => (
                  <div key={society.id} className="p-3 sm:p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center min-w-0 flex-1">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                        </div>
                        <div className="ml-2 sm:ml-3 min-w-0">
                          <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate">{society.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-500">{society.unitCount} units</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="glass" size="sm" className="flex-shrink-0">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Society</DropdownMenuItem>
                          <DropdownMenuItem>Remove Assignment</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <CardTitle className="text-base sm:text-lg">Recent Activities</CardTitle>
              <Button variant="outline" size="sm" className="self-start sm:self-auto">
                <span className="hidden sm:inline">View All Activities</span>
                <span className="sm:hidden">View All</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {admin.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 break-words">{activity.action}</p>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">{activity.society}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {format(new Date(activity.timestamp), "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                ))}
                {admin.recentActivities.length === 0 && (
                  <div className="text-center py-6 sm:py-8 text-gray-500">
                    <p className="text-sm sm:text-base">No recent activities found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
