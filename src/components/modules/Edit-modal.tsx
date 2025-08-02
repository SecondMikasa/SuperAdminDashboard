import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/Select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog"
import { Badge } from "../ui/Badge"
import { mockSocieties } from "../../data/mockData"
import { type Admin } from "../../types/admin"

interface CreateEditAdminModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (admin: Partial<Admin>) => void
  admin?: Admin | null
  isEditing: boolean
}

export function EditAdminModal({ isOpen, onClose, onSave, admin, isEditing }: CreateEditAdminModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "pending" as Admin["status"],
    assignedSocieties: [] as Admin["assignedSocieties"],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (admin && isEditing) {
      setFormData({
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        status: admin.status,
        assignedSocieties: admin.assignedSocieties,
      })
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        status: "pending",
        assignedSocieties: [],
      })
    }
    setErrors({})
  }, [admin, isEditing, isOpen])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    onSave(formData)
    onClose()
  }

  const handleSocietyToggle = (society: (typeof mockSocieties)[0]) => {
    const isAssigned = formData.assignedSocieties.some((s) => s.id === society.id)

    if (isAssigned) {
      setFormData((prev) => ({
        ...prev,
        assignedSocieties: prev.assignedSocieties.filter((s) => s.id !== society.id),
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        assignedSocieties: [...prev.assignedSocieties, society],
      }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Admin" : "Create New Admin"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1 (555) 123-4567"
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <Label htmlFor="status">Initial Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: Admin["status"]) => setFormData((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Society Assignments */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Society Assignments</h3>

            <div className="space-y-3">
              <Label>Available Societies</Label>
              <div className="max-h-48 overflow-y-auto border rounded-lg p-3 space-y-2">
                {mockSocieties.map((society) => {
                  const isAssigned = formData.assignedSocieties.some((s) => s.id === society.id)
                  return (
                    <div
                      key={society.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        isAssigned ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleSocietyToggle(society)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{society.name}</h4>
                          <p className="text-sm text-gray-500">{society.unitCount} units</p>
                        </div>
                        {isAssigned && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            Assigned
                          </Badge>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {formData.assignedSocieties.length > 0 && (
              <div>
                <Label>Selected Societies ({formData.assignedSocieties.length})</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.assignedSocieties.map((society) => (
                    <Badge key={society.id} variant="secondary" className="bg-blue-100 text-blue-800">
                      {society.name}
                      <button
                        type="button"
                        onClick={() => handleSocietyToggle(society)}
                        className="ml-2 hover:text-blue-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isEditing ? "Update Admin" : "Create Admin"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
