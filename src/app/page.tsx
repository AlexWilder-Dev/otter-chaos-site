"use client";

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Home() {
  const [meeples, setMeeples] = useState<{ id: number; top: number; left: number; delay: number }[]>([]);

  useEffect(() => {
    const newMeeples = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setMeeples(newMeeples);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="relative overflow-hidden">
        {/* Background Meeples */}
        {meeples.map((meeple) => (
          <div
            key={meeple.id}
            className="meeple"
            style={{
              top: `${meeple.top}%`,
              left: `${meeple.left}%`,
              animationDelay: `${meeple.delay}s`
            }}
          />
        ))}

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center py-20 dice-pattern">
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/50 to-background/90" />
          
          <div className="container mx-auto px-4 z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="mb-8 relative w-48 h-48 mx-auto">
                <Image
                  src="/image.png"
                  alt="Otter Chaos Logo"
                  fill
                  className="object-contain floating"
                  priority
                />
              </div>
              
              <h1 className="font-medieval text-4xl sm:text-5xl md:text-7xl mb-6 text-primary">
                Welcome to Otter Chaos
              </h1>
              
              <p className="text-xl sm:text-2xl mb-12 max-w-2xl mx-auto font-serif">
                Where every table tells a story, and every game creates a memory
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
                <a href="/book" className="btn-primary">
                  Reserve Your Table
                </a>
                <a href="/events" className="btn-secondary">
                  Discover Events
                </a>
              </div>

              {/* Featured Games Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <motion.div 
                  className="game-card p-6 rounded-xl"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="font-medieval text-2xl mb-3">500+ Games</h3>
                  <p className="text-primary/80">From classic strategy to modern party games</p>
                </motion.div>

                <motion.div 
                  className="game-card p-6 rounded-xl"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="font-medieval text-2xl mb-3">Artisan Pizza</h3>
                  <p className="text-primary/80">Hand-crafted sourdough pizzas baked to perfection</p>
                </motion.div>

                <motion.div 
                  className="game-card p-6 rounded-xl"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="font-medieval text-2xl mb-3">Game Masters</h3>
                  <p className="text-primary/80">Expert guides to teach you new games</p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Decorative Wood Border */}
          <div className="absolute bottom-0 left-0 right-0 h-8 wood-texture" />
        </section>
      </div>
      <Footer />
    </main>
  );
}