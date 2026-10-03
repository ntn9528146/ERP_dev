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
  addNewSchool: (school: Omit<SchoolTenant, 'id'>) => SchoolTenant;
  currentUser: UserSession | null;
  isAuthenticated: boolean;
  loginUser: (identifier: string, pass: string) => { success: boolean; message?: string };
  loginWithSecretToken: (token: string) => { success: boolean; message?: string };
  logout: () => void;
}

export const INITIAL_SCHOOLS: SchoolTenant[] = [
  { id: 'arden-haldwani', name: 'Arden Progressive School (Haldwani)', code: 'ARDEN', domain: 'arden.edu', city: 'Haldwani' },
  { id: 'dps-nainital', name: 'Delhi Public School (Nainital)', code: 'DPS-NTL', domain: 'dpsnainital.edu', city: 'Nainital' },
  { id: 'jai-arihant', name: 'Jai Arihant International School (Haldwani)', code: 'JAIS', domain: 'jaiarihant.edu', city: 'Haldwani' },
];

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [availableSchools, setAvailableSchools] = useState<SchoolTenant[]>(INITIAL_SCHOOLS);
  const [activeSchool, setActiveSchool] = useState<SchoolTenant>(INITIAL_SCHOOLS[0]);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);

  // Restore session & custom onboarded schools
  useEffect(() => {
    const savedSchools = localStorage.getItem('devgyan_schools');
    if (savedSchools) {
      try {
        const parsed = JSON.parse(savedSchools);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAvailableSchools(parsed);
          setActiveSchool(parsed[0]);
        }
      } catch (e) {
        console.error(e);
      }
    }

    const savedUser = localStorage.getItem('devgyan_user_session');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setCurrentUser(parsedUser);
        const matched = availableSchools.find((s) => s.id === parsedUser.schoolId);
        if (matched) setActiveSchool(matched);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const addNewSchool = (data: Omit<SchoolTenant, 'id'>) => {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 20);
    const newSchool: SchoolTenant = {
      ...data,
      id: `${slug}-${Date.now().toString().slice(-4)}`,
    };
    const updated = [...availableSchools, newSchool];
    setAvailableSchools(updated);
    setActiveSchool(newSchool);
    localStorage.setItem('devgyan_schools', JSON.stringify(updated));
    return newSchool;
  };

  const loginUser = (identifier: string, pass: string) => {
    const cleanId = identifier.trim().toLowerCase();

    // 1. MASTER DEVELOPER / ARCHITECT
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

    // 2. AUTOMATIC DOMAIN RESOLUTION
    let matched = availableSchools.find((s) => cleanId.includes(s.domain) || cleanId.includes(s.code.toLowerCase()));
    if (!matched) {
      matched = availableSchools[0];
    }

    let role: UserSession['role'] = 'TEACHER';
    if (cleanId.includes('principal')) role = 'PRINCIPAL';
    else if (cleanId.includes('director')) role = 'DIRECTOR';
    else if (cleanId.includes('coordinator')) role = 'COORDINATOR';

    const session: UserSession = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name: `${role} (${matched.code})`,
      email: cleanId,
      role,
      schoolId: matched.id,
      schoolName: matched.name,
      assignedClasses: role === 'TEACHER' ? ['Class 10', 'Class 11 (Science)'] : undefined,
    };

    setCurrentUser(session);
    setActiveSchool(matched);
    localStorage.setItem('devgyan_user_session', JSON.stringify(session));
    return { success: true };
  };

  const loginWithSecretToken = (token: string) => {
    const clean = token.trim().toUpperCase();
    if (!clean) return { success: false, message: 'Please provide a valid Security Token' };

    // Resolve target school based on token prefix
    let matched = availableSchools.find((s) => clean.includes(s.code.toUpperCase()) || clean.includes(s.id.toUpperCase()));
    if (!matched) matched = availableSchools[0];

    let role: UserSession['role'] = 'TEACHER';
    if (clean.includes('DEV') || clean.includes('ROOT') || clean.includes('7125')) {
      role = 'DEVELOPER';
    } else if (clean.includes('P1') || clean.includes('PRIN')) {
      role = 'PRINCIPAL';
    }

    const session: UserSession = {
      id: `TOK-${Date.now().toString().slice(-4)}`,
      name: `${role} (Token Access)`,
      email: `token-auth@${matched.domain}`,
      role,
      schoolId: matched.id,
      schoolName: matched.name,
      assignedClasses: role === 'TEACHER' ? ['Class 10', 'Class 11 (Science)'] : undefined,
    };

    setCurrentUser(session);
    setActiveSchool(matched);
    localStorage.setItem('devgyan_user_session', JSON.stringify(session));
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('devgyan_user_session');
  };

  return (
    <TenantContext.Provider
      value={{
        activeSchool,
        availableSchools,
        setActiveSchool: (school) => {
          if (!currentUser || currentUser.role === 'DEVELOPER' || currentUser.role === 'SUPER_ADMIN') {
            setActiveSchool(school);
          }
        },
        addNewSchool,
        currentUser,
        isAuthenticated: !!currentUser,
        loginUser,
        loginWithSecretToken,
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
