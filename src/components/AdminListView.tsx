import { useState, useMemo, useEffect } from "react"

import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  ShieldCheck,
  ShieldBan,
  ChevronDown,
  Users,
  Power,
  Activity,
  Building2
} from "lucide-react"

import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Badge } from "../components/ui/Badge"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/Select"
import { Checkbox } from "./ui/Checkbox"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../components/ui/Tooltip"
import { Card } from "./ui/Card"

import { CardView } from "./modules/Card-view"
import { BulkEditModal } from "./modules/Bulk-edit"

import type { Admin } from "../types/admin"

import { formatDistanceToNow } from "date-fns"

interface AdminListViewProps {
  admins: Admin[]
  onViewAdmin: (admin: Admin) => void
  onCreateAdmin: () => void
  onEditAdmin: (admin: Admin) => void
  onDeleteAdmin: (adminId: number) => void
  onBulkDeleteAdmins: (adminIds: number[]) => void
  onToggleStatus: (admin: Admin) => void
}

export function AdminListView({
  admins,
  onViewAdmin,
  onCreateAdmin,
  onEditAdmin,
  onDeleteAdmin,
  onBulkDeleteAdmins,
  onToggleStatus,
}: AdminListViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState<"name" | "lastActivity" | "societyCount">("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [selectedAdmins, setSelectedAdmins] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024) // Use lg breakpoint for better mobile experience
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)

    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  const filteredAndSortedAdmins = useMemo(() => {
    const filtered = admins.filter((admin) => {
      const matchesSearch =
        admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || admin.status === statusFilter
      return matchesSearch && matchesStatus
    })

    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case "name":
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case "lastActivity":
          aValue = new Date(a.lastActivity)
          bValue = new Date(b.lastActivity)
          break
        case "societyCount":
          aValue = a.assignedSocieties.length
          bValue = b.assignedSocieties.length
          break
        default:
          return 0
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1
      return 0
    })

    return filtered
  }, [admins, searchQuery, statusFilter, sortBy, sortOrder])

  const paginatedAdmins = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedAdmins.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedAdmins, currentPage])

  const totalPages = Math.ceil(filteredAndSortedAdmins.length / itemsPerPage)

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

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  const handleSelectAdmin = (adminId: number, checked: boolean) => {
    if (checked) {
      setSelectedAdmins((prev) => [...prev, adminId])
    } else {
      setSelectedAdmins((prev) => prev.filter((id) => id !== adminId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAdmins(paginatedAdmins.map((admin) => admin.id))
    } else {
      setSelectedAdmins([])
    }
  }

  const handleBulkDelete = () => {
    if (selectedAdmins.length === 0) return
    setShowDeleteConfirmation(true)
  }

  const confirmBulkDelete = () => {
    onBulkDeleteAdmins(selectedAdmins)
    setSelectedAdmins([])
    setShowBulkActions(false)
  }

  const handleBulkToggleStatus = (newStatus: "active" | "inactive") => {
    if (selectedAdmins.length === 0) return

    selectedAdmins.forEach((adminId) => {
      const admin = admins.find((a) => a.id === adminId)
      if (admin && admin.status !== newStatus) {
        onToggleStatus(admin)
      }
    })
    setSelectedAdmins([])
    setShowBulkActions(false)
  }

  useEffect(() => {
    setShowBulkActions(selectedAdmins.length > 0)
  }, [selectedAdmins])

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  // Statistics
  const activeCount = admins.filter((a) => a.status === "active").length
  const inactiveCount = admins.filter((a) => a.status === "inactive").length
  const pendingCount = admins.filter((a) => a.status === "pending").length
  const totalAssignments = admins.reduce((sum, admin) => sum + admin.assignedSocieties.length, 0)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedAdmins.length === 0) return

      if (event.key === "Delete" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        handleBulkDelete()
      }

      if (event.key === "Escape") {
        setSelectedAdmins([])
        setShowBulkActions(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedAdmins])

  return (
    <div className="flex-1 p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <Card className="my-0.5 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-0.5 sm:p-2 space-y-2 sm:space-y-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">Platform Admins Management</h1>
            <p className="text-gray-600 text-sm sm:text-base">Manage platform administrators and their society assignments</p>
          </div>
          <Button
            onClick={onCreateAdmin}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 self-start sm:self-auto px-6 py-2.5 text-base whitespace-nowrap flex-shrink-0"
          >
            <Plus className="w-5 h-5 mr-2.5 flex-shrink-0" />
            <span className="hidden sm:inline">Create New Admin</span>
            <span className="sm:hidden">Create</span>
          </Button>
        </div>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center">
            <div className="p-3 bg-green-500 rounded-xl">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{activeCount}</div>
              <div className="text-sm text-gray-600">Active Admins</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100">
          <div className="flex items-center">
            <div className="p-3 bg-red-500 rounded-xl">
              <Power className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{inactiveCount}</div>
              <div className="text-sm text-gray-600">Inactive Admins</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-500 rounded-xl">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{pendingCount}</div>
              <div className="text-sm text-gray-600">Pending Approval</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center">
            <div className="p-3 bg-purple-500 rounded-xl">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{totalAssignments}</div>
              <div className="text-sm text-gray-600">Total Assignments</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search admins by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-sm sm:text-base"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full sm:w-40 lg:w-48">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  All Status
                </SelectItem>
                <SelectItem value="active">
                  Active
                </SelectItem>
                <SelectItem value="inactive">
                  Inactive
                </SelectItem>
                <SelectItem value="pending">
                  Pending
                </SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">More Filters</span>
              <span className="sm:hidden">Filters</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {showBulkActions && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center">
              <div className="text-sm font-medium text-blue-900">
                {selectedAdmins.length} admin{selectedAdmins.length > 1 ? "s" : ""} selected
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkToggleStatus("active")}
                className="text-green-600 border-green-200 hover:bg-green-50"
              >
                <span className="hidden sm:inline">Enable Selected</span>
                <span className="sm:hidden">Enable</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkToggleStatus("inactive")}
                className="text-orange-600 border-orange-200 hover:bg-orange-50"
              >
                <span className="hidden sm:inline">Disable Selected</span>
                <span className="sm:hidden">Disable</span>
              </Button>
              <Button variant="destructive" size="sm" onClick={handleBulkDelete} className="bg-red-600 hover:bg-red-700">
                <Trash2 className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Delete Selected</span>
                <span className="sm:hidden">Delete</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedAdmins([])
                  setShowBulkActions(false)
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Table/Cards */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {isMobile ? (
          /* Mobile Card View */
          <div className="p-4 space-y-4">
            {paginatedAdmins.map((admin) => (
              <CardView
                key={admin.id}
                admin={admin}
                isSelected={selectedAdmins.includes(admin.id)}
                onSelect={(checked) => handleSelectAdmin(admin.id, checked)}
                onView={() => onViewAdmin(admin)}
                onEdit={() => onEditAdmin(admin)}
                onDelete={() => onDeleteAdmin(admin.id)}
                onToggleStatus={() => onToggleStatus(admin)}
              />
            ))}
          </div>
        ) : (
          /* Desktop Table View */
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              {/* Keep existing table structure but with updated cells */}
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left">
                    <Checkbox
                      checked={selectedAdmins.length === paginatedAdmins.length && paginatedAdmins.length > 0}
                      ref={(el) => {
                        // Ensure el is an HTMLInputElement before setting indeterminate
                        if (el && "indeterminate" in el) {
                          (el as HTMLInputElement).indeterminate =
                            selectedAdmins.length > 0 && selectedAdmins.length < paginatedAdmins.length
                        }
                      }}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button onClick={() => handleSort("name")} className="flex items-center hover:text-gray-700">
                      Admin Details
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort("societyCount")}
                      className="flex items-center hover:text-gray-700"
                    >
                      <span className="hidden lg:inline">Assigned Societies</span>
                      <span className="lg:hidden">Societies</span>
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort("lastActivity")}
                      className="flex items-center hover:text-gray-700"
                    >
                      <span className="hidden lg:inline">Last Activity</span>
                      <span className="lg:hidden">Activity</span>
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedAdmins.map((admin) => (
                  <tr
                    key={admin.id}
                    className={`hover:bg-gray-50 transition-colors ${selectedAdmins.includes(admin.id) ? "bg-blue-50 border-l-4 border-l-blue-500" : ""}`}
                  >
                    <td className="px-3 sm:px-6 py-4">
                      <Checkbox
                        checked={selectedAdmins.includes(admin.id)}
                        onCheckedChange={(checked) => handleSelectAdmin(admin.id, checked as boolean)}
                      />
                    </td>
                    <td className="px-3 sm:px-6 py-4">
                      <div className="flex items-center">
                        <Avatar className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                          <AvatarFallback className="bg-blue-100 text-blue-600 font-medium text-xs sm:text-sm">
                            {getInitials(admin.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-2 sm:ml-3 min-w-0">
                          <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">{admin.name}</div>
                          <div className="text-xs sm:text-sm text-gray-500 truncate">{admin.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${getStatusDot(admin.status)}`} />
                        <Badge variant="outline" className={`${getStatusBadge(admin.status)} text-xs`}>
                          <span className="hidden sm:inline">{admin.status.charAt(0).toUpperCase() + admin.status.slice(1)}</span>
                          <span className="sm:hidden">{admin.status.charAt(0).toUpperCase()}</span>
                        </Badge>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="cursor-help">
                              <div className="text-xs sm:text-sm text-gray-900">{admin.assignedSocieties.length} societies</div>
                              <div className="text-xs text-gray-500">
                                {admin.assignedSocieties.reduce((sum, society) => sum + society.unitCount, 0)} <span className="hidden sm:inline">total</span> units
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
                    </td>
                    {/* Updated Last Activity cell with full timestamp on hover */}
                    <td className="px-3 sm:px-6 py-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="cursor-help">
                              <div className="text-xs sm:text-sm text-gray-900 truncate">
                                {admin.lastActivity === "Never"
                                  ? "Never"
                                  : formatDistanceToNow(new Date(admin.lastActivity), { addSuffix: true })}
                              </div>
                              {admin.lastActivity !== "Never" && (
                                <div className="text-xs text-gray-500">
                                  {new Date(admin.lastActivity).toLocaleDateString()}
                                </div>
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
                    </td>
                    <td className="px-3 sm:px-6 py-4">
                      <div className="text-xs sm:text-sm text-gray-900">{admin.loginCount} logins</div>
                      <div className="text-xs text-gray-500">{admin.ticketsResolved} <span className="hidden sm:inline">tickets</span> resolved</div>
                    </td>
                    <td className="px-3 sm:px-6 py-4">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => onViewAdmin(admin)} className="p-1 sm:p-2">
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-1 sm:p-2">
                              <MoreHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onViewAdmin(admin)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onEditAdmin(admin)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Admin
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onToggleStatus(admin)}>
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
                            <DropdownMenuItem onClick={() => onDeleteAdmin(admin.id)} className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="px-3 sm:px-6 py-3 border-t bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="text-xs sm:text-sm text-gray-700 text-center sm:text-left">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredAndSortedAdmins.length)} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredAndSortedAdmins.length)} of {filteredAndSortedAdmins.length}{" "}
          admins
        </div>
        <div className="flex items-center justify-center space-x-1 sm:space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="text-xs sm:text-sm px-2 sm:px-3"
          >
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </Button>
          {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
            const page = i + 1
            return (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={`text-xs sm:text-sm px-2 sm:px-3 ${currentPage === page ? "bg-blue-600" : ""}`}
              >
                {page}
              </Button>
            )
          })}
          {totalPages > 3 && (
            <span className="text-xs sm:text-sm text-gray-500 px-1">...</span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="text-xs sm:text-sm px-2 sm:px-3"
          >
            <span className="hidden sm:inline">Next</span>
            <span className="sm:hidden">Next</span>
          </Button>
        </div>
      </div>
      {/* Bulk Delete Confirmation Modal */}
      <BulkEditModal
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={confirmBulkDelete}
        selectedAdmins={paginatedAdmins.filter((admin) => selectedAdmins.includes(admin.id))}
      />
    </div>
  )
}
