import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Building2 } from 'lucide-react';
import type { Admin } from '../types/admin';
import { allSocieties } from '../data/mockData';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  admin?: Admin;
  onSave: (adminData: Partial<Admin>) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  admin,
  onSave
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'pending' as Admin['status'],
    assignedSocieties: [] as number[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (admin) {
      setFormData({
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        status: admin.status,
        assignedSocieties: admin.assignedSocieties.map(s => s.id)
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        status: 'pending',
        assignedSocieties: []
      });
    }
    setErrors({});
  }, [admin, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const societiesData = allSocieties.filter((society: { id: number; name: string; unitCount: number }) =>
      formData.assignedSocieties.includes(society.id)
    );

    const adminData: Partial<Admin> = {
      ...formData,
      assignedSocieties: societiesData,
      ...(admin ? { id: admin.id } : {})
    };

    onSave(adminData);
    onClose();
  };

  const handleSocietyToggle = (societyId: number) => {
    setFormData(prev => ({
      ...prev,
      assignedSocieties: prev.assignedSocieties.includes(societyId)
        ? prev.assignedSocieties.filter(id => id !== societyId)
        : [...prev.assignedSocieties, societyId]
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={admin ? 'Edit Platform Admin' : 'Create New Platform Admin'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Personal Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                placeholder="Enter full name"
              />
              {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                placeholder="Enter email address"
              />
              {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.phone ? 'border-red-300' : 'border-gray-300'
                  }`}
                placeholder="Enter phone number"
              />
              {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Initial Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Admin['status'] }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Society Assignments */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">
            <Building2 className="w-4 h-4 inline mr-1" />
            Society Assignments
          </h4>
          <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {allSocieties.map((society: { id: number; name: string; unitCount: number }) => (
                <label
                  key={society.id}
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.assignedSocieties.includes(society.id)}
                    onChange={() => handleSocietyToggle(society.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{society.name}</div>
                    <div className="text-xs text-gray-600">{society.unitCount} units</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Selected: {formData.assignedSocieties.length} societies
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {admin ? 'Update Admin' : 'Create Admin'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};