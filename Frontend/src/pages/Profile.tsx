import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Building, Phone, UserCheck } from 'lucide-react';
import UpdateModal from '@/components/profile/update-modal';

interface UserDetails {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  phoneNumber: string;
}

const Profile: React.FC = () => {
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/profile`, { credentials: 'include' });
        const data = await res.json().catch(() => ({}));
        if (res.ok) {
          const mapped: UserDetails = {
            firstName: data?.fullname?.firstname || 'User',
            middleName: data?.fullname?.middlename || '',
            lastName: data?.fullname?.lastname || '',
            email: data?.email || '',
            role: data?.role || 'employee',
            department: data?.department || '',
            phoneNumber: data?.mobile || '',
          };
          setUserDetails(mapped);
          localStorage.setItem('userDetails', JSON.stringify(mapped));
          localStorage.setItem('userRole', mapped.role);
        } else {
          const storedUserDetails = localStorage.getItem('userDetails');
          if (storedUserDetails) {
            setUserDetails(JSON.parse(storedUserDetails));
          }
        }
      } catch {
        const storedUserDetails = localStorage.getItem('userDetails');
        if (storedUserDetails) {
          setUserDetails(JSON.parse(storedUserDetails));
        }
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateDetails = (updatedDetails: UserDetails) => {
    localStorage.setItem('userDetails', JSON.stringify(updatedDetails));
    setUserDetails(updatedDetails);
  };

  if (!userDetails) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <h1 className="text-2xl font-bold text-muted-foreground">User details not found. Please log in.</h1>
      </div>
    );
  }

  const { firstName, middleName, lastName, email, role, department, phoneNumber } = userDetails;

  return (
    <>
      <UpdateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userDetails={userDetails}
        onUpdate={handleUpdateDetails}
      />
      <div className="min-h-screen bg-gradient-to-br from-background via-form-background to-background p-6 flex items-center justify-center">
        <Card className="w-full max-w-2xl shadow-2xl bg-background/80 backdrop-blur-sm border-border/20">
          <CardHeader className="text-center">
            <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/20 mb-4">
              <User size={48} className="text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold gradient-text">
              {`${firstName}${middleName ? ` ${middleName}` : ''} ${lastName}`}
            </CardTitle>
            <p className="text-muted-foreground">Here are your profile details.</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8 gap-y-4 md:gap-y-6 text-sm">
              {/* Column 1 */}
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center space-x-3">
                  <User size={18} className="text-primary" />
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">First Name</span>
                    <span className="font-medium text-foreground">{firstName}</span>
                  </div>
                </div>
                {middleName && (
                  <div className="flex items-center space-x-3">
                    <User size={18} className="text-primary" />
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Middle Name</span>
                      <span className="font-medium text-foreground">{middleName}</span>
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <User size={18} className="text-primary" />
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Last Name</span>
                    <span className="font-medium text-foreground">{lastName}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail size={18} className="text-primary" />
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium text-foreground">{email}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone size={18} className="text-primary" />
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Phone</span>
                    <span className="font-medium text-foreground">{phoneNumber}</span>
                  </div>
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center space-x-3">
                  <UserCheck size={18} className="text-primary" />
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Role</span>
                    <span className="font-medium text-foreground capitalize">{role}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Building size={18} className="text-primary" />
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Department</span>
                    <span className="font-medium text-foreground">{department}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-border/20 flex justify-center">
              <Button className="w-full md:w-auto" onClick={() => setIsModalOpen(true)}>Update Profile</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Profile;
