import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tenant = searchParams.get('tenant');

    let students = [];
    try {
      students = await prisma.student.findMany({
        where: tenant ? { tenantSchool: tenant } : undefined,
        orderBy: { createdAt: 'desc' },
      });
    } catch (dbErr) {
      console.warn('DB query fallback:', dbErr);
    }

    return NextResponse.json({ success: true, count: students.length, data: students });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const studentCode = `DG-2026-${Math.floor(100 + Math.random() * 900)}`;

    let newStudent;
    try {
      newStudent = await prisma.student.create({
        data: {
          studentCode,
          admissionNo: body.admissionNo || `SR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          apaarId: body.apaarId || null,
          aadhaarNo: body.aadhaarNo || null,
          fullName: body.fullName,
          dateOfBirth: body.dateOfBirth || '2012-01-01',
          gender: body.gender || 'Male',
          bloodGroup: body.bloodGroup || 'B+',
          category: body.category || 'General',
          grade: body.grade,
          stream: body.stream || 'General',
          section: body.section || 'A',
          rollNo: body.rollNo || '1001',
          enrolledSubjects: body.enrolledSubjects || [],
          fatherName: body.fatherName || 'Father',
          fatherOccupation: body.fatherOccupation || '',
          motherName: body.motherName || 'Mother',
          motherOccupation: body.motherOccupation || '',
          guardianPhone: body.guardianPhone,
          guardianEmail: body.guardianEmail || '',
          familyAnnualIncome: body.familyAnnualIncome || '',
          residentialAddress: body.residentialAddress || 'Haldwani',
          city: body.city || 'Haldwani',
          district: body.district || 'Nainital',
          state: body.state || 'Uttarakhand',
          pincode: body.pincode || '263139',
          transportMode: body.transportMode || 'Self',
          busStopName: body.busStopName || '',
          feeStatus: body.feeStatus || 'Due',
          tenantSchool: body.tenantSchool || 'Arden Progressive School (Haldwani)',
        },
      });
    } catch (dbErr: any) {
      return NextResponse.json({ success: false, error: dbErr.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: newStudent }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT: Real Database UPDATE endpoint for editing Student Dossier
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Student ID is required for update' }, { status: 400 });
    }

    const updated = await prisma.student.update({
      where: { id },
      data: {
        admissionNo: updateData.admissionNo,
        apaarId: updateData.apaarId,
        aadhaarNo: updateData.aadhaarNo,
        fullName: updateData.fullName,
        dateOfBirth: updateData.dateOfBirth,
        gender: updateData.gender,
        bloodGroup: updateData.bloodGroup,
        category: updateData.category,
        grade: updateData.grade,
        stream: updateData.stream,
        section: updateData.section,
        rollNo: updateData.rollNo,
        enrolledSubjects: updateData.enrolledSubjects || [],
        fatherName: updateData.fatherName,
        fatherOccupation: updateData.fatherOccupation,
        motherName: updateData.motherName,
        motherOccupation: updateData.motherOccupation,
        guardianPhone: updateData.guardianPhone,
        guardianEmail: updateData.guardianEmail,
        residentialAddress: updateData.residentialAddress,
        city: updateData.city,
        transportMode: updateData.transportMode,
        busStopName: updateData.busStopName,
        feeStatus: updateData.feeStatus,
      },
    });

    return NextResponse.json({ success: true, message: 'Dossier updated successfully!', data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
