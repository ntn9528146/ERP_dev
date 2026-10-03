"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SchoolTenant {
  id: string;
  name: string;
  code: string;
  logo?: string;
  city: string;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'DEVELOPER' | 'SUPER_ADMIN' | 'PRINCIPAL' | 'DIRECTOR' | 'COORDINATOR' | 'TEACHER';
  schoolId: string;
  schoolName: string;
  assignedClasses?: string[]; // e.g. ['Class 9', 'Class 10', 'Class 11 (Science)']
}

interface TenantContextType {
  activeSchool: SchoolTenant;
  availableSchools: SchoolTenant[];
  setActiveSchool: (school: SchoolTenant) => void;
  currentUser: UserSession | null;
  isAuthenticated: boolean;
  loginWithRole: (role: UserSession['role'], schoolId?: string, assignedClasses?: string[]) => void;
  logout: () => void;
}

export const AVAILABLE_SCHOOLS: SchoolTenant[] = [
  { id: 'arden-haldwani', name: 'Arden Progressive School (Haldwani)', code: 'ARDEN', city: 'Haldwani' },
  { id: 'dps-nainital', name: 'Delhi Public School (Nainital)', code: 'DPS-NTL', city: 'Nainital' },
  { id: 'jai-arihant', name: 'Jai Arihant International School (Haldwani)', code: 'JAIS', city: 'Haldwani' },
];

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSchool, setActiveSchool] = useState<SchoolTenant>(AVAILABLE_SCHOOLS[0]);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);

  // Load session from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('devgyan_user_session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCurrentUser(parsed);
        const school = AVAILABLE_SCHOOLS.find((s) => s.id === parsed.schoolId);
        if (school) setActiveSchool(school);
      } catch (e) {
        console.error('Session load error', e);
      }
    }
  }, []);

  const loginWithRole = (role: UserSession['role'], schoolId = 'arden-haldwani', assignedClasses?: string[]) => {
    const matchedSchool = AVAILABLE_SCHOOLS.find((s) => s.id === schoolId) || AVAILABLE_SCHOOLS[0];
    const defaultClasses = assignedClasses || (role === 'TEACHER' ? ['Class 10', 'Class 11 (Science)'] : undefined);
    
    const user: UserSession = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name: role === 'DEVELOPER' ? 'Nitin Tripathi (System Architect)' : `${role} User`,
      email: `${role.toLowerCase()}@${matchedSchool.code.toLowerCase()}.edu`,
      role,
      schoolId: matchedSchool.id,
      schoolName: matchedSchool.name,
      assignedClasses: defaultClasses,
    };

    setCurrentUser(user);
    setActiveSchool(matchedSchool);
    localStorage.setItem('devgyan_user_session', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('devgyan_user_session');
  };

  return (
    <TenantContext.Provider
      value={{
        activeSchool,
        availableSchools: AVAILABLE_SCHOOLS,
        setActiveSchool: (school) => {
          // Only Developer / Super Admin can manually switch schools
          if (!currentUser || currentUser.role === 'DEVELOPER' || currentUser.role === 'SUPER_ADMIN') {
            setActiveSchool(school);
          }
        },
        currentUser,
        isAuthenticated: !!currentUser,
        loginWithRole,
        logout,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) throw new Error('useTenant must be used within TenantProvider');
  return context;
};
