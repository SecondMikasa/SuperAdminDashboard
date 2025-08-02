import { useState } from 'react';

import type { Admin } from './types/admin';

import { AdminListView } from './components/AdminListView';
import { AdminDetailView } from './components/AdminDetailView';
import { AdminModal } from './components/AdminModal';

type View = 'list' | 'detail';

function App() {
  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | undefined>(undefined);

  const handleViewAdmin = (admin: Admin) => {
    setSelectedAdmin(admin);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedAdmin(undefined);
  };

  const handleEditAdmin = (admin: Admin) => {
    setEditingAdmin(admin);
    setIsModalOpen(true);
  };

  const handleCreateAdmin = () => {
    setEditingAdmin(undefined);
    setIsModalOpen(true);
  };

  const handleSaveAdmin = (adminData: Partial<Admin>) => {
    console.log('Saving admin:', adminData);

    if (editingAdmin) {
      console.log('Updating existing admin:', editingAdmin.id);
    } else {
      console.log('Creating new admin');
    }

    setEditingAdmin(undefined);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAdmin(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {
        currentView === 'list' &&
        (
          <AdminListView
            onViewAdmin={handleViewAdmin}
            onEditAdmin={handleEditAdmin}
            onCreateAdmin={handleCreateAdmin}
          />
        )
      }

      {
        currentView === 'detail' && selectedAdmin &&
        (
          <AdminDetailView
            admin={selectedAdmin}
            onBack={handleBackToList}
            onEdit={handleEditAdmin}
          />
        )
      }

      <AdminModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        admin={editingAdmin}
        onSave={handleSaveAdmin}
      />
    </div>
  );
}

export default App;