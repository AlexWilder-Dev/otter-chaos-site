"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Chess-themed elements
const chessPositions = [
  { piece: '♔', color: 'white' },
  { piece: '♕', color: 'white' },
  { piece: '♖', color: 'white' },
  { piece: '♗', color: 'white' },
  { piece: '♘', color: 'white' },
  { piece: '♙', color: 'white' },
];

// Chess board background setup
const initialChessPieces = [
  { piece: '♜', position: { x: 0, y: 0 } },
  { piece: '♞', position: { x: 2, y: 1 } },
  { piece: '♝', position: { x: 5, y: 2 } },
  { piece: '♛', position: { x: 3, y: 4 } },
  { piece: '♚', position: { x: 4, y: 6 } },
];

export default function BookingPage() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    name: '',
    email: '',
    specialRequests: ''
  });

  const [chessPieces, setChessPieces] = useState(initialChessPieces);

  // Animate chess pieces
  useEffect(() => {
    const interval = setInterval(() => {
      setChessPieces(pieces => 
        pieces.map(piece => ({
          ...piece,
          position: {
            x: Math.floor(Math.random() * 8),
            y: Math.floor(Math.random() * 8)
          }
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#2c2c35] relative overflow-hidden">
      <Navigation />
      
      {/* Chess board background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="grid grid-cols-8 h-full w-full">
          {Array.from({ length: 64 }).map((_, index) => {
            const row = Math.floor(index / 8);
            const col = index % 8;
            const isBlack = (row + col) % 2 === 1;
            
            return (
              <div
                key={index}
                className={`${isBlack ? 'bg-[#1a1a24]' : 'bg-[#2c2c35]'} relative`}
              >
                {chessPieces.map((piece, pieceIndex) => 
                  piece.position.x === col && piece.position.y === row ? (
                    <motion.div
                      key={pieceIndex}
                      className="absolute inset-0 flex items-center justify-center text-4xl text-[#ffd700]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {piece.piece}
                    </motion.div>
                  ) : null
                )}
              </div>
            );
          })}
        </div>
      </div>

      <main className="pt-20">
        <div className="container mx-auto max-w-2xl px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Chess-themed title */}
            <div className="flex justify-center gap-4 mb-8">
              {chessPositions.map(({ piece, color }, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`text-4xl ${color === 'white' ? 'text-[#ffd700]' : 'text-black'}`}
                >
                  {piece}
                </motion.div>
              ))}
            </div>
            
            <h1 className="font-medieval text-5xl text-center mb-8 text-[#ffd700]">
              Reserve Your Table
            </h1>
            
            <p className="text-center mb-12 text-lg text-[#ffd700]/80">
              Make your move - book your gaming session
            </p>

            <form onSubmit={handleSubmit} className="bg-[#2c2c35]/90 backdrop-blur-sm p-8 rounded-lg shadow-xl border-2 border-[#ffd700]/20">
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="block font-medieval text-lg mb-2 text-[#ffd700]">
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border-2 border-[#ffd700]/20 focus:border-[#ffd700]/40 focus:outline-none bg-[#1a1a24] text-[#ffd700]"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="time" className="block font-medieval text-lg mb-2 text-[#ffd700]">
                      Time
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border-2 border-[#ffd700]/20 focus:border-[#ffd700]/40 focus:outline-none bg-[#1a1a24] text-[#ffd700]"
                      required
                    >
                      <option value="">Select a time</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="20:00">8:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="guests" className="block font-medieval text-lg mb-2 text-[#ffd700]">
                    Number of Players
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border-2 border-[#ffd700]/20 focus:border-[#ffd700]/40 focus:outline-none bg-[#1a1a24] text-[#ffd700]"
                    required
                  >
                    {[2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num} players</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="name" className="block font-medieval text-lg mb-2 text-[#ffd700]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border-2 border-[#ffd700]/20 focus:border-[#ffd700]/40 focus:outline-none bg-[#1a1a24] text-[#ffd700]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-medieval text-lg mb-2 text-[#ffd700]">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border-2 border-[#ffd700]/20 focus:border-[#ffd700]/40 focus:outline-none bg-[#1a1a24] text-[#ffd700]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="specialRequests" className="block font-medieval text-lg mb-2 text-[#ffd700]">
                    Special Requests
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border-2 border-[#ffd700]/20 focus:border-[#ffd700]/40 focus:outline-none bg-[#1a1a24] text-[#ffd700]"
                    rows={4}
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-[#ffd700] text-[#2c2c35] px-8 py-3 rounded-lg font-medieval 
                           transition-all duration-300 transform hover:-translate-y-1
                           hover:bg-[#ffd700]/90 shadow-lg hover:shadow-xl"
                >
                  Make Your Move
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}