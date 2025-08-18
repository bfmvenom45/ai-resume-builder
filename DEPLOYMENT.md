# Deployment Instructions

## Quick Deploy Options

### 1. Vercel (Recommended) ⚡️
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/bfmvenom45/ai-resume-builder)

1. Click the "Deploy with Vercel" button above
2. Connect your GitHub account
3. Deploy automatically

### 2. Netlify 🚀
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/bfmvenom45/ai-resume-builder)

1. Click the "Deploy to Netlify" button above
2. Connect your GitHub account
3. Deploy automatically

### 3. Railway 🚂
1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Clone repo: `git clone https://github.com/bfmvenom45/ai-resume-builder.git`
4. Enter directory: `cd ai-resume-builder`
5. Initialize: `railway init`
6. Deploy: `railway up`

### 4. Render 🔄
1. Go to [render.com](https://render.com)
2. Connect your GitHub repo
3. Choose "Static Site"
4. Build command: `npm run build`
5. Publish directory: `build/client`

## Manual Deployment

### Prerequisites
- Node.js 20+
- npm or yarn

### Steps
1. Clone the repository:
```bash
git clone https://github.com/bfmvenom45/ai-resume-builder.git
cd ai-resume-builder
```

2. Install dependencies:
```bash
npm install
```

3. Build for production:
```bash
npm run build
```

4. Upload the `build/client/` folder to your hosting provider

## Docker Deployment 🐳

1. Build the image:
```bash
docker build -t ai-resume-builder .
```

2. Run the container:
```bash
docker run -p 3000:3000 ai-resume-builder
```

## Environment Variables

No environment variables are required for this project as it uses Puter.js for backend services.

## Post-Deployment Checklist

- [ ] App loads correctly
- [ ] PDF upload works
- [ ] Authentication flows properly
- [ ] Resume analysis functions
- [ ] All routes are accessible
- [ ] Mobile responsive design works

## Support

If you encounter any issues during deployment, please:
1. Check the console for errors
2. Verify all dependencies are installed
3. Ensure Node.js version is 20+
4. Review the build logs

## Credits

Built following the tutorial by JavaScript Mastery:
[Build a Mind-Blowing AI Resume Builder SaaS with React Router v7](https://www.youtube.com/watch?v=iYOz165wGkQ)
