import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PRDFormData } from "@/types/prd";
import { AlertTriangle } from "lucide-react";

interface ProblemSectionProps {
  form: UseFormReturn<PRDFormData>;
}

export function ProblemSection({ form }: ProblemSectionProps) {
  const workarounds = form.watch('workarounds') || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <CardTitle className="text-2xl">Problem Statement</CardTitle>
            <CardDescription>Clearly define the problem you're solving</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="problemDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What problem are you solving? *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the problem in detail. What pain points do users currently face? What workflows are inefficient?"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>Be specific about the current state and why it's problematic</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="impactLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How much impact does this problem have? *</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value}>
                  <div className="space-y-3">
                    {[
                      { 
                        value: 'low', 
                        label: 'Low (Minor inconvenience)',
                        description: 'Slightly annoying but doesn\'t block work',
                        color: 'text-green-500'
                      },
                      { 
                        value: 'medium', 
                        label: 'Medium (Noticeable inefficiency)',
                        description: 'Causes delays and reduces productivity',
                        color: 'text-yellow-500'
                      },
                      { 
                        value: 'high', 
                        label: 'High (Major pain point)',
                        description: 'Significantly impacts workflow and outcomes',
                        color: 'text-orange-500'
                      },
                      { 
                        value: 'critical', 
                        label: 'Critical (Blocking work)',
                        description: 'Prevents completion of essential tasks',
                        color: 'text-red-500'
                      },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value={option.value} id={`impact-${option.value}`} />
                        <div className={`w-3 h-3 rounded-full ${option.color.replace('text-', 'bg-')}`} />
                        <label htmlFor={`impact-${option.value}`} className="cursor-pointer flex-1">
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

        <div>
          <FormLabel>How much time does this problem cost?</FormLabel>
          <div className="flex space-x-3 mt-2">
            <FormField
              control={form.control}
              name="timeAmount"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="number" placeholder="0" className="w-24" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timeUnit"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minutes">Minutes</SelectItem>
                        <SelectItem value="hours">Hours</SelectItem>
                        <SelectItem value="days">Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span className="flex items-center text-gray-500">per</span>
            <FormField
              control={form.control}
              name="timeFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="task">Task</SelectItem>
                        <SelectItem value="day">Day</SelectItem>
                        <SelectItem value="week">Week</SelectItem>
                        <SelectItem value="month">Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="workarounds"
          render={() => (
            <FormItem>
              <FormLabel>Current workarounds</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { value: 'manual', label: 'Manual process', icon: '✋' },
                  { value: 'thirdparty', label: 'Third-party tools', icon: '🔧' },
                  { value: 'spreadsheets', label: 'Spreadsheets', icon: '📊' },
                  { value: 'none', label: 'No current solution', icon: '❌' },
                ].map((option) => (
                  <FormField
                    key={option.value}
                    control={form.control}
                    name="workarounds"
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
      </CardContent>
    </Card>
  );
}
