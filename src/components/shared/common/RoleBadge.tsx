import { Badge } from '@/components/ui/badge';

interface RoleBadgeProps {
  role: string;
  className?: string;
}

const ROLE_COLORS: Record<string, string> = {
  'super_admin': 'bg-red-100 text-red-800 border-red-200',
  'admin': 'bg-orange-100 text-orange-800 border-orange-200',
  'manager': 'bg-blue-100 text-blue-800 border-blue-200',
  'user': 'bg-green-100 text-green-800 border-green-200',
  'support': 'bg-purple-100 text-purple-800 border-purple-200',
};

const ROLE_LABELS: Record<string, string> = {
  'super_admin': 'Super Admin',
  'admin': 'Administrador',
  'manager': 'Gerente',
  'user': 'Usuario',
  'support': 'Soporte',
};

function RoleBadge({ role, className = '' }: RoleBadgeProps) {
  const colorClass = ROLE_COLORS[role] || 'bg-gray-100 text-gray-800 border-gray-200';
  const label = ROLE_LABELS[role] || role;

  return (
    <Badge 
      variant="outline" 
      className={`${colorClass} ${className}`}
    >
      {label}
    </Badge>
  );
}

export default RoleBadge;
