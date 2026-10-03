import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tenant = searchParams.get('tenant');

    const students = await prisma.student.findMany({
      where: tenant ? { tenantSchool: tenant } : undefined,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, count: students.length, data: students });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const studentCode = `DG-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newStudent = await prisma.student.create({
      data: {
        studentCode,
        admissionNo: body.admissionNo || `SR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        apaarId: body.apaarId || null,
        aadhaarNo: body.aadhaarNo || null,
        fullName: body.fullName || 'Student',
        dateOfBirth: body.dateOfBirth || '2011-04-15',
        gender: body.gender || 'Male',
        bloodGroup: body.bloodGroup || 'B+',
        category: body.category || 'General',
        grade: body.grade || 'Class 10',
        stream: body.stream || 'General',
        section: body.section || 'A',
        rollNo: body.rollNo || '1001',
        enrolledSubjects: body.enrolledSubjects || [],
        fatherName: body.fatherName || '',
        fatherOccupation: body.fatherOccupation || '',
        motherName: body.motherName || '',
        motherOccupation: body.motherOccupation || '',
        guardianPhone: body.guardianPhone || '',
        guardianEmail: body.guardianEmail || '',
        familyAnnualIncome: body.familyAnnualIncome || '',
        residentialAddress: body.residentialAddress || '',
        city: body.city || 'Haldwani',
        district: body.district || 'Nainital',
        state: body.state || 'Uttarakhand',
        pincode: body.pincode || '263139',
        transportMode: body.transportMode || 'School Bus Fleet',
        busStopName: body.busStopName || '',
        feeStatus: body.feeStatus || 'Due',
        tenantSchool: body.tenantSchool || 'Arden Progressive School (Haldwani)',
      },
    });

    return NextResponse.json({ success: true, data: newStudent }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    const updated = await prisma.student.update({
      where: { id },
      data: {
        admissionNo: updateData.admissionNo,
        apaarId: updateData.apaarId || null,
        aadhaarNo: updateData.aadhaarNo || null,
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

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
