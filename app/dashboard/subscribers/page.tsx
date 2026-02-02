'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import AdminHeader from '@/src/components/dashboard/AdminHeader';
import { DataTable, Column } from '@/src/components/dashboard/DataTable';
import DeleteConfirmationModal from '@/src/components/dashboard/DeleteConfirmationModal';

interface Subscriber {
  _id: string;
  email: string;
  name?: string;
  status: string;
  createdAt: string;
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [subscriberToDelete, setSubscriberToDelete] = useState<Subscriber | null>(null);

  const fetchSubscribers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/subscriber');
      const result = await response.json();
      if (result.success) {
        setSubscribers(result.data);
      } else {
        toast.error(result.error || 'Failed to fetch subscribers');
      }
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      toast.error('Failed to fetch subscribers');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDeleteClick = (subscriber: Subscriber) => {
    setSubscriberToDelete(subscriber);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!subscriberToDelete) return;

    try {
      const response = await fetch(`/api/subscriber/${subscriberToDelete._id}`, {
        method: 'DELETE',
      });
      const result = await response.json();

      if (result.success) {
        toast.success('Subscriber deleted successfully');
        setSubscribers((prev) => prev.filter((s) => s._id !== subscriberToDelete._id));
      } else {
        toast.error(result.error || 'Failed to delete subscriber');
      }
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      toast.error('Failed to delete subscriber');
    } finally {
      setIsDeleteModalOpen(false);
      setSubscriberToDelete(null);
    }
  };

  const columns: Column<Subscriber>[] = [
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      className: 'font-medium text-gray-900',
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (item) => item.name || <span className="text-gray-400 italic">No name provided</span>,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (item) => (
        <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
          item.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
        }`}>
          {item.status}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Subscribed On',
      sortable: true,
      render: (item) => new Date(item.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Subscribers"
        description="Manage your newsletter audience"
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <DataTable
          data={subscribers}
          columns={columns}
          onDelete={handleDeleteClick}
          itemKey="_id"
          isLoading={isLoading}
          emptyMessage="No subscribers found"
        />
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Subscriber"
        message={`Are you sure you want to delete ${subscriberToDelete?.email}? This action cannot be undone.`}
      />
    </div>
  );
}
