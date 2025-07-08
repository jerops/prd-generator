import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PRDFormData } from "@/types/prd";
import { List, Plus, X, GripVertical } from "lucide-react";

interface FeaturesSectionProps {
  form: UseFormReturn<PRDFormData>;
}

export function FeaturesSection({ form }: FeaturesSectionProps) {
  const coreFeatures = form.watch('coreFeatures') || [];
  const niceToHaveFeatures = form.watch('niceToHaveFeatures') || [];
  const excludedFeatures = form.watch('excludedFeatures') || [];

  const addFeature = (type: 'coreFeatures' | 'niceToHaveFeatures' | 'excludedFeatures') => {
    const current = form.getValues(type) || [];
    form.setValue(type, [...current, '']);
  };

  const removeFeature = (type: 'coreFeatures' | 'niceToHaveFeatures' | 'excludedFeatures', index: number) => {
    const current = form.getValues(type) || [];
    form.setValue(type, current.filter((_, i) => i !== index));
  };

  const updateFeature = (type: 'coreFeatures' | 'niceToHaveFeatures' | 'excludedFeatures', index: number, value: string) => {
    const current = form.getValues(type) || [];
    const updated = [...current];
    updated[index] = value;
    form.setValue(type, updated);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
            <List className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-2xl">Key Features</CardTitle>
            <CardDescription>Define what your project will and won't include</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Core Features */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <FormLabel className="text-sm font-medium text-gray-700">Core Features (Must Have) *</FormLabel>
            <Button 
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addFeature('coreFeatures')}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Feature
            </Button>
          </div>
          <div className="space-y-3">
            {coreFeatures.map((feature, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                  <Input
                    placeholder="Describe a core feature..."
                    value={feature}
                    onChange={(e) => updateFeature('coreFeatures', index, e.target.value)}
                    className="flex-1 border-0 bg-transparent focus:ring-2 focus:ring-primary"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFeature('coreFeatures', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            {coreFeatures.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No core features added yet. Click "Add Feature" to get started.</p>
              </div>
            )}
          </div>
          <FormDescription className="mt-2">
            Essential features that must be included for the project to be successful
          </FormDescription>
        </div>

        {/* Nice-to-Have Features */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <FormLabel className="text-sm font-medium text-gray-700">Nice-to-Have Features</FormLabel>
            <Button 
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addFeature('niceToHaveFeatures')}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Feature
            </Button>
          </div>
          <div className="space-y-3">
            {niceToHaveFeatures.map((feature, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Input
                    placeholder="Describe a nice-to-have feature..."
                    value={feature}
                    onChange={(e) => updateFeature('niceToHaveFeatures', index, e.target.value)}
                    className="flex-1 border-0 bg-transparent focus:ring-2 focus:ring-primary"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFeature('niceToHaveFeatures', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <FormDescription className="mt-2">
            Features that would enhance the project but aren't essential for launch
          </FormDescription>
        </div>

        {/* Excluded Features */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <FormLabel className="text-sm font-medium text-gray-700">Explicitly NOT Included</FormLabel>
            <Button 
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addFeature('excludedFeatures')}
              className="border-red-200 text-red-600 hover:bg-red-100"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Exclusion
            </Button>
          </div>
          <div className="space-y-3">
            {excludedFeatures.map((feature, index) => (
              <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Input
                    placeholder="What won't be included..."
                    value={feature}
                    onChange={(e) => updateFeature('excludedFeatures', index, e.target.value)}
                    className="flex-1 border-0 bg-transparent focus:ring-2 focus:ring-red-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFeature('excludedFeatures', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <FormDescription className="mt-2">
            Clarify what features or functionality will not be part of this project
          </FormDescription>
        </div>
      </CardContent>
    </Card>
  );
}
