import React, { useState, useMemo } from 'react';

import {
  Search,
  Filter,
  EllipsisVertical,
  Eye,
  Users,
  Building2,
  Activity,
  UserPlus
} from 'lucide-react';

import type {
  Admin,
  SortField,
  SortDirection,
  StatusFilter
} from '../types/admin';

import { mockAdmins } from '../data/mockData';

import { formatRelativeTime, formatFullDateTime } from '../utils/formatters';

import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Avatar } from './ui/Avatar';
import { Card } from './ui/Card';

interface AdminListViewProps {
  onViewAdmin: (admin: Admin) => void;
  onCreateAdmin: () => void;
}

export const AdminListView: React.FC<AdminListViewProps> = ({
  onViewAdmin,
  onCreateAdmin
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAdmins, setSelectedAdmins] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const itemsPerPage = 8;

  const filteredAndSortedData = useMemo(() => {
    let filtered = mockAdmins.filter(admin => {
      const matchesSearch = admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || admin.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    return filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortField) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'lastActivity':
          aValue = a.lastActivity === 'Never' ? 0 : new Date(a.lastActivity).getTime();
          bValue = b.lastActivity === 'Never' ? 0 : new Date(b.lastActivity).getTime();
          break;
        case 'societyCount':
          aValue = a.assignedSocieties.length;
          bValue = b.assignedSocieties.length;
          break;
        case 'loginCount':
          aValue = a.loginCount;
          bValue = b.loginCount;
          break;
        case 'ticketsResolved':
          aValue = a.ticketsResolved;
          bValue = b.ticketsResolved;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [searchQuery, statusFilter, sortField, sortDirection]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleAdminSelection = (adminId: number) => {
    setSelectedAdmins(prev =>
      prev.includes(adminId)
        ? prev.filter(id => id !== adminId)
        : [...prev, adminId]
    );
  };

  const selectAllAdmins = () => {
    if (selectedAdmins.length === paginatedData.length) {
      setSelectedAdmins([]);
    } else {
      setSelectedAdmins(paginatedData.map(admin => admin.id));
    }
  };

  const getStatusCounts = () => {
    const active = mockAdmins.filter(admin => admin.status === 'active').length;
    const inactive = mockAdmins.filter(admin => admin.status === 'inactive').length;
    const pending = mockAdmins.filter(admin => admin.status === 'pending').length;
    const totalAssignments = mockAdmins.reduce((sum, admin) => sum + admin.assignedSocieties.length, 0);

    return { active, inactive, pending, totalAssignments };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Platform Admins Management</h1>
              <p className="text-gray-600 mt-1">Manage platform administrators and their society assignments</p>
            </div>
            <Button onClick={onCreateAdmin} size="lg">
              <UserPlus className="w-5 h-5 mr-2" />
              Create New Admin
            </Button>
          </div>
        </Card>

        <div className="mb-8">

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 bg-gradient-to-br from-[#10B981]/10 to-[#10B981]/20 border-[#10B981]/20">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-[#10B981] to-[#059669] rounded-xl shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{statusCounts.active}</div>
                  <div className="text-sm text-gray-600">Active Admins</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-[#EF4444]/10 to-[#EF4444]/20 border-[#EF4444]/20">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-[#EF4444] to-[#DC2626] rounded-xl shadow-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{statusCounts.inactive}</div>
                  <div className="text-sm text-gray-600">Inactive Admins</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-[#F59E0B]/10 to-[#F59E0B]/20 border-[#F59E0B]/20">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-[#F59E0B] to-[#D97706] rounded-xl shadow-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{statusCounts.pending}</div>
                  <div className="text-sm text-gray-600">Pending Approval</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-[#6366F1]/10 to-[#6366F1]/20 border-[#6366F1]/20">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-[#6366F1] to-[#4F46E5] rounded-xl shadow-lg">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{statusCounts.totalAssignments}</div>
                  <div className="text-sm text-gray-600">Total Assignments</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search admins by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 backdrop-blur-xl bg-white/80 border border-white/30 rounded-xl focus:ring-2 focus:ring-[#007AFF] focus:border-transparent shadow-lg"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="px-4 py-2.5 backdrop-blur-xl bg-white/80 border border-white/30 rounded-xl focus:ring-2 focus:ring-[#007AFF] focus:border-transparent shadow-lg"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>

            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </Card>

        {/* Bulk Actions */}
        {selectedAdmins.length > 0 && (
          <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">
                {selectedAdmins.length} admin{selectedAdmins.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Enable</Button>
                <Button variant="outline" size="sm">Disable</Button>
                <Button variant="danger" size="sm">Delete</Button>
              </div>
            </div>
          </Card>
        )}

        {/* Desktop Table View */}
        <Card className="hidden lg:block overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="p-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedAdmins.length === paginatedData.length && paginatedData.length > 0}
                      onChange={selectAllAdmins}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th
                    className="p-4 text-left text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort('name')}
                  >
                    Admin Details
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-700">Status</th>
                  <th
                    className="p-4 text-left text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort('societyCount')}
                  >
                    Assigned Societies
                  </th>
                  <th
                    className="p-4 text-left text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort('lastActivity')}
                  >
                    Last Activity
                  </th>
                  <th
                    className="p-4 text-left text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort('loginCount')}
                  >
                    Performance
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((admin) => (
                  <tr key={admin.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedAdmins.includes(admin.id)}
                        onChange={() => toggleAdminSelection(admin.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <Avatar name={admin.name} />
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{admin.name}</div>
                          <div className="text-sm text-gray-600">{admin.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={admin.status}>
                        {admin.status.charAt(0).toUpperCase() + admin.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">
                          {admin.assignedSocieties.length} societies
                        </div>
                        <div className="text-gray-600">
                          {admin.assignedSocieties.reduce((sum, society) => sum + society.unitCount, 0)} total units
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <div className="text-gray-900" title={formatFullDateTime(admin.lastActivity)}>
                          {formatRelativeTime(admin.lastActivity)}
                        </div>
                        <div className="text-gray-600">
                          {admin.lastActivity !== 'Never' && formatFullDateTime(admin.lastActivity)}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <div className="text-gray-900">{admin.loginCount} logins</div>
                        <div className="text-gray-600">{admin.ticketsResolved} tickets resolved</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onViewAdmin(admin)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <div className="relative">
                          <Button variant="ghost" size="sm">
                            <EllipsisVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Mobile Card View */}
        <div className="lg:hidden grid gap-4">
          {paginatedData.map((admin) => (
            <Card key={admin.id} className="p-6" hover>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <Avatar name={admin.name} />
                  <div className="ml-3">
                    <div className="font-medium text-gray-900">{admin.name}</div>
                    <div className="text-sm text-gray-600">{admin.email}</div>
                  </div>
                </div>
                <Badge variant={admin.status}>
                  {admin.status.charAt(0).toUpperCase() + admin.status.slice(1)}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Societies</div>
                  <div className="font-medium">{admin.assignedSocieties.length}</div>
                </div>
                <div>
                  <div className="text-gray-600">Last Active</div>
                  <div className="font-medium">{formatRelativeTime(admin.lastActivity)}</div>
                </div>
                <div>
                  <div className="text-gray-600">Logins</div>
                  <div className="font-medium">{admin.loginCount}</div>
                </div>
                <div>
                  <div className="text-gray-600">Tickets</div>
                  <div className="font-medium">{admin.ticketsResolved}</div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => onViewAdmin(admin)}>
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button variant="ghost" size="sm">
                  <EllipsisVertical className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Card className="p-4 mt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} admins
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};