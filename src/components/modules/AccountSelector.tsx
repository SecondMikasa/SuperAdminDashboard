import React, { useState } from 'react';
import { ChevronDown, User } from 'lucide-react';
import { cn } from '../../utils/cn';

interface Account {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

const accounts: Account[] = [
  {
    id: '1',
    name: 'RWA ADMIN',
    role: 'Super Admin',
  },
  {
    id: '2',
    name: 'Platform Manager',
    role: 'Manager',
  },
  {
    id: '3',
    name: 'Support Admin',
    role: 'Support',
  },
];

export function AccountSelector() {
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 bg-[#007AFF] text-white rounded-lg hover:bg-[#0056CC] transition-colors"
      >
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <User className="w-4 h-4" />
        </div>
        <div className="text-left">
          <div className="text-sm font-medium">{selectedAccount.name}</div>
          <div className="text-xs opacity-80">{selectedAccount.role}</div>
        </div>
        <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
          {accounts.map((account) => (
            <button
              key={account.id}
              onClick={() => {
                setSelectedAccount(account);
                setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors",
                selectedAccount.id === account.id && "bg-blue-50 text-[#007AFF]"
              )}
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-medium">{account.name}</div>
                <div className="text-xs text-gray-500">{account.role}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}