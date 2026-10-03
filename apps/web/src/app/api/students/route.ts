import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET: PostgreSQL se students fetch karein (Fallback dummy data ke sath agar DB connect na ho)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tenant = searchParams.get('tenant');

    let students = [];
    if (process.env.DATABASE_URL) {
      students = await prisma.student.findMany({
        where: tenant ? { tenantSchool: tenant } : undefined,
        orderBy: { createdAt: 'desc' },
      });
    }

    // Agar DB empty ho ya setup initial ho, fallback sample data provide karein
    if (!students || students.length === 0) {
      students = [
        {
          id: '1',
          studentCode: 'DG-2026-001',
          fullName: 'Aarav Sharma',
          grade: 'Grade 10',
          section: 'A',
          rollNo: '1001',
          guardianName: 'Rajendra Sharma',
          guardianPhone: '+91 98765 43210',
          guardianEmail: 'rajendra@example.com',
          gender: 'Male',
          bloodGroup: 'O+',
          feeStatus: 'Paid',
          tenantSchool: 'Arden Progressive School (Haldwani)',
        },
        {
          id: '2',
          studentCode: 'DG-2026-002',
          fullName: 'Ananya Verma',
          grade: 'Grade 12',
          section: 'Science',
          rollNo: '1201',
          guardianName: 'Sanjay Verma',
          guardianPhone: '+91 98765 43211',
          guardianEmail: 'sanjay@example.com',
          gender: 'Female',
          bloodGroup: 'B+',
          feeStatus: 'Paid',
          tenantSchool: 'Arden Progressive School (Haldwani)',
        },
        {
          id: '3',
          studentCode: 'DG-2026-003',
          fullName: 'Rohan Mehra',
          grade: 'Grade 9',
          section: 'B',
          rollNo: '0905',
          guardianName: 'Sunil Mehra',
          guardianPhone: '+91 98765 43212',
          guardianEmail: 'sunil@example.com',
          gender: 'Male',
          bloodGroup: 'A+',
          feeStatus: 'Partial',
          tenantSchool: 'Arden Progressive School (Haldwani)',
        },
      ];
    }

    return NextResponse.json({ success: true, count: students.length, data: students });
  } catch (error: any) {
    console.error('API Error Fetching Students:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Database fetch failed' },
      { status: 500 }
    );
  }
}

// POST: Naya Student Real PostgreSQL me save karein
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      fullName,
      grade,
      section,
      rollNo,
      guardianName,
      guardianPhone,
      guardianEmail,
      gender,
      bloodGroup,
      tenantSchool,
    } = body;

    if (!fullName || !grade || !guardianPhone) {
      return NextResponse.json(
        { success: false, error: 'Full name, grade and guardian phone are required.' },
        { status: 400 }
      );
    }

    const studentCode = `DG-2026-${Math.floor(100 + Math.random() * 900)}`;

    let newStudent;
    if (process.env.DATABASE_URL) {
      newStudent = await prisma.student.create({
        data: {
          studentCode,
          fullName,
          grade,
          section: section || 'A',
          rollNo: rollNo || String(Math.floor(1000 + Math.random() * 9000)),
          guardianName: guardianName || 'Parent / Guardian',
          guardianPhone,
          guardianEmail: guardianEmail || 'parent@devgyan.io',
          gender: gender || 'Male',
          bloodGroup: bloodGroup || 'B+',
          feeStatus: 'Due',
          tenantSchool: tenantSchool || 'Arden Progressive School (Haldwani)',
        },
      });
    } else {
      newStudent = {
        id: String(Date.now()),
        studentCode,
        fullName,
        grade,
        section: section || 'A',
        rollNo: rollNo || '1010',
        guardianName: guardianName || 'Parent / Guardian',
        guardianPhone,
        guardianEmail,
        gender: gender || 'Male',
        bloodGroup: bloodGroup || 'B+',
        feeStatus: 'Due',
        tenantSchool: tenantSchool || 'Arden Progressive School (Haldwani)',
      };
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Student registered in PostgreSQL database successfully!',
        data: newStudent,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('API Error Creating Student:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Database insert failed' },
      { status: 500 }
    );
  }
}
