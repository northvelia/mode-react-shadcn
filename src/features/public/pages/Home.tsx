import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Zap, Shield } from 'lucide-react';

function Home() {
  return (
<div className="container max-w-7xl mx-auto  px-4">
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container max-w-7xl mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Bienvenido a{' '}
            <span className="text-primary">TuEmpresa</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            La plataforma definitiva para gestionar tu equipo de trabajo de manera eficiente y colaborativa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button size="lg" asChild>
              <Link to="/register">
                Comenzar ahora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/about">Conocer más</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/50">
        <div className="container max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            ¿Por qué elegirnos?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Colaboración en equipo</h3>
              <p className="text-muted-foreground">
                Trabaja junto a tu equipo en tiempo real con herramientas diseñadas para la productividad
              </p>
            </div>

            <div className="flex flex-col items-center text-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Rápido y eficiente</h3>
              <p className="text-muted-foreground">
                Interfaz intuitiva que te permite enfocarte en lo que realmente importa: tu trabajo
              </p>
            </div>

            <div className="flex flex-col items-center text-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Seguro y confiable</h3>
              <p className="text-muted-foreground">
                Tus datos están protegidos con los más altos estándares de seguridad
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t">
        <div className="container max-w-7xl mx-auto px-4 py-20">
          <div className="flex flex-col items-center text-center gap-6 bg-primary/5 rounded-lg p-12">
            <h2 className="text-3xl font-bold">
              ¿Listo para comenzar?
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Únete a miles de equipos que ya están mejorando su productividad con nuestra plataforma
            </p>
            <Button size="lg" asChild>
              <Link to="/register">Crear cuenta gratis</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
    </div>

  );
}

export default Home;