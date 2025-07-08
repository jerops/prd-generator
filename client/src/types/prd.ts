export interface PRDFormData {
  // Project Overview
  projectName: string;
  projectType: string;
  projectTypeOther?: string;
  targetUsers: string[];
  motivation: string;
  
  // Problem Statement
  problemDescription: string;
  impactLevel: string;
  timeAmount: string;
  timeUnit: string;
  timeFrequency: string;
  workarounds: string[];
  
  // Solution Approach
  solutionDescription: string;
  platform: string;
  techStack: string[];
  techStackOther?: string;
  complexity: string;
  
  // Key Features
  coreFeatures: string[];
  niceToHaveFeatures: string[];
  excludedFeatures: string[];
  
  // Technical Considerations
  browserSupport: string[];
  maxFileSize: string;
  responseTime: string;
  concurrentUsers: string;
  dataHandling: string;
  securityLevel: string;
  dependencies: string[];
  
  // Success Criteria
  successMetrics: SuccessMetric[];
  doneItems: string[];
  startDate: string;
  endDate: string;
  reviewProcess: string;
}

export interface SuccessMetric {
  name: string;
  target: string;
  unit: string;
}

export type FormSection = 'overview' | 'problem' | 'solution' | 'features' | 'technical' | 'success';

export interface SectionInfo {
  id: FormSection;
  title: string;
  description: string;
  icon: string;
  isRequired: boolean;
}
