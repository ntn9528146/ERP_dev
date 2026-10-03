"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SchoolTenant {
  id: string;
  name: string;
  badge: string;
  location: string;
  activePlan: string;
  totalIds: number;
}

export interface UserSession {
  email: string;
  name: string;
  role: 'DEVELOPER' | 'PRINCIPAL' | 'VICE_PRINCIPAL' | 'TEACHER';
  schoolId: string;
  department?: string;
}

interface SecretTokenRecord {
  token: string;
  schoolId: string;
  role: 'PRINCIPAL' | 'VICE_PRINCIPAL' | 'TEACHER';
  isUsed: boolean;
  issuedBy: string;
  createdAt: string;
}

interface TenantContextType {
  activeSchool: SchoolTenant;
  user: UserSession | null;
  schools: SchoolTenant[];
  secretTokens: SecretTokenRecord[];
  switchSchool: (schoolId: string) => void;
  loginUser: (session: UserSession) => void;
  logoutUser: () => void;
  generateSecretToken: (schoolId: string, role: 'PRINCIPAL' | 'VICE_PRINCIPAL' | 'TEACHER', issuedBy: string) => string;
  validateAndBurnToken: (token: string, schoolId: string) => boolean;
}

const defaultSchools: SchoolTenant[] = [
  { id: 'arden-haldwani', name: 'Arden Progressive School (Haldwani)', badge: 'APS', location: 'Haldwani, Nainital', activePlan: 'Enterprise 2026-27', totalIds: 3 },
  { id: 'dps-nainital', name: 'Delhi Public School (Nainital)', badge: 'DPS', location: 'Nainital District', activePlan: 'Enterprise 2026-27', totalIds: 5 },
  { id: 'jai-arihant', name: 'Jai Arihant School (Haldwani)', badge: 'JAS', location: 'Haldwani', activePlan: 'Campus Starter', totalIds: 4 },
];

const initialTokens: SecretTokenRecord[] = [
  { token: 'SEC-ARDEN-2026-A1', schoolId: 'arden-haldwani', role: 'TEACHER', isUsed: false, issuedBy: 'DEVGYAN INNOVATION (Root)', createdAt: '2026-10-03' },
  { token: 'SEC-ARDEN-2026-P1', schoolId: 'arden-haldwani', role: 'PRINCIPAL', isUsed: false, issuedBy: 'DEVGYAN INNOVATION (Root)', createdAt: '2026-10-03' },
];

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [schools, setSchools] = useState<SchoolTenant[]>(defaultSchools);
  const [activeSchool, setActiveSchool] = useState<SchoolTenant>(defaultSchools[0]);
  const [user, setUser] = useState<UserSession | null>({
    email: 'developer@devgyan.io',
    name: 'Nitin Tripathi (System Architect)',
    role: 'DEVELOPER',
    schoolId: 'arden-haldwani',
    department: 'Core Architecture',
  });
  const [secretTokens, setSecretTokens] = useState<SecretTokenRecord[]>(initialTokens);

  const switchSchool = (schoolId: string) => {
    const selected = schools.find((s) => s.id === schoolId);
    if (selected) {
      setActiveSchool(selected);
    }
  };

  const loginUser = (session: UserSession) => {
    setUser(session);
    switchSchool(session.schoolId);
  };

  const logoutUser = () => {
    setUser(null);
  };

  const generateSecretToken = (schoolId: string, role: 'PRINCIPAL' | 'VICE_PRINCIPAL' | 'TEACHER', issuedBy: string): string => {
    const token = `SEC-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    const newRecord: SecretTokenRecord = {
      token,
      schoolId,
      role,
      isUsed: false,
      issuedBy,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setSecretTokens((prev) => [newRecord, ...prev]);
    return token;
  };

  const validateAndBurnToken = (token: string, schoolId: string): boolean => {
    const found = secretTokens.find((t) => t.token === token && t.schoolId === schoolId && !t.isUsed);
    if (!found) return false;
    setSecretTokens((prev) =>
      prev.map((t) => (t.token === token ? { ...t, isUsed: true } : t))
    );
    return true;
  };

  return (
    <TenantContext.Provider
      value={{
        activeSchool,
        user,
        schools,
        secretTokens,
        switchSchool,
        loginUser,
        logoutUser,
        generateSecretToken,
        validateAndBurnToken,
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
