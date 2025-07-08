# Deploy PRD Generator to GitHub Pages

## Quick Setup (5 minutes)

### 1. Create GitHub Repository
1. Go to [GitHub.com](https://github.com/new)
2. Repository name: `prd-generator` (or your preferred name)
3. Make it **Public** (required for free GitHub Pages)
4. Click "Create repository"

### 2. Upload Your Code
You have two options:

#### Option A: Use GitHub Web Interface
1. Click "uploading an existing file" on your new repository page
2. Drag and drop all files from your project folder
3. Commit with message: "Initial PRD Generator setup"

#### Option B: Use Git Commands
```bash
git init
git add .
git commit -m "Initial PRD Generator setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/prd-generator.git
git push -u origin main
```

### 3. Configure GitHub Pages
1. Go to repository **Settings** → **Pages**
2. Source: Select "**GitHub Actions**"
3. Save

### 4. Your Site Will Be Live At:
`https://YOUR_USERNAME.github.io/prd-generator`

## What Gets Deployed

Your PRD Generator will be available as a professional web application with:
- Full form functionality for creating PRDs
- Smart suggestions for technology choices
- Export to markdown
- One-click GitHub Pages deployment for individual PRDs
- Responsive design that works on all devices

## Build Process

The included GitHub Actions workflow will:
1. Build your React app automatically
2. Deploy to GitHub Pages
3. Make it available at your GitHub Pages URL
4. Update automatically when you push changes

## Updating Your Deployed App

Simply push changes to your main branch:
```bash
git add .
git commit -m "Update PRD Generator"
git push
```

The site will automatically update in 2-3 minutes.

## Team Usage

Share this URL with your team:
`https://YOUR_USERNAME.github.io/prd-generator`

Team members can:
- Create comprehensive PRDs using the guided form
- Get smart technology suggestions
- Export PRDs as markdown files
- Deploy individual PRDs to their own GitHub Pages

## Troubleshooting

**If the site doesn't load:**
1. Check that your repository is public
2. Verify GitHub Pages is enabled in Settings → Pages
3. Wait 5-10 minutes after first deployment
4. Check the Actions tab for any build errors

**If you see a 404 error:**
- Make sure the repository name matches your Pages URL
- Check that the GitHub Actions workflow completed successfully

## Advanced: Custom Domain (Optional)

To use your own domain (e.g., `prd.yourcompany.com`):
1. Add a `CNAME` file to your repository with your domain
2. Configure DNS settings with your domain provider
3. Enable HTTPS in GitHub Pages settings