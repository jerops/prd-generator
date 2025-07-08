import { z } from "zod";

export const overviewSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  projectType: z.string().min(1, "Project type is required"),
  projectTypeOther: z.string().optional(),
  targetUsers: z.array(z.string()).min(1, "At least one target user is required"),
  motivation: z.string().min(1, "Motivation is required"),
});

export const problemSchema = z.object({
  problemDescription: z.string().min(1, "Problem description is required"),
  impactLevel: z.string().min(1, "Impact level is required"),
  timeAmount: z.string().optional(),
  timeUnit: z.string().optional(),
  timeFrequency: z.string().optional(),
  workarounds: z.array(z.string()).optional(),
});

export const solutionSchema = z.object({
  solutionDescription: z.string().min(1, "Solution description is required"),
  platform: z.string().min(1, "Platform is required"),
  techStack: z.array(z.string()).optional(),
  techStackOther: z.string().optional(),
  complexity: z.string().min(1, "Complexity is required"),
});

export const featuresSchema = z.object({
  coreFeatures: z.array(z.string()).min(1, "At least one core feature is required"),
  niceToHaveFeatures: z.array(z.string()).optional(),
  excludedFeatures: z.array(z.string()).optional(),
});

export const technicalSchema = z.object({
  browserSupport: z.array(z.string()).optional(),
  maxFileSize: z.string().optional(),
  responseTime: z.string().optional(),
  concurrentUsers: z.string().optional(),
  dataHandling: z.string().min(1, "Data handling is required"),
  securityLevel: z.string().min(1, "Security level is required"),
  dependencies: z.array(z.string()).optional(),
});

export const successSchema = z.object({
  successMetrics: z.array(z.object({
    name: z.string().min(1, "Metric name is required"),
    target: z.string().min(1, "Target value is required"),
    unit: z.string().min(1, "Unit is required"),
  })).min(1, "At least one success metric is required"),
  doneItems: z.array(z.string()).min(1, "At least one completion criterion is required"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  reviewProcess: z.string().optional(),
});

export const resourcesSchema = z.object({
  referenceDocuments: z.array(z.string()).default([]),
  dataSourceUrls: z.array(z.string()).default([]),
  designReferences: z.array(z.string()).default([]),
  competitorExamples: z.array(z.string()).default([]),
  technicalReferences: z.array(z.string()).default([]),
});

export const fullPRDSchema = overviewSchema
  .merge(problemSchema)
  .merge(solutionSchema)
  .merge(featuresSchema)
  .merge(technicalSchema)
  .merge(successSchema)
  .merge(resourcesSchema);
