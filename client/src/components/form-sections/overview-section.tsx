import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { PRDFormData } from "@/types/prd";
import { Info, Sparkles } from "lucide-react";

interface OverviewSectionProps {
  form: UseFormReturn<PRDFormData>;
}

export function OverviewSection({ form }: OverviewSectionProps) {
  const projectType = form.watch('projectType');
  const targetUsers = form.watch('targetUsers') || [];

  const suggestProjectType = () => {
    // Smart suggestions based on target users and deployment flexibility
    let suggestion = '';
    
    // Browser apps work both on GitHub Pages AND locally - maximum flexibility
    if (targetUsers.includes('external') || targetUsers.includes('clients')) {
      suggestion = 'browser'; // Works on GitHub Pages + locally
    }
    // Team sharing works great with browser apps (GitHub Pages + local dev)
    else if (targetUsers.includes('team')) {
      suggestion = 'browser'; // Easy sharing via GitHub Pages, local development
    }
    // Personal use - browser apps still great for GitHub Pages + local flexibility
    else if (targetUsers.includes('yourself')) {
      suggestion = 'browser'; // Use locally or deploy to GitHub Pages anytime
    }
    
    if (suggestion) {
      form.setValue('projectType', suggestion);
    }
  };

  const canSuggestProjectType = targetUsers.length > 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
            <Info className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">Project Overview</CardTitle>
            <CardDescription>Define the basic scope and context of your project</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter your project name" {...field} />
              </FormControl>
              <FormDescription>Choose a clear, descriptive name for your project</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectType"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between mb-2">
                <FormLabel>What are you building? *</FormLabel>
                {canSuggestProjectType && (
                  <Button 
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={suggestProjectType}
                    className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                  >
                    <Sparkles className="w-4 h-4 mr-1" />
                    Smart Suggestion
                  </Button>
                )}
              </div>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { value: 'browser', label: 'Browser Application', icon: '🌐' },
                      { value: 'desktop', label: 'Local Desktop Tool', icon: '🖥️' },
                      { value: 'api', label: 'Web Service/API', icon: '🔌' },
                      { value: 'extension', label: 'Browser Extension', icon: '🧩' },
                      { value: 'mobile', label: 'Mobile App', icon: '📱' },
                      { value: 'other', label: 'Other', icon: '⚡' },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value={option.value} id={option.value} />
                        <label htmlFor={option.value} className="flex items-center cursor-pointer flex-1">
                          <span className="mr-2">{option.icon}</span>
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {projectType === 'other' && (
          <FormField
            control={form.control}
            name="projectTypeOther"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Please specify</FormLabel>
                <FormControl>
                  <Input placeholder="Please specify..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="targetUsers"
          render={() => (
            <FormItem>
              <FormLabel>Who is this for? *</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { value: 'yourself', label: 'Yourself', icon: '👤' },
                  { value: 'team', label: 'Team Members', icon: '👥' },
                  { value: 'clients', label: 'Clients', icon: '🤝' },
                  { value: 'external', label: 'External Users', icon: '🌍' },
                ].map((option) => (
                  <FormField
                    key={option.value}
                    control={form.control}
                    name="targetUsers"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(option.value)}
                            onCheckedChange={(checked) => {
                              const current = field.value || [];
                              if (checked) {
                                field.onChange([...current, option.value]);
                              } else {
                                field.onChange(current.filter((item) => item !== option.value));
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="flex items-center cursor-pointer flex-1">
                          <span className="mr-2">{option.icon}</span>
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="motivation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main motivation *</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { value: 'productivity', label: 'Personal Productivity', icon: '🚀' },
                      { value: 'efficiency', label: 'Team Efficiency', icon: '⚡' },
                      { value: 'client', label: 'Client Requirement', icon: '💼' },
                      { value: 'business', label: 'Business Need', icon: '📈' },
                      { value: 'learning', label: 'Learning/Experiment', icon: '🎓' },
                      { value: 'other', label: 'Other', icon: '❓' },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value={option.value} id={`motivation-${option.value}`} />
                        <label htmlFor={`motivation-${option.value}`} className="flex items-center cursor-pointer flex-1">
                          <span className="mr-2">{option.icon}</span>
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
