import { Card, CardContent, CardHeader } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Edit, Trash2, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'manager';
    avatar?: string;
    isActive: boolean;
  };
  onEdit?: (user: any) => void;
  onDelete?: (user: any) => void;
}

// Componente de tarjeta de usuario
function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>
                {user.avatar ? getInitials(user.name) : <User className="h-6 w-6" />}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit?.(user)}>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete?.(user)}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <Badge 
            className={cn(
              'text-xs',
              getRoleColor(user.role)
            )}
          >
            {user.role}
          </Badge>
          <div className="flex items-center gap-2">
            <div className={cn(
              'w-2 h-2 rounded-full',
              user.isActive ? 'bg-green-500' : 'bg-gray-400'
            )} />
            <span className="text-sm text-muted-foreground">
              {user.isActive ? 'Activo' : 'Inactivo'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserCard;
