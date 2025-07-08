import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PRDFormData } from "@/types/prd";
import { Target, Plus, X, CheckSquare } from "lucide-react";

interface SuccessSectionProps {
  form: UseFormReturn<PRDFormData>;
}

export function SuccessSection({ form }: SuccessSectionProps) {
  const successMetrics = form.watch('successMetrics') || [];
  const doneItems = form.watch('doneItems') || [];

  const addMetric = () => {
    const current = form.getValues('successMetrics') || [];
    form.setValue('successMetrics', [...current, { name: '', target: '', unit: 'count' }]);
  };

  const removeMetric = (index: number) => {
    const current = form.getValues('successMetrics') || [];
    form.setValue('successMetrics', current.filter((_, i) => i !== index));
  };

  const updateMetric = (index: number, field: string, value: string) => {
    const current = form.getValues('successMetrics') || [];
    const updated = [...current];
    updated[index] = { ...updated[index], [field]: value };
    form.setValue('successMetrics', updated);
  };

  const addDoneItem = () => {
    const current = form.getValues('doneItems') || [];
    form.setValue('doneItems', [...current, '']);
  };

  const removeDoneItem = (index: number) => {
    const current = form.getValues('doneItems') || [];
    form.setValue('doneItems', current.filter((_, i) => i !== index));
  };

  const updateDoneItem = (index: number, value: string) => {
    const current = form.getValues('doneItems') || [];
    const updated = [...current];
    updated[index] = value;
    form.setValue('doneItems', updated);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
            <Target className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <CardTitle className="text-2xl">Success Criteria</CardTitle>
            <CardDescription>Define how you'll measure project success</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Success Metrics */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <FormLabel className="text-sm font-medium text-gray-700">Success Metrics *</FormLabel>
            <Button 
              type="button"
              variant="outline"
              size="sm"
              onClick={addMetric}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Metric
            </Button>
          </div>
          <div className="space-y-3">
            {successMetrics.map((metric, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    placeholder="Metric name..."
                    value={metric.name}
                    onChange={(e) => updateMetric(index, 'name', e.target.value)}
                    className="border border-gray-300 focus:ring-2 focus:ring-primary"
                  />
                  <Input
                    placeholder="Target value..."
                    value={metric.target}
                    onChange={(e) => updateMetric(index, 'target', e.target.value)}
                    className="border border-gray-300 focus:ring-2 focus:ring-primary"
                  />
                  <div className="flex items-center space-x-2">
                    <Select 
                      value={metric.unit} 
                      onValueChange={(value) => updateMetric(index, 'unit', value)}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="seconds">seconds</SelectItem>
                        <SelectItem value="minutes">minutes</SelectItem>
                        <SelectItem value="hours">hours</SelectItem>
                        <SelectItem value="days">days</SelectItem>
                        <SelectItem value="%">%</SelectItem>
                        <SelectItem value="count">count</SelectItem>
                        <SelectItem value="score">score</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMetric(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {successMetrics.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No success metrics added yet. Click "Add Metric" to get started.</p>
              </div>
            )}
          </div>
          <FormDescription className="mt-2">
            Quantifiable metrics to measure project success
          </FormDescription>
        </div>

        {/* Definition of Done */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <FormLabel className="text-sm font-medium text-gray-700">Definition of Done *</FormLabel>
            <Button 
              type="button"
              variant="outline"
              size="sm"
              onClick={addDoneItem}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Item
            </Button>
          </div>
          <div className="space-y-3">
            {doneItems.map((item, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <CheckSquare className="w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Completion criterion..."
                    value={item}
                    onChange={(e) => updateDoneItem(index, e.target.value)}
                    className="flex-1 border-0 bg-transparent focus:ring-2 focus:ring-primary"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDoneItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            {doneItems.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No completion criteria added yet. Click "Add Item" to get started.</p>
              </div>
            )}
          </div>
          <FormDescription className="mt-2">
            Clear criteria that must be met for the project to be considered complete
          </FormDescription>
        </div>

        {/* Timeline */}
        <div>
          <FormLabel className="text-sm font-medium text-gray-700 mb-2 block">Project Timeline</FormLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-gray-600">Target Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-gray-600">Target Completion Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Review Process */}
        <FormField
          control={form.control}
          name="reviewProcess"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review Process</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="How will the project be reviewed and validated? Who needs to approve it?"
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>Define the approval process and stakeholder sign-off requirements</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
