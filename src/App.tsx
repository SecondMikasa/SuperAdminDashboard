import { useState } from "react"

import { AdminListView } from "../src/components/AdminListView"
import { AdminDetailView } from "../src/components/AdminDetailView"

import { EditAdminModal } from "../src/components/modules/Edit-modal"

import { Toast, useToast } from "../src/components/ui/Toast-notification"

import { mockAdmins } from "../src/data/mockData"

import { type Admin } from "../src/types/admin"

export default function PlatformAdminDashboard() {
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null)
  const [admins, setAdmins] = useState<Admin[]>(mockAdmins)
  const { toast, showToast, hideToast } = useToast()

  const handleViewAdmin = (admin: Admin) => {
    setSelectedAdmin(admin)
  }

  const handleBackToList = () => {
    setSelectedAdmin(null)
  }

  const handleCreateAdmin = () => {
    setIsCreateModalOpen(true)
  }

  const handleEditAdmin = (admin: Admin) => {
    setEditingAdmin(admin)
  }

  const handleSaveAdmin = (adminData: Partial<Admin>) => {
    if (editingAdmin) {
      // Update existing admin
      setAdmins((prev) => prev.map((admin) => (admin.id === editingAdmin.id ? { ...admin, ...adminData } : admin)))
      setEditingAdmin(null)
      if (selectedAdmin?.id === editingAdmin.id) {
        setSelectedAdmin({ ...selectedAdmin, ...adminData } as Admin)
      }
    } else {
      // Create new admin
      const newAdmin: Admin = {
        id: Math.max(...admins.map((a) => a.id)) + 1,
        name: adminData.name || "",
        email: adminData.email || "",
        phone: adminData.phone || "",
        status: adminData.status || "pending",
        assignedSocieties: adminData.assignedSocieties || [],
        lastActivity: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        loginCount: 0,
        ticketsResolved: 0,
        recentActivities: [],
      }
      setAdmins((prev) => [...prev, newAdmin])
      setIsCreateModalOpen(false)
    }
  }

  const handleDeleteAdmin = (adminId: number) => {
    setAdmins((prev) => prev.filter((admin) => admin.id !== adminId))
    if (selectedAdmin && selectedAdmin.id === adminId) {
      setSelectedAdmin(null)
    }
  }

  const handleBulkDeleteAdmins = (adminIds: number[]) => {
    const count = adminIds.length
    setAdmins((prev) => prev.filter((admin) => !adminIds.includes(admin.id)))
    if (selectedAdmin && adminIds.includes(selectedAdmin.id)) {
      setSelectedAdmin(null)
    }
    showToast(`Successfully deleted ${count} admin${count > 1 ? "s" : ""}`, "success")
  }

  const handleToggleStatus = (admin: Admin) => {
    const newStatus: "active" | "inactive" | "pending" = admin.status === "active" ? "inactive" : "active"
    const updatedAdmin: Admin = { ...admin, status: newStatus }
    setAdmins((prev) => prev.map((a) => (a.id === admin.id ? updatedAdmin : a)))
    if (selectedAdmin?.id === admin.id) {
      setSelectedAdmin(updatedAdmin)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-full overflow-x-hidden">
        {
          selectedAdmin ? (
            <AdminDetailView
              admin={selectedAdmin}
              onBack={handleBackToList}
              onEdit={handleEditAdmin}
              onToggleStatus={handleToggleStatus}
            />
          ) : (
            <AdminListView
              admins={admins}
              onViewAdmin={handleViewAdmin}
              onCreateAdmin={handleCreateAdmin}
              onEditAdmin={handleEditAdmin}
              onDeleteAdmin={handleDeleteAdmin}
              onBulkDeleteAdmins={handleBulkDeleteAdmins}
              onToggleStatus={handleToggleStatus}
            />
          )}
      </div>

      <EditAdminModal
        isOpen={isCreateModalOpen || !!editingAdmin}
        onClose={() => {
          setIsCreateModalOpen(false)
          setEditingAdmin(null)
        }}
        onSave={handleSaveAdmin}
        admin={editingAdmin}
        isEditing={!!editingAdmin}
      />
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  )
}
