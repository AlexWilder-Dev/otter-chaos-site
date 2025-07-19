"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getActiveEvents, type Event } from '@/lib/eventsStorage';

const dndIcons = {
  Combat: "⚔️",
  Adventure: "🗺️",
  Social: "🎲",
  Training: "📚",
  Tournament: "🏆",
  Crafting: "⚒️"
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await getActiveEvents();
      setEvents(data);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#2c2c35] text-white">
        <Navigation />
        <main className="pt-20">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="flex items-center justify-center min-h-[400px]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="text-4xl text-[#ffd700]"
              >
                🎲
              </motion.div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#2c2c35] text-white">
        <Navigation />
        <main className="pt-20">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="text-center py-20">
              <h1 className="font-medieval text-3xl text-[#ffd700] mb-4">Oops!</h1>
              <p className="text-white/80">{error}</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2c2c35] text-white">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-medieval text-5xl text-center mb-8 text-[#ffd700]">
              Upcoming Quests
            </h1>
            
            <p className="text-center mb-12 text-lg text-[#ffd700]/80">
              Join our fellowship for epic adventures and gatherings
            </p>

            {events.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-white/80 text-lg">No events scheduled at the moment.</p>
                <p className="text-white/60 mt-2">Check back soon for new adventures!</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#3c3c45] p-6 rounded-lg border-2 border-[#ffd700]/20 hover:border-[#ffd700]/40 
                              transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-2xl">{dndIcons[event.type]}</span>
                      <div className="flex-1">
                        <h2 className="font-medieval text-2xl mb-2 text-[#ffd700]">{event.title}</h2>
                        <p className="text-white/80 mb-4">{event.description}</p>
                        <div className="flex justify-between items-center text-sm">
                          <div>
                            <p className="font-medieval text-[#ffd700]">{event.day}</p>
                            <p className="text-white/60">{event.time}</p>
                          </div>
                          <span className="font-medieval text-[#ffd700]">{event.price}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="mt-12 text-center">
              <a href="/book" className="inline-block bg-[#ffd700] text-[#2c2c35] px-8 py-3 rounded-lg 
                                       font-medieval transition-all duration-300 transform hover:-translate-y-1
                                       hover:bg-[#ffd700]/90 shadow-lg hover:shadow-xl">
                Join the Adventure
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}