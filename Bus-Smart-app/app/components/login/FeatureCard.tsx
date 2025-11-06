import { type LucideIcon } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
      <CardContent className="p-6 sm:p-8 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 mb-4">
          <Icon className="h-8 w-8 text-indigo-600" />
        </div>
        <h3 className="text-indigo-900 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}
