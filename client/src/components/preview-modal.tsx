import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download } from "lucide-react";
import { GitHubDeployButton } from "./github-deploy-button";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  onExport: () => void;
  projectName?: string;
}

export function PreviewModal({ isOpen, onClose, content, onExport, projectName }: PreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>PRD Preview</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-96">
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-lg">
              {content}
            </pre>
          </div>
        </ScrollArea>
        <div className="flex justify-between pt-4 border-t">
          <GitHubDeployButton prdContent={content} projectName={projectName || 'My Project'} />
          <Button onClick={onExport} className="bg-primary hover:bg-primary/90">
            <Download className="w-4 h-4 mr-2" />
            Export Markdown
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
