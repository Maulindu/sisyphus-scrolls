// src/app/philosophers/[slug]/page.jsx
import { notFound } from 'next/navigation';
import { getPhilosopherBySlug, getAllPhilosopherSlugs } from '../../../lib/data';
import Image from 'next/image';
import Link from 'next/link';

//static params for all philosophers
export async function generateStaticParams() {
  const slugs = getAllPhilosopherSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const philosopher = getPhilosopherBySlug(params.slug);
  
  if (!philosopher) {
    return {
      title: 'Philosopher Not Found | SisyphusScrolls',
    };
  }

  return {
    title: `${philosopher.title} | SisyphusScrolls`,
    description: philosopher.description,
  };
}

export default function PhilosopherPage({ params }) {
  const philosopher = getPhilosopherBySlug(params.slug);

  if (!philosopher) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        {philosopher.containerImage && (
          <Image
            src={philosopher.containerImage}
            alt={philosopher.title}
            fill
            className="object-cover opacity-30"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8">
          <p className="text-amber-500 text-lg mb-2">{philosopher.year}</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{philosopher.title}</h1>
          <p className="text-xl text-gray-300 max-w-2xl">{philosopher.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Biography */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-amber-500">Biography</h2>
              <p className="text-lg leading-relaxed text-gray-300">
                {philosopher.fullBio}
              </p>
            </section>

            {/* Key Ideas */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-amber-500">Key Philosophical Ideas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {philosopher.keyIdeas.map((idea, index) => (
                  <div key={index} className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <p className="text-gray-300">{idea}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Quotes */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-amber-500">Famous Quotes</h2>
              <div className="space-y-4">
                {philosopher.quotes.map((quote, index) => (
                  <blockquote key={index} className="border-l-4 border-amber-500 pl-6 py-4 bg-slate-800 rounded-r-lg">
                    <p className="text-lg italic text-gray-200">"{quote}"</p>
                    <cite className="text-sm text-amber-500 mt-2 block">— {philosopher.title}</cite>
                  </blockquote>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Major Works */}
            <section>
              <h3 className="text-2xl font-bold mb-4 text-amber-500">Major Works</h3>
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <ul className="space-y-2">
                  {philosopher.majorWorks.map((work, index) => (
                    <li key={index} className="text-gray-300 flex items-center">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                      {work}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Navigation */}
            <section>
              <h3 className="text-2xl font-bold mb-4 text-amber-500">Explore More</h3>
              <div className="space-y-3">
                <Link 
                  href="/"
                  className="block bg-slate-800 hover:bg-slate-700 transition-colors p-4 rounded-lg border border-slate-700"
                >
                  <span className="text-gray-200">← Back to Timeline</span>
                </Link>
                {/* Add links to related philosophers */}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}