import Button from '../components/Button';
import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

export default function ComponentLibrary() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <SEO title="Component Library" description="Showcase of reusable UI components" />
      <h1 className="text-3xl font-heading font-bold mb-8">Component Library</h1>
      <div className="space-y-12">
        {/* Button Demo */}
        <section>
          <h2 className="text-xl font-bold mb-2">Button</h2>
          <p className="mb-4 text-gray-600">A reusable, animated button component with multiple variants.</p>
          <div className="flex gap-4 flex-wrap">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="outline">Outline</Button>
          </div>
        </section>
        {/* ServiceCard Demo */}
        <section>
          <h2 className="text-xl font-bold mb-2 mt-8">ServiceCard</h2>
          <p className="mb-4 text-gray-600">A card for displaying a service with icon, title, and description.</p>
          <div className="flex gap-6 flex-wrap">
            <ServiceCard title="Web Design" description="Beautiful, responsive websites." icon="🌐" />
            <ServiceCard title="Branding" description="Memorable brand identities." icon="🎨" />
          </div>
        </section>
        {/* TestimonialCard Demo */}
        <section>
          <h2 className="text-xl font-bold mb-2 mt-8">TestimonialCard</h2>
          <p className="mb-4 text-gray-600">A card for displaying client testimonials.</p>
          <div className="flex gap-6 flex-wrap">
            <TestimonialCard name="Jane Doe" role="CEO, Example Inc." content="Amazing work!" rating={5} image="https://randomuser.me/api/portraits/women/44.jpg" />
            <TestimonialCard name="John Smith" role="CTO, Tech Co." content="Highly recommend." rating={4} image="https://randomuser.me/api/portraits/men/32.jpg" />
          </div>
        </section>
      </div>
    </div>
  );
} 