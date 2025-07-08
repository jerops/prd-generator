# Quick Deploy to GitHub Pages

## 🚀 5-Minute Setup

### Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Name: `prd-generator` 
3. **Important**: Make it **Public** (required for free GitHub Pages)
4. Click "Create repository"

### Step 2: Upload Your Code
**Option A - Easy Upload:**
1. Download all files from this Replit project
2. On your new GitHub repository page, click "uploading an existing file"
3. Drag and drop ALL files from your project
4. Commit with message: "Deploy PRD Generator"

**Option B - Git Commands:**
```bash
git init
git add .
git commit -m "Deploy PRD Generator"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/prd-generator.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository → **Settings** → **Pages**
2. Under "Source", select **"GitHub Actions"**
3. Click Save

### Step 4: Wait 5 minutes
Your PRD Generator will be live at:
**https://YOUR_USERNAME.github.io/prd-generator**

## 🎉 That's It!

Your team can now use the PRD Generator at your GitHub Pages URL. They can:
- Create comprehensive PRDs with smart suggestions
- Export PRDs as markdown files
- Deploy individual PRDs to their own GitHub Pages
- Use it on any device (mobile-friendly)

## 🔧 Making Updates

To update your deployed app:
1. Make changes in Replit
2. Download updated files
3. Upload to GitHub (replace existing files)
4. Site auto-updates in 2-3 minutes

## 📋 Team Instructions

Share this with your team:

> **Use our PRD Generator:** https://YOUR_USERNAME.github.io/prd-generator
> 
> This tool helps you create professional Product Requirements Documents with:
> - Smart technology suggestions
> - Guided form sections
> - Markdown export
> - GitHub Pages deployment for individual PRDs

## 🆘 Troubleshooting

**Site not loading?**
- Wait 10 minutes after first deployment
- Check repository is public
- Verify GitHub Pages is enabled in Settings

**Build failed?**
- Check Actions tab for errors
- Ensure all files were uploaded correctly

**Need custom domain?**
- Add CNAME file with your domain
- Configure DNS settings
- Enable HTTPS in Pages settings