import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PRDFormData } from "@/types/prd";
import { BookOpen, Plus, X } from "lucide-react";

interface ResourcesSectionProps {
  form: UseFormReturn<PRDFormData>;
}

export function ResourcesSection({ form }: ResourcesSectionProps) {
  const referenceDocuments = form.watch('referenceDocuments') || [];
  const dataSourceUrls = form.watch('dataSourceUrls') || [];
  const designReferences = form.watch('designReferences') || [];
  const competitorExamples = form.watch('competitorExamples') || [];
  const technicalReferences = form.watch('technicalReferences') || [];

  const addItem = (fieldName: keyof PRDFormData, newItem: string) => {
    if (newItem.trim()) {
      const currentItems = (form.getValues(fieldName) as string[]) || [];
      form.setValue(fieldName, [...currentItems, newItem.trim()]);
    }
  };

  const removeItem = (fieldName: keyof PRDFormData, index: number) => {
    const currentItems = (form.getValues(fieldName) as string[]) || [];
    form.setValue(fieldName, currentItems.filter((_, i) => i !== index));
  };

  const DynamicListField = ({ 
    fieldName, 
    label, 
    placeholder, 
    description, 
    items 
  }: {
    fieldName: keyof PRDFormData;
    label: string;
    placeholder: string;
    description: string;
    items: string[];
  }) => {
    const [newItem, setNewItem] = React.useState('');

    return (
      <div className="space-y-3">
        <div>
          <FormLabel className="text-base font-medium">{label}</FormLabel>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
        
        {items.length > 0 && (
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <span className="flex-1 text-sm">{item}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(fieldName, index)}
                  className="h-6 w-6 p-0 text-gray-500 hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex gap-2">
          <Input
            placeholder={placeholder}
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addItem(fieldName, newItem);
                setNewItem('');
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              addItem(fieldName, newItem);
              setNewItem('');
            }}
            disabled={!newItem.trim()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
            <BookOpen className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <CardTitle className="text-2xl">Resources & References</CardTitle>
            <CardDescription>Document sources, references, and materials for the project</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <DynamicListField
          fieldName="referenceDocuments"
          label="Reference Documents"
          placeholder="Add document title or URL..."
          description="Existing documents, specifications, or materials that inform this project"
          items={referenceDocuments}
        />

        <DynamicListField
          fieldName="dataSourceUrls"
          label="Data Sources & APIs"
          placeholder="Add data source URL or API endpoint..."
          description="External data sources, APIs, or databases the project will use"
          items={dataSourceUrls}
        />

        <DynamicListField
          fieldName="designReferences"
          label="Design References"
          placeholder="Add design reference URL or description..."
          description="UI/UX inspiration, mockups, wireframes, or design systems"
          items={designReferences}
        />

        <DynamicListField
          fieldName="competitorExamples"
          label="Competitor Examples"
          placeholder="Add competitor URL or example..."
          description="Similar products or solutions to analyze and learn from"
          items={competitorExamples}
        />

        <DynamicListField
          fieldName="technicalReferences"
          label="Technical References"
          placeholder="Add technical documentation URL..."
          description="Technical documentation, tutorials, or implementation guides"
          items={technicalReferences}
        />
      </CardContent>
    </Card>
  );
}