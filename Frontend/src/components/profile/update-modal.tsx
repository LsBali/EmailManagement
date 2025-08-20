import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface UserDetails {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  phoneNumber: string;
}

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  userDetails: UserDetails | null;
  onUpdate: (updatedDetails: UserDetails) => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ isOpen, onClose, userDetails, onUpdate }) => {
  const [formData, setFormData] = useState<UserDetails | null>(userDetails);

  useEffect(() => {
    setFormData(userDetails);
  }, [userDetails]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = () => {
    if (formData) {
      onUpdate(formData);
      onClose();
    }
  };

  if (!formData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="firstName" className="text-right">
              First Name
            </Label>
            <Input id="firstName" value={formData.firstName} onChange={handleChange} className="col-span-4" />
          </div>
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="middleName" className="text-right whitespace-nowrap">
              Middle Name
            </Label>
            <Input id="middleName" value={formData.middleName || ''} onChange={handleChange} className="col-span-4" placeholder="Optional" />
          </div>
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="lastName" className="text-right">
              Last Name
            </Label>
            <Input id="lastName" value={formData.lastName} onChange={handleChange} className="col-span-4" />
          </div>
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" value={formData.email} onChange={handleChange} className="col-span-4" />
          </div>
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="phoneNumber" className="text-right">
              Phone
            </Label>
            <Input id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="col-span-4" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Update it</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateModal;
