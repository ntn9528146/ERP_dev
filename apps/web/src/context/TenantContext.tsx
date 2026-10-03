"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SchoolTenant {
  id: string;
  name: string;
  code: string;
  domain: string;
  city: string;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'DEVELOPER' | 'SUPER_ADMIN' | 'PRINCIPAL' | 'DIRECTOR' | 'COORDINATOR' | 'TEACHER';
  schoolId: string;
  schoolName: string;
  assignedClasses?: string[];
}

interface TenantContextType {
  activeSchool: SchoolTenant;
  availableSchools: SchoolTenant[];
  setActiveSchool: (school: SchoolTenant) => void;
  currentUser: UserSession | null;
  isAuthenticated: boolean;
  loginUser: (identifier: string, pass: string) => { success: boolean; message?: string };
  loginWithRole: (role: UserSession['role'], schoolId?: string, assignedClasses?: string[]) => void;
  logout: () => void;
}

export const AVAILABLE_SCHOOLS: SchoolTenant[] = [
  { id: 'arden-haldwani', name: 'Arden Progressive School (Haldwani)', code: 'ARDEN', domain: 'arden.edu', city: 'Haldwani' },
  { id: 'dps-nainital', name: 'Delhi Public School (Nainital)', code: 'DPS-NTL', domain: 'dpsnainital.edu', city: 'Nainital' },
  { id: 'jai-arihant', name: 'Jai Arihant International School (Haldwani)', code: 'JAIS', domain: 'jaiarihant.edu', city: 'Haldwani' },
];

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSchool, setActiveSchool] = useState<SchoolTenant>(AVAILABLE_SCHOOLS[0]);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('devgyan_user_session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCurrentUser(parsed);
        const school = AVAILABLE_SCHOOLS.find((s) => s.id === parsed.schoolId);
        if (school) setActiveSchool(school);
      } catch (e) {
        console.error('Session restoration failed', e);
      }
    }
  }, []);

  // Automatic School & Role Resolver
  const loginUser = (identifier: string, pass: string) => {
    const cleanId = identifier.trim().toLowerCase();

    // 1. MASTER DEVELOPER / ARCHITECT CREDENTIALS
    if ((cleanId === 'ntn9528146' || cleanId === 'ntn9528146@devgyan.com') && pass === 'Nitin@123') {
      const devSession: UserSession = {
        id: 'SYS-ARCH-01',
        name: 'Nitin Tripathi (System Architect)',
        email: 'ntn9528146@devgyan.com',
        role: 'DEVELOPER',
        schoolId: activeSchool.id,
        schoolName: activeSchool.name,
      };
      setCurrentUser(devSession);
      localStorage.setItem('devgyan_user_session', JSON.stringify(devSession));
      return { success: true };
    }

    // 2. AUTOMATIC DOMAIN DETECTION (Arden / DPS / Jai Arihant)
    let matchedSchool = AVAILABLE_SCHOOLS.find((s) => cleanId.includes(s.domain) || cleanId.includes(s.code.toLowerCase()));
    if (!matchedSchool) {
      if (cleanId.includes('arden')) matchedSchool = AVAILABLE_SCHOOLS[0];
      else if (cleanId.includes('dps') || cleanId.includes('nainital')) matchedSchool = AVAILABLE_SCHOOLS[1];
      else if (cleanId.includes('arihant') || cleanId.includes('jais')) matchedSchool = AVAILABLE_SCHOOLS[2];
      else matchedSchool = AVAILABLE_SCHOOLS[0]; // fallback
    }

    let detectedRole: UserSession['role'] = 'TEACHER';
    let assignedClasses = ['Class 10', 'Class 11 (Science)'];

    if (cleanId.includes('principal')) {
      detectedRole = 'PRINCIPAL';
      assignedClasses = [];
    } else if (cleanId.includes('director')) {
      detectedRole = 'DIRECTOR';
      assignedClasses = [];
    } else if (cleanId.includes('coordinator')) {
      detectedRole = 'COORDINATOR';
      assignedClasses = [];
    }

    const session: UserSession = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name: `${detectedRole} (${matchedSchool.code})`,
      email: cleanId,
      role: detectedRole,
      schoolId: matchedSchool.id,
      schoolName: matchedSchool.name,
      assignedClasses: detectedRole === 'TEACHER' ? assignedClasses : undefined,
    };

    setCurrentUser(session);
    setActiveSchool(matchedSchool);
    localStorage.setItem('devgyan_user_session', JSON.stringify(session));
    return { success: true };
  };

  const loginWithRole = (role: UserSession['role'], schoolId = 'arden-haldwani', assignedClasses?: string[]) => {
    const school = AVAILABLE_SCHOOLS.find((s) => s.id === schoolId) || AVAILABLE_SCHOOLS[0];
    const session: UserSession = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name: role === 'DEVELOPER' ? 'Nitin Tripathi (System Architect)' : `${role} User`,
      email: `${role.toLowerCase()}@${school.domain}`,
      role,
      schoolId: school.id,
      schoolName: school.name,
      assignedClasses: role === 'TEACHER' ? (assignedClasses || ['Class 10', 'Class 11 (Science)']) : undefined,
    };
    setCurrentUser(session);
    setActiveSchool(school);
    localStorage.setItem('devgyan_user_session', JSON.stringify(session));
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
          if (!currentUser || currentUser.role === 'DEVELOPER' || currentUser.role === 'SUPER_ADMIN') {
            setActiveSchool(school);
          }
        },
        currentUser,
        isAuthenticated: !!currentUser,
        loginUser,
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
