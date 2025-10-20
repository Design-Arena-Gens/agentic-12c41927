# Deployment Information

## Production Deployment

**Live URL:** https://agentic-12c41927.vercel.app

**Deployment Date:** October 20, 2025

**Status:** ✅ Active and Running

## Quick Start Guide

### Admin Access
1. Navigate to https://agentic-12c41927.vercel.app/admin
2. Login with default credentials:
   - Email: `admin@certifyx.io`
   - Password: `ChangeMe123!`
3. Upload the sample certificate template (`sample-certificate-template.pptx`)
4. Approve issuer registrations

### Issuer Registration & Usage
1. Navigate to https://agentic-12c41927.vercel.app/issuer
2. Register with your email and password
3. Wait for admin approval
4. Login after approval
5. Fill in certificate fields:
   - NAME: Student's full name
   - DATE_OF_BIRTH: Format YYYY-MM-DD
   - DEGREE: Degree program name
6. Click "Generate PPTX" to create certificate
7. Download the generated certificate

### Certificate Verification
1. Navigate to https://agentic-12c41927.vercel.app/verify
2. Upload a certificate image (PNG, JPG, PDF, etc.)
3. System will:
   - Extract text using OCR
   - Match against database
   - Verify blockchain hash
   - Display results

## Architecture

### Frontend
- **Framework:** Next.js 14 with App Router
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Deployment:** Vercel Edge Network

### Backend
- **API:** Next.js API Routes (Serverless Functions)
- **Database:** In-memory storage (MongoDB optional)
- **Authentication:** JWT with bcrypt password hashing
- **Blockchain:** Local chain (Ethereum-compatible optional)

### Security Features
1. **JWT Authentication:** 2-hour token expiration
2. **Role-Based Access Control:** Admin and Issuer roles
3. **Approval Workflow:** Admin must approve new issuers
4. **Password Hashing:** bcrypt with salt rounds
5. **Blockchain Verification:** SHA-256 hashing for certificates

## Environment Configuration

The application works out-of-the-box with in-memory storage. For production use with persistent data, configure these environment variables in Vercel:

```env
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secure-jwt-secret
BLOCKCHAIN_RPC_URL=your-blockchain-rpc-url
BLOCKCHAIN_PRIVATE_KEY=your-blockchain-private-key
ADMIN_EMAIL=your-admin-email
ADMIN_PASSWORD=your-admin-password
```

## Features Implemented

### ✅ Three Portal System
- Admin Portal: Template management and issuer approval
- Issuer Portal: Certificate generation with approval workflow
- Verification Portal: OCR-based certificate verification

### ✅ Security
- JWT authentication with role-based access
- Password hashing with bcrypt
- Blockchain integration for tamper-proof certificates
- Issuer approval workflow

### ✅ Certificate Processing
- PPTX template upload and management
- Dynamic field replacement (NAME, DATE_OF_BIRTH, DEGREE, etc.)
- Certificate generation and download
- Blockchain hash storage

### ✅ Verification
- OCR text extraction using Tesseract.js
- Database matching by name and DOB
- Blockchain hash verification
- Detailed verification results

## Testing the Application

### Test Workflow

1. **Admin Setup:**
   ```
   Login → Upload Template → Approve Issuer
   ```

2. **Issuer Flow:**
   ```
   Register → Wait for Approval → Login → Generate Certificate → Download
   ```

3. **Verification Flow:**
   ```
   Upload Certificate → View Verification Results
   ```

### Sample Data

Use the included `sample-certificate-template.pptx` for testing. It includes placeholders:
- `{NAME}` - Student name
- `{DATE_OF_BIRTH}` - Date of birth
- `{DEGREE}` - Degree program

## Monitoring & Logs

View deployment logs in Vercel dashboard:
https://vercel.com/arcada-agentic-models/agentic-12c41927

## Known Limitations

1. **In-Memory Storage:** Data is lost on server restart (use MongoDB for persistence)
2. **Local Blockchain:** Blockchain data is not persisted to external chain by default
3. **OCR Accuracy:** Tesseract.js accuracy depends on image quality
4. **File Size:** Certificate uploads limited to 20MB

## Future Enhancements

1. Connect to MongoDB for persistent storage
2. Integrate with Ethereum mainnet/testnet for blockchain verification
3. Add Gemini AI for enhanced OCR accuracy
4. Implement rate limiting for API endpoints
5. Add email notifications for issuer approvals
6. Support for multiple certificate templates
7. Batch certificate generation
8. Advanced search and filtering
9. Certificate revocation system
10. Audit logs and analytics

## Support

For issues or questions:
- GitHub: https://github.com/Design-Arena-Gens/agentic-12c41927
- Devin Run: https://app.devin.ai/sessions/c113d92e5d91418d81471e6ee3234b14

## Credits

Built by Devin for Design Arena Founders (@grxxce)
