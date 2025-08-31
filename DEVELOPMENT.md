# Complaint Management System - Development Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Environment Variables**
   Copy `.env.local` and update with your actual values:
   - MongoDB connection string
   - Email service credentials (Gmail/SendGrid/Mailgun)

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   - User Interface: http://localhost:3000
   - Admin Dashboard: http://localhost:3000/admin

## MongoDB Setup Options

### Option 1: Local MongoDB
```bash
# Windows
mongod --dbpath "C:\data\db"

# macOS/Linux
mongod --dbpath /usr/local/var/mongodb
```

### Option 2: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/atlas
2. Create cluster
3. Get connection string
4. Update MONGODB_URI in .env.local

## Email Configuration Examples

### Gmail SMTP
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_EMAIL=your-email@gmail.com
ADMIN_EMAIL=admin@yourcompany.com
```

### SendGrid
```env
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM_EMAIL=noreply@yourcompany.com
ADMIN_EMAIL=admin@yourcompany.com
```

## Testing the Application

1. **Submit a Complaint**
   - Go to http://localhost:3000
   - Fill out the form
   - Check admin email for notification

2. **Manage Complaints**
   - Go to http://localhost:3000/admin
   - View, filter, and update complaints
   - Check email for status update notifications

## API Testing with curl

### Create Complaint
```bash
curl -X POST http://localhost:3000/api/complaints \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Complaint",
    "description": "This is a test complaint",
    "category": "Product",
    "priority": "High"
  }'
```

### Get All Complaints
```bash
curl http://localhost:3000/api/complaints
```

### Update Complaint Status
```bash
curl -X PATCH http://localhost:3000/api/complaints/COMPLAINT_ID \
  -H "Content-Type: application/json" \
  -d '{"status": "Resolved"}'
```

### Delete Complaint
```bash
curl -X DELETE http://localhost:3000/api/complaints/COMPLAINT_ID
```

## Deployment

### Vercel
1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

### Railway
1. Connect GitHub repository
2. Add environment variables
3. Deploy

### Self-Hosted
1. Build the application: `npm run build`
2. Start production server: `npm start`
3. Ensure MongoDB and email service are accessible

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check MONGODB_URI format
   - Ensure MongoDB is running
   - Check network connectivity

2. **Email Not Sending**
   - Verify email credentials
   - Check spam folder
   - Ensure SMTP settings are correct

3. **Build Errors**
   - Run `npm run build` to check for TypeScript errors
   - Check file imports and exports

4. **Port Already in Use**
   - Kill process using port 3000: `npx kill-port 3000`
   - Or use different port: `PORT=3001 npm run dev`

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run type checking
npx tsc --noEmit
```
