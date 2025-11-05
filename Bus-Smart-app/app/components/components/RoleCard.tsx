import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface RoleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onSelect: () => void;
}

export function RoleCard({
  icon: Icon,
  title,
  description,
  onSelect,
}: RoleCardProps) {
  return (
    <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-gray-200 hover:border-indigo-400 cursor-pointer">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
            <Icon className="h-8 w-8 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-indigo-900 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">
              {description}
            </p>
          </div>
          <Button
            onClick={onSelect}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg mt-2"
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}