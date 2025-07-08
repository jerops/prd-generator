import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { PRDFormData } from "@/types/prd";
import { Lightbulb } from "lucide-react";

interface SolutionSectionProps {
  form: UseFormReturn<PRDFormData>;
}

export function SolutionSection({ form }: SolutionSectionProps) {
  const techStack = form.watch('techStack') || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
            <Lightbulb className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <CardTitle className="text-2xl">Solution Approach</CardTitle>
            <CardDescription>Define your high-level approach and technology choices</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="solutionDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>High-level approach *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your proposed solution. How will it address the problem? What's the general approach?"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>Focus on the conceptual approach rather than technical details</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="platform"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary platform *</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { value: 'browser', label: 'Browser (HTML/CSS/JS)', icon: '🌐' },
                      { value: 'desktop', label: 'Desktop (Electron/Native)', icon: '🖥️' },
                      { value: 'webservice', label: 'Web Service (API)', icon: '🔌' },
                      { value: 'mobile', label: 'Mobile App', icon: '📱' },
                      { value: 'extension', label: 'Browser Extension', icon: '🧩' },
                      { value: 'cli', label: 'Command Line Tool', icon: '⚡' },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value={option.value} id={`platform-${option.value}`} />
                        <label htmlFor={`platform-${option.value}`} className="flex items-center cursor-pointer flex-1">
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

        <FormField
          control={form.control}
          name="techStack"
          render={() => (
            <FormItem>
              <FormLabel>Technology stack</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { value: 'vanilla', label: 'Vanilla JavaScript', icon: '🟡' },
                  { value: 'react', label: 'React/Vue/Angular', icon: '⚛️' },
                  { value: 'python', label: 'Python', icon: '🐍' },
                  { value: 'nodejs', label: 'Node.js', icon: '🟢' },
                  { value: 'php', label: 'PHP', icon: '🐘' },
                  { value: 'other', label: 'Other', icon: '💻' },
                ].map((option) => (
                  <FormField
                    key={option.value}
                    control={form.control}
                    name="techStack"
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

        {techStack.includes('other') && (
          <FormField
            control={form.control}
            name="techStackOther"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Please specify other technologies</FormLabel>
                <FormControl>
                  <Input placeholder="Please specify other technologies..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="complexity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project complexity *</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value}>
                  <div className="space-y-3">
                    {[
                      { 
                        value: 'simple', 
                        label: 'Simple (1-2 days)',
                        description: 'Basic functionality, minimal features',
                        color: 'text-green-500'
                      },
                      { 
                        value: 'moderate', 
                        label: 'Moderate (3-5 days)',
                        description: 'Multiple features, some integration',
                        color: 'text-yellow-500'
                      },
                      { 
                        value: 'complex', 
                        label: 'Complex (1+ weeks)',
                        description: 'Advanced features, multiple integrations',
                        color: 'text-orange-500'
                      },
                      { 
                        value: 'experimental', 
                        label: 'Experimental (unknown)',
                        description: 'Research required, uncertain scope',
                        color: 'text-purple-500'
                      },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value={option.value} id={`complexity-${option.value}`} />
                        <div className={`w-3 h-3 rounded-full ${option.color.replace('text-', 'bg-')}`} />
                        <label htmlFor={`complexity-${option.value}`} className="cursor-pointer flex-1">
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-gray-500">{option.description}</div>
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
