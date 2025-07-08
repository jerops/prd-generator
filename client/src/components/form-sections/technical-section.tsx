import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { PRDFormData } from "@/types/prd";
import { Settings, Sparkles } from "lucide-react";

interface TechnicalSectionProps {
  form: UseFormReturn<PRDFormData>;
}

export function TechnicalSection({ form }: TechnicalSectionProps) {
  const browserSupport = form.watch('browserSupport') || [];
  const dependencies = form.watch('dependencies') || [];
  
  // Watch project context for smart suggestions
  const projectType = form.watch('projectType');
  const targetUsers = form.watch('targetUsers') || [];
  const platform = form.watch('platform');
  const complexity = form.watch('complexity');
  const techStack = form.watch('techStack') || [];
  const coreFeatures = form.watch('coreFeatures') || [];

  const generateTechnicalSuggestions = () => {
    const suggestions: Partial<PRDFormData> = {};

    // Browser support suggestions - default to all browsers for GitHub/local usage
    if (projectType === 'browser' || platform === 'browser') {
      suggestions.browserSupport = ['chrome', 'firefox', 'safari', 'edge', 'mobile'];
    } else if (projectType === 'mobile' || platform === 'mobile') {
      suggestions.browserSupport = ['mobile'];
    } else {
      // For GitHub/local projects, support all browsers
      suggestions.browserSupport = ['chrome', 'firefox', 'safari', 'edge', 'mobile'];
    }

    // Performance requirements based on complexity and users
    if (complexity === 'simple') {
      suggestions.maxFileSize = '10';
      suggestions.responseTime = '2';
      suggestions.concurrentUsers = '10';
    } else if (complexity === 'moderate') {
      suggestions.maxFileSize = '50';
      suggestions.responseTime = '5';
      suggestions.concurrentUsers = '100';
    } else if (complexity === 'complex') {
      suggestions.maxFileSize = '200';
      suggestions.responseTime = '10';
      suggestions.concurrentUsers = '1000';
    }

    // Data handling suggestions - optimized for local + GitHub Pages flexibility
    if (targetUsers.includes('yourself') && !targetUsers.includes('external')) {
      suggestions.dataHandling = 'local'; // Works great locally and on GitHub Pages
    } else if (targetUsers.includes('team') || targetUsers.includes('clients')) {
      suggestions.dataHandling = 'local'; // Start simple, works locally + GitHub Pages
    } else if (targetUsers.includes('external')) {
      suggestions.dataHandling = 'local'; // GitHub Pages compatible, can upgrade later
    }

    // Security level suggestions
    if (targetUsers.includes('external')) {
      suggestions.securityLevel = 'sensitive';
    } else if (targetUsers.includes('clients')) {
      suggestions.securityLevel = 'internal';
    } else if (targetUsers.includes('yourself')) {
      suggestions.securityLevel = 'public';
    }

    // Smart dependency suggestions based on project context
    const deps = [];
    
    // Based on technology stack
    if (techStack.includes('react')) {
      deps.push('libraries'); // React ecosystem libraries
    } else if (techStack.includes('vanilla') && complexity !== 'simple') {
      deps.push('libraries'); // Utility libraries for complex vanilla JS
    }
    
    // Based on project type and features
    if (projectType === 'browser' || platform === 'browser') {
      if (complexity === 'moderate' || complexity === 'complex') {
        deps.push('libraries'); // UI libraries, state management
      }
    }
    
    // API dependencies for data-heavy projects
    if (targetUsers.includes('external') || targetUsers.includes('clients')) {
      deps.push('apis'); // Likely needs external data or services
    }
    
    // Extension-specific dependencies
    if (projectType === 'extension' || platform === 'extension') {
      deps.push('permissions'); // Browser extension permissions
    }
    
    // Mobile-specific dependencies
    if (projectType === 'mobile' || platform === 'mobile') {
      deps.push('libraries'); // Mobile UI libraries
    }
    
    // Desktop app dependencies
    if (projectType === 'desktop' || platform === 'desktop') {
      deps.push('libraries'); // Desktop framework libraries
    }
    
    // API/service dependencies
    if (projectType === 'api' || platform === 'webservice') {
      deps.push('apis'); // External services and databases
      deps.push('libraries'); // Backend libraries
    }
    
    // Feature-based dependency suggestions
    const featureText = coreFeatures.join(' ').toLowerCase();
    
    // Check for specific feature patterns that require dependencies
    if (featureText.includes('chart') || featureText.includes('graph') || featureText.includes('visualization')) {
      deps.push('libraries'); // Charting libraries like Chart.js
    }
    
    if (featureText.includes('map') || featureText.includes('location') || featureText.includes('geo')) {
      deps.push('apis'); // Map APIs like Google Maps
    }
    
    if (featureText.includes('payment') || featureText.includes('stripe') || featureText.includes('checkout')) {
      deps.push('apis'); // Payment processing APIs
    }
    
    if (featureText.includes('auth') || featureText.includes('login') || featureText.includes('user')) {
      deps.push('apis'); // Authentication services
    }
    
    if (featureText.includes('email') || featureText.includes('notification') || featureText.includes('sms')) {
      deps.push('apis'); // Communication APIs
    }
    
    if (featureText.includes('pdf') || featureText.includes('export') || featureText.includes('download')) {
      deps.push('libraries'); // PDF generation libraries
    }
    
    if (featureText.includes('image') || featureText.includes('photo') || featureText.includes('upload')) {
      deps.push('libraries'); // Image processing libraries
    }
    
    if (featureText.includes('animation') || featureText.includes('transition') || featureText.includes('interactive')) {
      deps.push('libraries'); // Animation libraries
    }
    
    // Remove duplicates and suggest based on what we found
    suggestions.dependencies = [...new Set(deps)];

    // Apply suggestions to form
    Object.entries(suggestions).forEach(([key, value]) => {
      if (value !== undefined) {
        form.setValue(key as keyof PRDFormData, value);
      }
    });
  };

  // Check if we have enough context for suggestions
  const canSuggest = projectType && targetUsers.length > 0 && (platform || complexity);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <Settings className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-2xl">Technical Considerations</CardTitle>
              <CardDescription>Define technical requirements and constraints</CardDescription>
            </div>
          </div>
          {canSuggest && (
            <Button 
              type="button"
              variant="outline"
              size="sm"
              onClick={generateTechnicalSuggestions}
              className="text-purple-600 border-purple-200 hover:bg-purple-50"
            >
              <Sparkles className="w-4 h-4 mr-1" />
              Smart Suggestions
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="browserSupport"
          render={() => (
            <FormItem>
              <FormLabel>Browser Support</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { value: 'chrome', label: 'Chrome', icon: '🔴' },
                  { value: 'firefox', label: 'Firefox', icon: '🟠' },
                  { value: 'safari', label: 'Safari', icon: '🔵' },
                  { value: 'edge', label: 'Edge', icon: '🟦' },
                  { value: 'mobile', label: 'Mobile browsers', icon: '📱' },
                  { value: 'legacy', label: 'Legacy support', icon: '🕰️' },
                ].map((option) => (
                  <FormField
                    key={option.value}
                    control={form.control}
                    name="browserSupport"
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

        <div>
          <FormLabel className="text-sm font-medium text-gray-700 mb-4 block">Performance Requirements</FormLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="maxFileSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-gray-600">Max file size</FormLabel>
                  <div className="flex">
                    <FormControl>
                      <Input type="number" placeholder="0" className="rounded-r-none" {...field} />
                    </FormControl>
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-lg">MB</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="responseTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-gray-600">Response time</FormLabel>
                  <div className="flex">
                    <FormControl>
                      <Input type="number" placeholder="0" className="rounded-r-none" {...field} />
                    </FormControl>
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-lg">sec</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="concurrentUsers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-gray-600">Concurrent users</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="dataHandling"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data Handling *</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { value: 'local', label: 'Local processing only', icon: '🖥️' },
                      { value: 'cloud', label: 'Cloud storage needed', icon: '☁️' },
                      { value: 'api', label: 'API integration', icon: '🔌' },
                      { value: 'database', label: 'Database required', icon: '🗄️' },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value={option.value} id={`data-${option.value}`} />
                        <label htmlFor={`data-${option.value}`} className="flex items-center cursor-pointer flex-1">
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
          name="securityLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Security Level *</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value}>
                  <div className="space-y-3">
                    {[
                      { 
                        value: 'public', 
                        label: 'Public (no sensitive data)',
                        description: 'Open source, no user data collection',
                        color: 'text-green-500'
                      },
                      { 
                        value: 'internal', 
                        label: 'Internal (company data)',
                        description: 'Internal tools, business data',
                        color: 'text-yellow-500'
                      },
                      { 
                        value: 'sensitive', 
                        label: 'Sensitive (personal data)',
                        description: 'User personal information, privacy considerations',
                        color: 'text-orange-500'
                      },
                      { 
                        value: 'confidential', 
                        label: 'Confidential (high security)',
                        description: 'Financial data, authentication, encryption required',
                        color: 'text-red-500'
                      },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value={option.value} id={`security-${option.value}`} />
                        <div className={`w-3 h-3 rounded-full ${option.color.replace('text-', 'bg-')}`} />
                        <label htmlFor={`security-${option.value}`} className="cursor-pointer flex-1">
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

        <FormField
          control={form.control}
          name="dependencies"
          render={() => (
            <FormItem>
              <div className="flex items-center justify-between mb-2">
                <FormLabel>Dependencies</FormLabel>
                {canSuggest && (
                  <Button 
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={generateTechnicalSuggestions}
                    className="text-amber-600 border-amber-200 hover:bg-amber-50"
                  >
                    <Sparkles className="w-4 h-4 mr-1" />
                    Smart Dependencies
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { value: 'apis', label: 'External APIs', icon: '🔌' },
                  { value: 'libraries', label: 'Third-party libraries', icon: '📚' },
                  { value: 'paid', label: 'Paid services', icon: '💳' },
                  { value: 'permissions', label: 'Special permissions', icon: '🔑' },
                ].map((option) => (
                  <FormField
                    key={option.value}
                    control={form.control}
                    name="dependencies"
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
