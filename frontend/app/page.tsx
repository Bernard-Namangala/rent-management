import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Container } from "../components/ui/container";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="RentEase Logo"
                width={32}
                height={32}
              />
              <span className="text-xl font-bold">RentEase</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/features"
                className="text-sm hover:text-primary transition-colors"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-sm hover:text-primary transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="text-sm hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link href="/auth/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </Container>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20">
          <Container>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Boost Property Management with{" "}
                <span className="text-primary">the Best Platform</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Organize, manage, and grow your property business with our
                all-in-one platform designed for modern landlords and tenants.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Free Trial
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Watch Demo
                </Button>
              </div>
              <div className="mt-20 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 h-[50%] -bottom-1" />
                <Image
                  src="https://placehold.co/1200x600/png"
                  alt="Platform Overview"
                  width={1200}
                  height={600}
                  className="rounded-lg shadow-2xl mx-auto"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-slate-50">
          <Container>
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Optimize Time and Complete More Tasks
              </h2>
              <p className="text-muted-foreground mb-16 max-w-2xl mx-auto">
                Streamline your property management workflow with powerful
                features designed to save time and increase efficiency.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Property Management",
                  description:
                    "Easily manage multiple properties, track maintenance requests, and handle tenant communications all in one place.",
                },
                {
                  title: "Rent Collection",
                  description:
                    "Automate rent collection, send reminders, and track payment history with our integrated payment system.",
                },
                {
                  title: "Document Management",
                  description:
                    "Store and manage leases, contracts, and important documents securely in the cloud.",
                },
              ].map((feature, i) => (
                <div
                  key={feature.title}
                  className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                  <Image
                    src={`https://placehold.co/400x300/png?text=Feature+${
                      i + 1
                    }`}
                    alt={feature.title}
                    width={400}
                    height={300}
                    className="rounded-lg transition-transform group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <Container>
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                People love us, and we love them back
              </h2>
              <p className="text-muted-foreground mb-16 max-w-2xl mx-auto">
                Read what our customers have to say about their experience with
                RentEase.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-lg border bg-card p-6 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={`https://i.pravatar.cc/40?img=${i}`}
                      alt={`Testimonial ${i}`}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold">John Doe</h4>
                      <p className="text-sm text-muted-foreground">
                        Property Manager
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "RentEase has transformed how we manage our properties. The
                    platform is intuitive and has all the features we need."
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <Container>
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Join us. Be Part of the Smart Property Management Revolution
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get started with RentEase today and experience the future of
                property management.
              </p>
              <Button size="lg">Start Your Free Trial</Button>
            </div>
          </Container>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Security"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers"],
              },
              {
                title: "Resources",
                links: ["Documentation", "Help Center", "Contact"],
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Cookie Policy"],
              },
            ].map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
            <p>© 2024 RentEase. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
