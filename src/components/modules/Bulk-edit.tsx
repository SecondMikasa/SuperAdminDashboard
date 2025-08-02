import { AlertTriangle } from "lucide-react"

import { Button } from "../ui/Button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "../ui/Dialog"
import type { Admin } from "../../types/admin"

interface BulkDeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  selectedAdmins: Admin[]
}

export function BulkEditModal({
  isOpen,
  onClose,
  onConfirm,
  selectedAdmins,
}: BulkDeleteConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <DialogTitle className="text-lg font-semibold text-gray-900">Confirm Bulk Delete</DialogTitle>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-gray-600 mb-4">
            Are you sure you want to delete the following {selectedAdmins.length} admin
            {selectedAdmins.length > 1 ? "s" : ""}? This action cannot be undone.
          </p>

          <div className="bg-gray-50 rounded-lg p-3 max-h-32 overflow-y-auto">
            <ul className="space-y-1">
              {selectedAdmins.map((admin) => (
                <li key={admin.id} className="text-sm text-gray-700">
                  • {admin.name} ({admin.email})
                </li>
              ))}
            </ul>
          </div>
        </div>

        <DialogFooter className="flex space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm} className="bg-red-600 hover:bg-red-700">
            Delete {selectedAdmins.length} Admin{selectedAdmins.length > 1 ? "s" : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
