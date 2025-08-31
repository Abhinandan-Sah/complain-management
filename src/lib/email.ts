import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendNewComplaintEmail(complaint: {
  title: string;
  category: string;
  priority: string;
  description: string;
}) {
  const mailOptions = {
    from: process.env.SMTP_FROM_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: `New Complaint Submitted: ${complaint.title}`,
    html: `
      <h2>New Complaint Submitted</h2>
      <p><strong>Title:</strong> ${complaint.title}</p>
      <p><strong>Category:</strong> ${complaint.category}</p>
      <p><strong>Priority:</strong> ${complaint.priority}</p>
      <p><strong>Description:</strong> ${complaint.description}</p>
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('New complaint email sent successfully');
  } catch (error) {
    console.error('Error sending new complaint email:', error);
    throw error;
  }
}

export async function sendStatusUpdateEmail(complaint: {
  title: string;
  status: string;
}) {
  const mailOptions = {
    from: process.env.SMTP_FROM_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: `Complaint Status Updated: ${complaint.title}`,
    html: `
      <h2>Complaint Status Updated</h2>
      <p><strong>Title:</strong> ${complaint.title}</p>
      <p><strong>New Status:</strong> ${complaint.status}</p>
      <p><strong>Updated:</strong> ${new Date().toLocaleString()}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Status update email sent successfully');
  } catch (error) {
    console.error('Error sending status update email:', error);
    throw error;
  }
}
