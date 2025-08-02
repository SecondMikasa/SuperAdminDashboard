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
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Platform Admin Details</h1>
            <p className="text-gray-600 mt-1">Comprehensive view of admin profile and activities</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button onClick={() => onEdit(admin)} className="bg-blue-600 hover:bg-blue-700">
            <Edit className="w-4 h-4 mr-2" />
            Edit Admin
          </Button>
          <Button variant="destructive" onClick={() => onToggleStatus(admin)} className="bg-red-600 hover:bg-red-700">
            <UserX className="w-4 h-4 mr-2" />
            {admin.status === "active" ? "Disable" : "Enable"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl font-bold">
                  {getInitials(admin.name)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{admin.name}</h2>
              <p className="text-gray-600 mb-3">{admin.email}</p>
              <Badge variant="outline" className={getStatusBadge(admin.status)}>
                {admin.status.charAt(0).toUpperCase() + admin.status.slice(1)}
              </Badge>

              <div className="mt-6 space-y-3 text-left">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-3" />
                  {admin.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-3" />
                  Joined {format(new Date(admin.createdAt), "MMM dd, yyyy")}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-3" />
                  Last active{" "}
                  {admin.lastActivity === "Never" ? "Never" : format(new Date(admin.lastActivity), "MMM dd, yyyy")}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">Total Logins</p>
                    <p className="text-sm text-gray-500">All time</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600">{admin.loginCount}</div>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">Tickets Resolved</p>
                    <p className="text-sm text-gray-500">This month</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600">{admin.ticketsResolved}</div>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">Societies Managed</p>
                    <p className="text-sm text-gray-500">Currently assigned</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-purple-600">{admin.assignedSocieties.length}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Assigned Societies */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Assigned Societies</CardTitle>
              <Button variant="outline" size="sm">
                Manage Assignments
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {admin.assignedSocieties.map((society) => (
                  <div key={society.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h3 className="font-medium text-gray-900">{society.name}</h3>
                          <p className="text-sm text-gray-500">{society.unitCount} units</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
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
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Activities</CardTitle>
              <Button variant="outline" size="sm">
                View All Activities
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {admin.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.society}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {format(new Date(activity.timestamp), "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                ))}
                {admin.recentActivities.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No recent activities found</p>
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
