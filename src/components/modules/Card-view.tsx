import {
    Eye,
    Edit,
    Trash2,
    MoreHorizontal,
    Building2,
    Clock,
    ShieldCheck,
    ShieldBan
} from "lucide-react"
import { Button } from "../ui/Button"
import { Badge } from "../ui/Badge"
import {
  Avatar,
  AvatarFallback
} from "../ui/Avatar"
import { Card, CardContent } from "../ui/Card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../ui/Dropdown-menu"
import { Checkbox } from "../ui/Checkbox"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../ui/Tooltip"

import type { Admin } from "../../types/admin"
import { formatDistanceToNow } from "date-fns"

interface AdminCardViewProps {
  admin: Admin
  isSelected: boolean
  onSelect: (checked: boolean) => void
  onView: () => void
  onEdit: () => void
  onDelete: () => void
  onToggleStatus: () => void
}

export function CardView({
  admin,
  isSelected,
  onSelect,
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
}: AdminCardViewProps) {
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

  const getStatusDot = (status: string) => {
    const colors = {
      active: "bg-green-500",
      inactive: "bg-red-500",
      pending: "bg-orange-500",
    }
    return colors[status as keyof typeof colors] || colors.pending
  }

  return (
    <Card className={`transition-all hover:shadow-md ${isSelected ? "ring-2 ring-blue-500 bg-blue-50" : ""}`}>
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <Checkbox checked={isSelected} onCheckedChange={onSelect} className="flex-shrink-0" />
            <Avatar className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
              <AvatarFallback className="bg-blue-100 text-blue-600 font-medium text-sm sm:text-base">
                {getInitials(admin.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate">{admin.name}</h3>
              <p className="text-xs sm:text-sm text-gray-500 truncate">{admin.email}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex-shrink-0">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onView}>
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Admin
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onToggleStatus}>
                {admin.status === "active" ? (
                  <>
                    <ShieldBan className="w-4 h-4 mr-2" />
                    Disable
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    Enable
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3">
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${getStatusDot(admin.status)}`} />
            <Badge variant="outline" className={`${getStatusBadge(admin.status)} text-xs`}>
              {admin.status.charAt(0).toUpperCase() + admin.status.slice(1)}
            </Badge>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-xs sm:text-sm text-gray-900">{admin.loginCount} logins</div>
            <div className="text-xs text-gray-500">{admin.ticketsResolved} tickets resolved</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
          <div className="flex-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    <div className="flex items-center text-xs sm:text-sm text-gray-900 mb-1">
                      <Building2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                      <span>{admin.assignedSocieties.length} societies</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {admin.assignedSocieties.reduce((sum, society) => sum + society.unitCount, 0)} total units
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <div className="space-y-2">
                    <div className="font-medium text-sm">Assigned Societies:</div>
                    {admin.assignedSocieties.length > 0 ? (
                      admin.assignedSocieties.map((society) => (
                        <div key={society.id} className="flex justify-between items-center text-xs">
                          <span className="font-medium">{society.name}</span>
                          <span className="text-gray-500">{society.unitCount} units</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-gray-500">No societies assigned</div>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="text-left sm:text-right flex-1 sm:flex-none">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    <div className="flex items-center sm:justify-end text-xs sm:text-sm text-gray-900 mb-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                      <span className="truncate">
                        {admin.lastActivity === "Never"
                          ? "Never"
                          : formatDistanceToNow(new Date(admin.lastActivity), { addSuffix: true })}
                      </span>
                    </div>
                    {admin.lastActivity !== "Never" && (
                      <div className="text-xs text-gray-500 sm:text-right">{new Date(admin.lastActivity).toLocaleDateString()}</div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <div className="text-sm">
                    {admin.lastActivity === "Never" ? (
                      <span>No activity recorded</span>
                    ) : (
                      <div className="space-y-1">
                        <div className="font-medium">Last Activity:</div>
                        <div>{new Date(admin.lastActivity).toLocaleString()}</div>
                        <div className="text-xs text-gray-400">
                          {formatDistanceToNow(new Date(admin.lastActivity), { addSuffix: true })}
                        </div>
                      </div>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
