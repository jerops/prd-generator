import { PRDFormData } from "@/types/prd";

export function generatePRDMarkdown(data: PRDFormData): string {
  const sections = [
    generateOverviewSection(data),
    generateProblemSection(data),
    generateSolutionSection(data),
    generateFeaturesSection(data),
    generateTechnicalSection(data),
    generateSuccessSection(data),
  ];

  return sections.join('\n\n');
}

function generateOverviewSection(data: PRDFormData): string {
  const projectType = data.projectType === 'other' ? data.projectTypeOther : data.projectType;
  
  return `# Project Requirements Document: ${data.projectName || 'Untitled Project'}

## 1. Project Overview

**Project Name:** ${data.projectName || 'Not specified'}

**Project Type:** ${projectType || 'Not specified'}

**Target Users:** ${data.targetUsers?.join(', ') || 'Not specified'}

**Main Motivation:** ${data.motivation || 'Not specified'}`;
}

function generateProblemSection(data: PRDFormData): string {
  const timeImpact = data.timeAmount && data.timeUnit && data.timeFrequency 
    ? `${data.timeAmount} ${data.timeUnit} per ${data.timeFrequency}`
    : 'Not specified';

  return `## 2. Problem Statement

### Problem Description
${data.problemDescription || 'Not specified'}

### Impact Level
${data.impactLevel || 'Not specified'}

### Time Impact
${timeImpact}

### Current Workarounds
${data.workarounds?.join(', ') || 'Not specified'}`;
}

function generateSolutionSection(data: PRDFormData): string {
  const techStack = data.techStack?.includes('other') 
    ? [...data.techStack.filter(t => t !== 'other'), data.techStackOther || ''].filter(Boolean)
    : data.techStack || [];

  return `## 3. Solution Approach

### High-level Approach
${data.solutionDescription || 'Not specified'}

### Primary Platform
${data.platform || 'Not specified'}

### Technology Stack
${techStack.join(', ') || 'Not specified'}

### Project Complexity
${data.complexity || 'Not specified'}`;
}

function generateFeaturesSection(data: PRDFormData): string {
  const coreFeatures = data.coreFeatures?.map(f => `- ${f}`).join('\n') || '- Not specified';
  const niceToHaveFeatures = data.niceToHaveFeatures?.map(f => `- ${f}`).join('\n') || '- Not specified';
  const excludedFeatures = data.excludedFeatures?.map(f => `- ${f}`).join('\n') || '- Not specified';

  return `## 4. Key Features

### Core Features (Must Have)
${coreFeatures}

### Nice-to-Have Features
${niceToHaveFeatures}

### Explicitly NOT Included
${excludedFeatures}`;
}

function generateTechnicalSection(data: PRDFormData): string {
  return `## 5. Technical Considerations

### Browser Support
${data.browserSupport?.join(', ') || 'Not specified'}

### Performance Requirements
- Max file size: ${data.maxFileSize || 'Not specified'} MB
- Response time: ${data.responseTime || 'Not specified'} seconds
- Concurrent users: ${data.concurrentUsers || 'Not specified'}

### Data Handling
${data.dataHandling || 'Not specified'}

### Security Level
${data.securityLevel || 'Not specified'}

### Dependencies
${data.dependencies?.join(', ') || 'Not specified'}`;
}

function generateSuccessSection(data: PRDFormData): string {
  const successMetrics = data.successMetrics?.map(m => `- ${m.name}: ${m.target} ${m.unit}`).join('\n') || '- Not specified';
  const doneItems = data.doneItems?.map(item => `- ${item}`).join('\n') || '- Not specified';

  return `## 6. Success Criteria

### Success Metrics
${successMetrics}

### Definition of Done
${doneItems}

### Timeline
- Start Date: ${data.startDate || 'Not specified'}
- End Date: ${data.endDate || 'Not specified'}

### Review Process
${data.reviewProcess || 'Not specified'}

---

*Generated on ${new Date().toLocaleDateString()} using PRD Generator*`;
}

export function downloadMarkdown(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
