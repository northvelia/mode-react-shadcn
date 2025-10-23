import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

function PublicHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Inicio', path: '/' },
        { name: 'Nosotros', path: '/about' },
        { name: 'Contacto', path: '/contact' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                        <span className="text-lg font-bold text-primary-foreground">T</span>
                    </div>
                    <span className="text-lg font-semibold">TuEmpresa</span>
                </Link>

                {/* Desktop Navigation */}
                {/* <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-foreground",
                                location.pathname === link.path
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav> */}

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    <Button variant="ghost" asChild>
                        <Link to="/login">Iniciar Sesión</Link>
                    </Button>
                    <Button asChild>
                        <Link to="/register">Registrarse</Link>
                    </Button>
                </div>

                {/* Mobile Menu */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Abrir menú</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                        <SheetHeader>
                            <SheetTitle>Menú</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col gap-4 mt-8">
                            {/* Mobile Navigation Links */}
                            {/* <nav className="flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                            location.pathname === link.path && "bg-accent"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </nav> */}

                            {/* Mobile Auth Buttons */}
                            <div className="flex flex-col gap-2 pt-4 border-t px-2">
                                <Button variant="outline" asChild onClick={() => setIsOpen(false)}>
                                    <Link to="/login">Iniciar Sesión</Link>
                                </Button>
                                <Button asChild onClick={() => setIsOpen(false)}>
                                    <Link to="/register">Registrarse</Link>
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}

export default PublicHeader;