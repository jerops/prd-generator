import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, ExternalLink, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GitHubDeployButtonProps {
  prdContent: string;
  projectName: string;
}

export function GitHubDeployButton({ prdContent, projectName }: GitHubDeployButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [repoName, setRepoName] = useState(projectName.toLowerCase().replace(/\s+/g, '-') || 'my-project');
  const { toast } = useToast();

  const generateGitHubPagesSetup = () => {
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName || 'My Project'}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        h1, h2, h3 { color: #333; }
        pre { background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto; }
        code { background: #f0f0f0; padding: 2px 4px; border-radius: 3px; }
        .prd-content { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    </style>
</head>
<body>
    <div class="prd-content">
        <div id="prd-markdown"></div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script>
        const prdMarkdown = \`${prdContent.replace(/`/g, '\\`')}\`;
        document.getElementById('prd-content').innerHTML = marked.parse(prdMarkdown);
    </script>
</body>
</html>`;

    return {
      'index.html': indexHtml,
      'README.md': prdContent,
      '.github/workflows/pages.yml': `name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`
    };
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: "Copied to clipboard!",
    });
  };

  const files = generateGitHubPagesSetup();

  const instructions = `## GitHub Pages Deployment Instructions

1. **Create a new repository on GitHub**
   - Go to https://github.com/new
   - Repository name: \`${repoName}\`
   - Make it public (required for free GitHub Pages)

2. **Upload these files to your repository:**
   - Create \`index.html\` (copy content below)
   - Create \`README.md\` (copy PRD content)
   - Create \`.github/workflows/pages.yml\` (copy workflow below)

3. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: "GitHub Actions"
   - Save

4. **Your site will be live at:**
   https://YOUR_USERNAME.github.io/${repoName}

The workflow will automatically deploy your PRD as a beautiful web page whenever you push changes!`;

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        className="bg-gray-900 hover:bg-gray-800 text-white"
        size="sm"
      >
        <Github className="w-4 h-4 mr-2" />
        Deploy to GitHub Pages
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Github className="w-5 h-5" />
              Deploy to GitHub Pages
            </DialogTitle>
            <DialogDescription>
              Get your PRD live on the web in minutes with GitHub Pages
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label htmlFor="repo-name">Repository Name</Label>
              <Input
                id="repo-name"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                placeholder="my-awesome-project"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Setup Instructions</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(instructions)}
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy Instructions
                </Button>
              </div>
              <Textarea
                value={instructions}
                readOnly
                className="h-32 text-sm"
              />
            </div>

            {Object.entries(files).map(([filename, content]) => (
              <div key={filename} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{filename}</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(content)}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={content}
                  readOnly
                  className="h-24 text-sm font-mono"
                />
              </div>
            ))}

            <div className="flex justify-between items-center pt-4 border-t">
              <a
                href="https://github.com/new"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Create Repository on GitHub
              </a>
              <Button onClick={() => setShowModal(false)}>
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}