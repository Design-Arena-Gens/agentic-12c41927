# Certificate Verification System

A production-ready certificate verification application with blockchain integration, JWT authentication, and PPTX-based certificate generation.

## 🚀 Live Demo

**Production URL:** https://agentic-12c41927.vercel.app

## 📋 Description

This is a comprehensive certificate verification system with three portals: Admin, Issuer, and Verification. It includes blockchain security, JWT authentication, OCR-based verification, and dynamic PPTX certificate generation.

## ✨ Features

### Three Portal System

1. **Admin Portal** (`/admin`)
   - Manage certificate templates (PPTX format)
   - Approve/revoke certificate issuers
   - Full administrative control
   - Default credentials: `admin@certifyx.io` / `ChangeMe123!`

2. **Issuer Portal** (`/issuer`)
   - Register and await admin approval
   - Generate certificates from approved templates
   - Dynamic field replacement (NAME, DATE_OF_BIRTH, DEGREE, etc.)
   - Download generated certificates

3. **Verification Portal** (`/verify`)
   - Upload certificates for verification
   - OCR-based data extraction using Tesseract.js
   - Blockchain verification
   - Database matching

### Security Features

- **JWT Authentication**: Secure token-based authentication with 2-hour expiration
- **Role-Based Access Control**: Admin and Issuer roles with different permissions
- **Approval Workflow**: New issuers must be approved by admin before accessing the system
- **Blockchain Integration**: Certificate hashes stored in blockchain for tamper-proof verification
- **Password Hashing**: bcrypt with salt rounds for secure password storage
- **In-Memory Fallback**: Works without MongoDB for development/testing

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/)
- MongoDB (optional - uses in-memory storage if not provided)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/Design-Arena-Gens/agentic-12c41927.git
   cd agentic-12c41927
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local .env.local.example
   # Edit .env.local with your configuration
   ```

4. Run development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
├── app/
│   ├── admin/           # Admin portal
│   ├── issuer/          # Issuer portal
│   ├── verify/          # Verification portal
│   ├── api/             # API routes
│   │   ├── auth/        # Authentication endpoints
│   │   ├── admin/       # Admin endpoints
│   │   ├── certificate/ # Certificate generation
│   │   └── verify/      # Verification endpoint
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── lib/
│   ├── db.ts            # Database models and connection
│   ├── jwt.ts           # JWT utilities
│   ├── blockchain.ts    # Blockchain integration
│   ├── pptx.ts          # PPTX processing
│   ├── ai.ts            # OCR integration
│   └── verify.ts        # Verification logic
├── public/              # Static assets
└── package.json         # Dependencies
```

## 🛠️ Available Scripts

- `npm run dev` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm start` - Starts the production server

## 🔧 Environment Variables

Create a `.env.local` file with the following:

```env
# MongoDB (optional - uses in-memory storage if not provided)
MONGODB_URI=mongodb://localhost:27017/certificates

# JWT Secret (required for production)
JWT_SECRET=your-secure-secret-key

# Blockchain (optional - uses local chain if not provided)
BLOCKCHAIN_RPC_URL=https://your-rpc-url
BLOCKCHAIN_PRIVATE_KEY=your-private-key

# Admin Credentials
ADMIN_EMAIL=admin@certifyx.io
ADMIN_PASSWORD=ChangeMe123!

# Gemini AI (optional - for enhanced OCR)
GEMINI_API_KEY=your-gemini-api-key
```

## 📚 Technologies Used

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (serverless)
- **Database**: MongoDB (with in-memory fallback)
- **Authentication**: JWT (jsonwebtoken)
- **Blockchain**: Ethers.js (supports any EVM-compatible chain)
- **Certificate Processing**: JSZip for PPTX manipulation
- **OCR**: Tesseract.js for text extraction
- **Deployment**: Vercel

## 📖 Usage Guide

### Admin Workflow

1. Login with admin credentials at `/admin`
2. Upload a PPTX template with placeholder fields like `{NAME}`, `{DATE_OF_BIRTH}`, `{DEGREE}`
3. Approve issuer registration requests by entering their email and clicking "Approve"

### Issuer Workflow

1. Register at `/issuer` with email and password
2. Wait for admin approval
3. Login after approval
4. Fill in certificate fields (NAME, DATE_OF_BIRTH, DEGREE)
5. Click "Generate PPTX" to create certificate
6. Download the generated certificate

### Verification Workflow

1. Go to `/verify`
2. Upload a certificate image (PNG, JPG, etc.)
3. System extracts text using OCR
4. Matches against database records
5. Verifies blockchain hash
6. Displays verification results

## 🔒 Security Considerations

1. **Change Default Credentials**: Update `ADMIN_EMAIL` and `ADMIN_PASSWORD` in production
2. **Use Strong JWT Secret**: Generate a secure random string for `JWT_SECRET`
3. **Enable MongoDB**: Use a proper database in production instead of in-memory storage
4. **HTTPS Only**: Ensure all traffic uses HTTPS in production
5. **Rate Limiting**: Consider adding rate limiting for API endpoints
6. **Input Validation**: All inputs are validated on the server side

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new issuer
- `POST /api/auth/login` - Login (admin/issuer)

### Admin
- `POST /api/admin/approve` - Approve/revoke issuer
- `POST /api/admin/templates` - Upload PPTX template
- `GET /api/admin/templates` - Download active template

### Certificate
- `POST /api/certificate/generate` - Generate certificate (issuer only)

### Verification
- `POST /api/verify` - Verify uploaded certificate

## 📄 License

ISC

## 👥 Credits

Built by Devin for Design Arena Founders
- Devin Run: https://app.devin.ai/sessions/c113d92e5d91418d81471e6ee3234b14
- GitHub: @grxxce
