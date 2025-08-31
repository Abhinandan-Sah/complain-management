# Complaint Management System

A full-stack web application built with Next.js, TypeScript, MongoDB, and Nodemailer for managing customer complaints efficiently.

## Features

### User Authentication
- **User Registration**: Create new accounts with email and password
- **User Login**: Secure authentication with bcrypt password hashing
- **Role-based Access**: User and Admin roles with different permissions
- **Google OAuth Ready**: Framework ready for Google sign-in integration
- **Session Management**: Persistent login sessions across browser sessions

### User Interface
- **Complaint Submission Form**: Users can submit complaints with title, description, category, and priority
- **Admin Dashboard**: Admins can view, filter, update status, and delete complaints
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Filtering**: Filter complaints by status and priority

### Backend Features
- **MongoDB Integration**: Complete CRUD operations for complaint management
- **Email Notifications**: Automatic email alerts for new complaints and status updates
- **RESTful API**: Clean API endpoints for all operations
- **Input Validation**: Server-side validation for all data

### Email Notifications
- **New Complaint Alert**: Admins receive emails when new complaints are submitted
- **Status Update Alert**: Admins receive confirmation emails when complaint status is updated

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Email Service**: Nodemailer (supports SMTP, SendGrid, Mailgun)
- **Styling**: Tailwind CSS for responsive design

## Prerequisites

Before running this application, make sure you have:

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Email service credentials (Gmail, SendGrid, or Mailgun)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd complaint-management-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/complaint-management
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/complaint-management

# Authentication Configuration
NEXTAUTH_SECRET=your-random-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (Optional - for Google Sign-in)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email Configuration (choose one)

# Option 1: Gmail SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_EMAIL=your-email@gmail.com
ADMIN_EMAIL=admin@yourcompany.com

# Option 2: SendGrid (uncomment if using)
# SENDGRID_API_KEY=your-sendgrid-api-key
# SENDGRID_FROM_EMAIL=your-verified-sender@yourcompany.com

# Option 3: Mailgun (uncomment if using)
# MAILGUN_API_KEY=your-mailgun-api-key
# MAILGUN_DOMAIN=your-mailgun-domain
# MAILGUN_FROM_EMAIL=noreply@your-mailgun-domain
```

### 4. MongoDB Setup

#### Local MongoDB:
1. Install MongoDB on your local machine
2. Start MongoDB service
3. The application will create the database automatically

#### MongoDB Atlas (Cloud):
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string and update `MONGODB_URI` in `.env.local`

### 5. Email Service Setup

#### Gmail Setup:
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: Google Account → Security → App passwords
3. Use the app password in `SMTP_PASSWORD`

#### SendGrid Setup:
1. Create account at [SendGrid](https://sendgrid.com/)
2. Generate API key
3. Verify sender email address
4. Update environment variables

#### Mailgun Setup:
1. Create account at [Mailgun](https://www.mailgun.com/)
2. Get API key and domain
3. Update environment variables

### 6. Create Demo Users (Optional)

To create demo accounts for testing:

```bash
# Make a POST request to create demo users
curl -X POST http://localhost:3000/api/auth/seed-users
```

This creates:
- **Admin Account**: admin@demo.com / password123
- **User Account**: user@demo.com / password123

### 7. Run the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

The application will be available at `http://localhost:3000`

## Usage

### For Users:
1. **Create an Account**: Visit `/auth/signup` to register
2. **Sign In**: Use `/auth/signin` or demo account (user@demo.com / password123)
3. **Submit Complaints**: Fill out the complaint form with all required fields
4. **Admin Notification**: Admin will receive an email notification

### For Administrators:
1. **Sign In as Admin**: Use admin@demo.com / password123 or create admin account
2. **Access Dashboard**: Navigate to `/admin` (only visible to admin users)
3. **Manage Complaints**: View all complaints in the dashboard
4. **Filter & Search**: Filter complaints by status or priority
5. **Update Status**: Change complaint status using dropdown menus
6. **View Details**: Click on complaint titles to view full details
7. **Delete Complaints**: Remove complaints using the delete button
8. **Email Notifications**: Receive emails for status updates

## API Endpoints

### Complaints
- `POST /api/complaints` - Create a new complaint
- `GET /api/complaints` - Get all complaints (supports filtering)
- `PATCH /api/complaints/[id]` - Update complaint status
- `DELETE /api/complaints/[id]` - Delete a complaint

### Query Parameters for GET /api/complaints:
- `status` - Filter by status (Pending, In Progress, Resolved)
- `priority` - Filter by priority (Low, Medium, High)

Example: `/api/complaints?status=Pending&priority=High`

## Database Schema

### Complaint Model:
```javascript
{
  title: String (required, max 100 chars)
  description: String (required, max 1000 chars)
  category: String (required, enum: ['Product', 'Service', 'Support'])
  priority: String (required, enum: ['Low', 'Medium', 'High'])
  status: String (default: 'Pending', enum: ['Pending', 'In Progress', 'Resolved'])
  dateSubmitted: Date (auto-generated)
}
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── complaints/
│   │       ├── route.ts          # GET, POST complaints
│   │       └── [id]/
│   │           └── route.ts      # PATCH, DELETE complaint
│   ├── admin/
│   │   └── page.tsx             # Admin dashboard page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/
│   ├── AdminDashboard.tsx       # Admin interface
│   ├── ComplaintForm.tsx        # User complaint form
│   └── Navigation.tsx           # Navigation component
├── lib/
│   ├── email.ts                 # Email utility functions
│   └── mongodb.ts               # Database connection
├── models/
│   └── Complaint.ts             # Mongoose schema
└── types/
    └── global.d.ts              # TypeScript declarations
```

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Alternative Platforms
- **Netlify**: For static deployment
- **Railway**: For full-stack deployment
- **Heroku**: Traditional PaaS deployment

## Screenshots

### User Interface - Complaint Submission
![Complaint Form](screenshots/complaint-form.png)

### Admin Dashboard
![Admin Dashboard](screenshots/admin-dashboard.png)

### Complaint Details Modal
![Complaint Details](screenshots/complaint-details.png)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@yourcompany.com or create an issue in the repository.

## Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the database solution
- Tailwind CSS for the utility-first CSS framework
- Nodemailer for email functionality
#   c o m p l a i n - m a n a g e m e n t  
 