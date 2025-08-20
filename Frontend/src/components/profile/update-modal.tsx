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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData(userDetails);
  }, [userDetails]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    if (formData) {
      setIsSubmitting(true);
      try {
        const response = await fetch(`${API_BASE_URL}/auth/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            firstname: formData.firstName,
            middlename: formData.middleName,
            lastname: formData.lastName,
            email: formData.email,
            mobile: formData.phoneNumber,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          // Update local state with the response from server
          const updatedDetails = {
            firstName: data.user.fullname.firstname,
            middleName: data.user.fullname.middlename,
            lastName: data.user.fullname.lastname,
            email: data.user.email,
            role: data.user.role,
            department: data.user.department,
            phoneNumber: data.user.mobile,
          };
          onUpdate(updatedDetails);
          onClose();
        } else {
          const errorData = await response.json();
          alert(errorData.message || 'Failed to update profile');
        }
              } catch (error) {
          console.error('Error updating profile:', error);
          alert('Failed to update profile. Please try again.');
        } finally {
          setIsSubmitting(false);
        }
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
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update it'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateModal;
