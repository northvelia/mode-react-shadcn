import { cn } from '@/lib/utils';

// Componente de encabezado para páginas de autenticación
function PublicHeader() {
    return (
        <header className={cn('w-full border-b bg-background')}>
            <div className="flex h-16 items-center justify-center px-6">
                <h1 className="text-xl font-semibold">welcome a barra publica</h1>
            </div>
        </header>
    );
}

export default PublicHeader;
