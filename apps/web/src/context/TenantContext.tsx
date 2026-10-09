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
  designation?: string;
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

// Pre-registered Faculty & Staff Directory with Real Names
const REGISTERED_STAFF_PROFILES = [
  { email: 'alok.cs@arden.edu', name: 'Alok Verma', designation: 'PGT Computer Science & AI', role: 'TEACHER', schoolId: 'arden-haldwani', classes: ['Class 10', 'Class 11 (Science)', 'Class 12 (Science)'] },
  { email: 'pooja.math@arden.edu', name: 'Pooja Bhatt', designation: 'Senior Faculty Mathematics', role: 'TEACHER', schoolId: 'arden-haldwani', classes: ['Class 10', 'Class 12 (Science)'] },
  { email: 'rajesh.cs@arden.edu', name: 'Dr. Rajesh Sharma', designation: 'HOD Computer Science', role: 'TEACHER', schoolId: 'arden-haldwani', classes: ['Class 11 (Science)', 'Class 12 (Science)'] },
  { email: 'principal@arden.edu', name: 'Dr. R. K. Sharma', designation: 'Principal & Academic Head', role: 'PRINCIPAL', schoolId: 'arden-haldwani', classes: [] },
  { email: 'meenakshi@dpsnainital.edu', name: 'Meenakshi Bisht', designation: 'PGT Science', role: 'TEACHER', schoolId: 'dps-nainital', classes: ['Class 9', 'Class 10'] },
  { email: 'principal@dpsnainital.edu', name: 'Virendra Joshi', designation: 'Principal', role: 'PRINCIPAL', schoolId: 'dps-nainital', classes: [] },
  { email: 'director@jaiarihant.edu', name: 'Pooja Pandey', designation: 'Managing Director', role: 'DIRECTOR', schoolId: 'jai-arihant', classes: [] },
];

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [availableSchools, setAvailableSchools] = useState<SchoolTenant[]>(INITIAL_SCHOOLS);
  const [activeSchool, setActiveSchool] = useState<SchoolTenant>(INITIAL_SCHOOLS[0]);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);

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
        name: 'Nitin Tripathi',
        designation: 'System Architect & Chief Developer',
        email: 'ntn9528146@devgyan.com',
        role: 'DEVELOPER',
        schoolId: activeSchool.id,
        schoolName: activeSchool.name,
      };
      setCurrentUser(devSession);
      localStorage.setItem('devgyan_user_session', JSON.stringify(devSession));
      return { success: true };
    }

    // 2. CHECK REGISTERED FACULTY PROFILES FOR REAL NAMES
    const staffMatch = REGISTERED_STAFF_PROFILES.find((p) => p.email.toLowerCase() === cleanId);
    if (staffMatch) {
      const school = availableSchools.find((s) => s.id === staffMatch.schoolId) || activeSchool;
      const session: UserSession = {
        id: `STF-${Date.now().toString().slice(-4)}`,
        name: staffMatch.name,
        designation: staffMatch.designation,
        email: staffMatch.email,
        role: staffMatch.role as any,
        schoolId: school.id,
        schoolName: school.name,
        assignedClasses: staffMatch.classes,
      };
      setCurrentUser(session);
      setActiveSchool(school);
      localStorage.setItem('devgyan_user_session', JSON.stringify(session));
      return { success: true };
    }

    // 3. AUTOMATIC RESOLUTION FALLBACK WITH REALISTIC NAME
    let matched = availableSchools.find((s) => cleanId.includes(s.domain) || cleanId.includes(s.code.toLowerCase())) || activeSchool;
    let role: UserSession['role'] = 'TEACHER';
    let realName = 'Alok Verma';
    let designation = 'PGT Faculty';

    if (cleanId.includes('principal')) {
      role = 'PRINCIPAL';
      realName = 'Dr. R. K. Sharma';
      designation = 'Principal';
    } else if (cleanId.includes('director')) {
      role = 'DIRECTOR';
      realName = 'Pooja Pandey';
      designation = 'Managing Director';
    } else if (cleanId.includes('rajesh')) {
      realName = 'Dr. Rajesh Sharma';
      designation = 'HOD Computer Science';
    } else if (cleanId.includes('pooja')) {
      realName = 'Pooja Bhatt';
      designation = 'Senior Mathematics Faculty';
    }

    const session: UserSession = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name: realName,
      designation,
      email: cleanId,
      role,
      schoolId: matched.id,
      schoolName: matched.name,
      assignedClasses: role === 'TEACHER' ? ['Class 10', 'Class 11 (Science)', 'Class 12 (Science)'] : undefined,
    };

    setCurrentUser(session);
    setActiveSchool(matched);
    localStorage.setItem('devgyan_user_session', JSON.stringify(session));
    return { success: true };
  };

  const loginWithSecretToken = (token: string) => {
    const clean = token.trim().toUpperCase();
    if (!clean) return { success: false, message: 'Please provide a valid Security Token' };

    let matched = availableSchools.find((s) => clean.includes(s.code.toUpperCase()) || clean.includes(s.id.toUpperCase())) || activeSchool;
    let role: UserSession['role'] = 'TEACHER';
    let realName = 'Alok Verma';
    let designation = 'PGT Faculty';

    if (clean.includes('DEV') || clean.includes('ROOT') || clean.includes('7125')) {
      role = 'DEVELOPER';
      realName = 'Nitin Tripathi';
      designation = 'System Architect';
    } else if (clean.includes('P1') || clean.includes('PRIN')) {
      role = 'PRINCIPAL';
      realName = 'Dr. R. K. Sharma';
      designation = 'Principal';
    }

    const session: UserSession = {
      id: `TOK-${Date.now().toString().slice(-4)}`,
      name: realName,
      designation,
      email: `${realName.toLowerCase().replace(/[^a-z]/g, '')}@${matched.domain}`,
      role,
      schoolId: matched.id,
      schoolName: matched.name,
      assignedClasses: role === 'TEACHER' ? ['Class 10', 'Class 11 (Science)', 'Class 12 (Science)'] : undefined,
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
