import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { PRDFormData, FormSection } from "@/types/prd";
import { fullPRDSchema } from "@/lib/form-validation";
import { generatePRDMarkdown, downloadMarkdown } from "@/lib/prd-generator";
import { ProgressBar } from "@/components/progress-bar";
import { NavigationTabs } from "@/components/navigation-tabs";
import { PreviewModal } from "@/components/preview-modal";
import { OverviewSection } from "@/components/form-sections/overview-section";
import { ProblemSection } from "@/components/form-sections/problem-section";
import { SolutionSection } from "@/components/form-sections/solution-section";
import { FeaturesSection } from "@/components/form-sections/features-section";
import { TechnicalSection } from "@/components/form-sections/technical-section";
import { SuccessSection } from "@/components/form-sections/success-section";
import { ResourcesSection } from "@/components/form-sections/resources-section";
import { ArrowLeft, ArrowRight, Eye, Download, Save, FolderOpen } from "lucide-react";

const defaultValues: PRDFormData = {
  projectName: '',
  projectType: '',
  projectTypeOther: '',
  targetUsers: [],
  motivation: '',
  problemDescription: '',
  impactLevel: '',
  timeAmount: '',
  timeUnit: 'minutes',
  timeFrequency: 'task',
  workarounds: [],
  solutionDescription: '',
  platform: '',
  techStack: [],
  techStackOther: '',
  complexity: '',
  coreFeatures: [],
  niceToHaveFeatures: [],
  excludedFeatures: [],
  browserSupport: [],
  maxFileSize: '',
  responseTime: '',
  concurrentUsers: '',
  dataHandling: '',
  securityLevel: '',
  dependencies: [],
  successMetrics: [],
  doneItems: [],
  startDate: '',
  endDate: '',
  reviewProcess: '',
  
  // Resources & References
  referenceDocuments: [],
  dataSourceUrls: [],
  designReferences: [],
  competitorExamples: [],
  technicalReferences: [],
};

export function PRDForm() {
  const [currentSection, setCurrentSection] = useState<FormSection>('overview');
  const [previewModal, setPreviewModal] = useState(false);
  const [previewContent, setPreviewContent] = useState('');
  const [completedSections, setCompletedSections] = useState<Set<FormSection>>(new Set());
  const { toast } = useToast();

  const form = useForm<PRDFormData>({
    resolver: zodResolver(fullPRDSchema),
    defaultValues,
    mode: 'onChange',
  });

  const sections: FormSection[] = ['overview', 'problem', 'solution', 'features', 'technical', 'success', 'resources'];
  const currentSectionIndex = sections.indexOf(currentSection);

  // Calculate progress
  const calculateProgress = () => {
    const formData = form.getValues();
    let completedCount = 0;
    
    // Check each section for completion
    if (formData.projectName && formData.projectType && formData.targetUsers.length > 0 && formData.motivation) {
      completedCount++;
    }
    if (formData.problemDescription && formData.impactLevel) {
      completedCount++;
    }
    if (formData.solutionDescription && formData.platform && formData.complexity) {
      completedCount++;
    }
    if (formData.coreFeatures.length > 0) {
      completedCount++;
    }
    if (formData.dataHandling && formData.securityLevel) {
      completedCount++;
    }
    if (formData.successMetrics.length > 0 && formData.doneItems.length > 0) {
      completedCount++;
    }
    if ((formData.referenceDocuments?.length || 0) > 0 || (formData.dataSourceUrls?.length || 0) > 0 || 
        (formData.designReferences?.length || 0) > 0 || (formData.competitorExamples?.length || 0) > 0 || 
        (formData.technicalReferences?.length || 0) > 0) {
      completedCount++;
    }
    
    return Math.round((completedCount / sections.length) * 100);
  };

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const newProgress = calculateProgress();
    setProgress(newProgress);
    
    // Update completed sections
    const newCompletedSections = new Set<FormSection>();
    const formData = form.getValues();
    
    if (formData.projectName && formData.projectType && formData.targetUsers.length > 0 && formData.motivation) {
      newCompletedSections.add('overview');
    }
    if (formData.problemDescription && formData.impactLevel) {
      newCompletedSections.add('problem');
    }
    if (formData.solutionDescription && formData.platform && formData.complexity) {
      newCompletedSections.add('solution');
    }
    if (formData.coreFeatures.length > 0) {
      newCompletedSections.add('features');
    }
    if (formData.dataHandling && formData.securityLevel) {
      newCompletedSections.add('technical');
    }
    if (formData.successMetrics.length > 0 && formData.doneItems.length > 0) {
      newCompletedSections.add('success');
    }
    if ((formData.referenceDocuments?.length || 0) > 0 || (formData.dataSourceUrls?.length || 0) > 0 || 
        (formData.designReferences?.length || 0) > 0 || (formData.competitorExamples?.length || 0) > 0 || 
        (formData.technicalReferences?.length || 0) > 0) {
      newCompletedSections.add('resources');
    }
    
    setCompletedSections(newCompletedSections);
  }, [form.watch() && JSON.stringify(form.watch())]);

  // Auto-save to localStorage
  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem('prd-form-data', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('prd-form-data');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        form.reset(data);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  const handleSectionChange = (section: FormSection) => {
    setCurrentSection(section);
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSection(sections[currentSectionIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSection(sections[currentSectionIndex + 1]);
    }
  };

  const handlePreview = () => {
    const formData = form.getValues();
    const markdown = generatePRDMarkdown(formData);
    setPreviewContent(markdown);
    setPreviewModal(true);
  };

  const handleExport = () => {
    const formData = form.getValues();
    const markdown = generatePRDMarkdown(formData);
    const filename = `${formData.projectName || 'project'}-prd.md`;
    downloadMarkdown(markdown, filename);
    toast({
      title: "PRD exported successfully!",
      description: "Your PRD has been downloaded as a Markdown file.",
    });
  };

  const handleSave = () => {
    const formData = form.getValues();
    localStorage.setItem('prd-form-data', JSON.stringify(formData));
    toast({
      title: "Progress saved!",
      description: "Your progress has been saved locally.",
    });
  };

  const handleLoad = () => {
    const saved = localStorage.getItem('prd-form-data');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        form.reset(data);
        toast({
          title: "Progress loaded!",
          description: "Your saved progress has been restored.",
        });
      } catch (error) {
        toast({
          title: "Error loading data",
          description: "Could not load saved progress.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "No saved data found",
        description: "There is no saved progress to load.",
        variant: "destructive",
      });
    }
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'overview':
        return <OverviewSection form={form} />;
      case 'problem':
        return <ProblemSection form={form} />;
      case 'solution':
        return <SolutionSection form={form} />;
      case 'features':
        return <FeaturesSection form={form} />;
      case 'technical':
        return <TechnicalSection form={form} />;
      case 'success':
        return <SuccessSection form={form} />;
      case 'resources':
        return <ResourcesSection form={form} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">📄</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">PRD Generator</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Progress
              </Button>
              <Button variant="outline" size="sm" onClick={handleLoad}>
                <FolderOpen className="w-4 h-4 mr-2" />
                Load Saved
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <ProgressBar value={progress} />

      {/* Navigation */}
      <NavigationTabs
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
        completedSections={completedSections}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Form {...form}>
          <form className="space-y-8">
            {renderCurrentSection()}
            
            {/* Navigation Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentSectionIndex === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <div className="flex space-x-3">
                <Button type="button" variant="outline" onClick={handlePreview}>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview PRD
                </Button>
                <Button type="button" onClick={handleExport}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Markdown
                </Button>
              </div>

              {currentSectionIndex < sections.length - 1 && (
                <Button
                  type="button"
                  onClick={handleNext}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </form>
        </Form>
      </main>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={previewModal}
        onClose={() => setPreviewModal(false)}
        content={previewContent}
        onExport={handleExport}
        projectName={form.getValues().projectName}
      />
    </div>
  );
}
