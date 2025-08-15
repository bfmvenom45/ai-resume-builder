# AI Resume Builder

A modern, AI-powered resume analysis application built with React Router v7, TypeScript, and Puter.js.

## Features

- 🤖 **AI-Powered Analysis**: Get detailed feedback on your resume using advanced AI
- 📊 **ATS Compatibility**: Check how well your resume passes Applicant Tracking Systems
- 🎯 **Targeted Feedback**: Analyze resumes for specific job positions
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🔐 **Secure Authentication**: User authentication powered by Puter.js
- � **PDF Processing**: Automatic PDF to image conversion for preview
- 💾 **Cloud Storage**: Store resumes and analysis results in the cloud

## Tech Stack

- **Frontend**: React 19.1.0, React Router v7
- **TypeScript**: 5.8.3 for type safety
- **Styling**: Tailwind CSS 4.1.4 with custom animations
- **Backend**: Puter.js for authentication, storage, and AI analysis
- **PDF Processing**: PDF.js 5.4.54
- **Build Tool**: Vite 6.3.3

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd ai-resume-builder
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open your browser and navigate to \`http://localhost:5173\`

## Project Structure

\`\`\`
app/
├── components/          # React components
│   ├── ATS.tsx         # ATS score display
│   ├── Category.tsx    # Score category badges
│   ├── Details.tsx     # Detailed analysis
│   ├── ErrorMessage.tsx # Error handling
│   ├── FileUploader.tsx # PDF upload component
│   ├── LoadingSpinner.tsx # Loading states
│   ├── Navbar.tsx      # Navigation
│   ├── ResumeCard.tsx  # Resume preview cards
│   ├── ScoreBadge.tsx  # Score indicators
│   ├── ScoreCircle.tsx # Circular score display
│   ├── ScoreGauge.tsx  # Score gauge component
│   └── Summary.tsx     # Overall analysis summary
├── lib/                # Utility libraries
│   ├── helpers.ts      # Helper functions
│   ├── pdf2image.ts    # PDF conversion utilities
│   ├── puter.ts        # Puter.js integration
│   └── utils.ts        # General utilities
├── routes/             # Page routes
│   ├── auth.tsx        # Authentication page
│   ├── home.tsx        # Home page
│   ├── resume.tsx      # Resume details page
│   └── upload.tsx      # Upload page
├── app.css            # Global styles
├── root.tsx           # Root component
└── routes.ts          # Route configuration
\`\`\`

## Features Overview

### Resume Upload & Analysis
- Drag & drop PDF upload with validation
- Automatic PDF to image conversion for preview
- AI-powered analysis with detailed feedback
- ATS compatibility scoring

### Feedback Categories
- **Overall Score**: Combined rating across all categories
- **ATS Compatibility**: How well the resume passes tracking systems
- **Content Quality**: Assessment of resume content and relevance
- **Structure & Format**: Layout and organization evaluation
- **Skills Assessment**: Skills alignment with job requirements
- **Tone & Style**: Professional presentation evaluation

### User Experience
- Clean, modern interface with smooth animations
- Responsive design for all screen sizes
- Real-time processing status updates
- Error handling with helpful messages
- Secure cloud storage and authentication

## Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run typecheck\` - Run TypeScript type checking

## Deployment

### Docker Deployment

Build and run using Docker:

\`\`\`bash
docker build -t ai-resume-builder .
docker run -p 3000:3000 ai-resume-builder
\`\`\`

### Manual Deployment

1. Build the application:
\`\`\`bash
npm run build
\`\`\`

2. Deploy the \`build/\` directory to your hosting platform

## Environment Configuration

The application uses Puter.js for backend services, which requires no additional environment configuration. Simply ensure you have:

- Puter.js script loaded (handled automatically)
- Proper authentication flow setup
- PDF.js worker files accessible

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Puter.js](https://puter.com/) for backend services
- [React Router](https://reactrouter.com/) for routing
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [PDF.js](https://mozilla.github.io/pdf.js/) for PDF processing
