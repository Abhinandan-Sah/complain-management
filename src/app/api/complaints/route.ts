import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Complaint from '@/models/Complaint';
import { sendNewComplaintEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { title, description, category, priority } = body;

    // Validate required fields
    if (!title || !description || !category || !priority) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new complaint
    const complaint = await Complaint.create({
      title,
      description,
      category,
      priority,
    });

    // Send email notification
    try {
      await sendNewComplaintEmail({
        title,
        category,
        priority,
        description,
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(complaint, { status: 201 });
  } catch (error) {
    console.error('Error creating complaint:', error);
    return NextResponse.json(
      { error: 'Failed to create complaint' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');

    // Build filter object
    const filter: Record<string, string> = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const complaints = await Complaint.find(filter).sort({ dateSubmitted: -1 });
    
    return NextResponse.json(complaints);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    return NextResponse.json(
      { error: 'Failed to fetch complaints' },
      { status: 500 }
    );
  }
}
