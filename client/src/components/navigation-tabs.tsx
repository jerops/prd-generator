import { Button } from "@/components/ui/button";
import { FormSection, SectionInfo } from "@/types/prd";
import { 
  Info, 
  AlertTriangle, 
  Lightbulb, 
  List, 
  Settings, 
  Target 
} from "lucide-react";

interface NavigationTabsProps {
  currentSection: FormSection;
  onSectionChange: (section: FormSection) => void;
  completedSections: Set<FormSection>;
}

const sections: SectionInfo[] = [
  {
    id: 'overview',
    title: 'Project Overview',
    description: 'Define the basic scope and context',
    icon: 'Info',
    isRequired: true,
  },
  {
    id: 'problem',
    title: 'Problem Statement',
    description: 'Clearly define the problem',
    icon: 'AlertTriangle',
    isRequired: true,
  },
  {
    id: 'solution',
    title: 'Solution Approach',
    description: 'Define your approach and technology',
    icon: 'Lightbulb',
    isRequired: true,
  },
  {
    id: 'features',
    title: 'Key Features',
    description: 'What will and won\'t be included',
    icon: 'List',
    isRequired: true,
  },
  {
    id: 'technical',
    title: 'Technical',
    description: 'Technical requirements',
    icon: 'Settings',
    isRequired: true,
  },
  {
    id: 'success',
    title: 'Success Criteria',
    description: 'How to measure success',
    icon: 'Target',
    isRequired: true,
  },
];

const iconMap = {
  Info,
  AlertTriangle,
  Lightbulb,
  List,
  Settings,
  Target,
};

export function NavigationTabs({ currentSection, onSectionChange, completedSections }: NavigationTabsProps) {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto">
          {sections.map((section, index) => {
            const Icon = iconMap[section.icon as keyof typeof iconMap];
            const isActive = currentSection === section.id;
            const isCompleted = completedSections.has(section.id);
            
            return (
              <Button
                key={section.id}
                variant="ghost"
                className={`
                  flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                  ${isActive 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                  ${isCompleted ? 'text-green-600' : ''}
                `}
                onClick={() => onSectionChange(section.id)}
              >
                <Icon className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">{index + 1}. {section.title}</span>
                <span className="sm:hidden">{section.title.split(' ')[0]}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
