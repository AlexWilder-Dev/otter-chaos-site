"use client";

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Scrabble tiles with points
const scrabblePoints: { [key: string]: number } = {
  A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8,
  K: 5, L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1,
  U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10, '&': 0
};

const letterTiles = 'MENU&DRINKS'.split('').map((letter) => ({
  letter,
  points: scrabblePoints[letter] || 0
}));

const menuItems = {
  pizzas: [
    { name: "The Dragon's Feast", description: "Spicy pepperoni, roasted red peppers, jalapeños", price: "£14", letters: "DRAGON" },
    { name: "Forest Guardian", description: "Wild mushrooms, truffle oil, fresh herbs", price: "£13", letters: "FOREST" },
    { name: "Knight's Glory", description: "Four cheese blend with garlic butter crust", price: "£12", letters: "KNIGHT" },
    { name: "Wizard's Garden", description: "Mediterranean vegetables, olives, feta", price: "£13", letters: "WIZARD" }
  ],
  drinks: [
    { name: "Healing Potion", description: "Fresh mint, lime, elderflower sparkler", price: "£5", letters: "HEAL" },
    { name: "Dragon's Breath", description: "Spiced chai latte with cinnamon", price: "£4", letters: "FIRE" },
    { name: "Wizard's Brew", description: "Our signature coffee blend", price: "£3", letters: "BREW" },
    { name: "Mystic Mead", description: "Local craft beer selection", price: "£5", letters: "MEAD" }
  ],
  snacks: [
    { name: "Adventurer's Trail Mix", description: "Nuts, dried fruits, chocolate", price: "£4", letters: "TRAIL" },
    { name: "Dungeon Nachos", description: "Loaded with cheese, guacamole, salsa", price: "£8", letters: "NACHO" },
    { name: "Ranger's Popcorn", description: "Sweet & salty with herbs", price: "£3", letters: "CORN" }
  ]
};

// Background Scrabble letters - more extensive
const backgroundLetters = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ');

// Scrabble bag tiles floating around
const floatingTiles = ['Q', 'X', 'Z', 'J', 'K', 'V', 'W', 'Y', 'F', 'H', 'P', 'B', 'C', 'M', 'D', 'G'];

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-[#f4e4bc] relative overflow-hidden">
      <Navigation />
      
      {/* Enhanced Background Scrabble Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-8 pointer-events-none">
        {/* Scattered letters */}
        {backgroundLetters.map((letter, i) => (
          <motion.div
            key={`bg-${i}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: [0.05, 0.1, 0.05],
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 360]
            }}
            transition={{ 
              delay: i * 0.02,
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute text-lg md:text-2xl font-bold text-[#8B4513]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          >
            {letter}
          </motion.div>
        ))}
        
        {/* Floating scrabble tiles */}
        {floatingTiles.map((tile, i) => (
          <motion.div
            key={`float-${i}`}
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ 
              y: "-100vh",
              opacity: [0, 0.3, 0],
              rotate: [0, 360, 720]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              delay: i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bg-[#f7d4a4] w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded shadow-lg border border-[#8B4513]/20"
            style={{
              left: `${Math.random() * 100}%`,
            }}
          >
            <span className="text-xs md:text-sm font-bold text-[#8B4513]">{tile}</span>
            <span className="absolute bottom-0 right-0 text-[8px] md:text-xs font-bold text-[#8B4513]">
              {scrabblePoints[tile]}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Scrabble board pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="grid grid-cols-15 h-full w-full">
          {Array.from({ length: 225 }).map((_, index) => {
            const row = Math.floor(index / 15);
            const col = index % 15;
            const isSpecial = (row + col) % 7 === 0;
            
            return (
              <div
                key={index}
                className={`border border-[#8B4513]/10 ${
                  isSpecial ? 'bg-[#ff6b6b]/20' : 'bg-[#f7d4a4]/10'
                }`}
              />
            );
          })}
        </div>
      </div>

      <main className="pt-20 relative z-10">
        <div className="container mx-auto max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Responsive Scrabble Title */}
            <div className="flex justify-center gap-1 sm:gap-2 mb-8 flex-wrap max-w-full">
              {letterTiles.map(({ letter, points }, index) => (
                <motion.div
                  key={`${letter}-${index}`}
                  initial={{ opacity: 0, y: 20, rotate: -10 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                    y: -5
                  }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="bg-[#f7d4a4] w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex flex-col items-center justify-center rounded-lg shadow-lg relative cursor-pointer border-2 border-[#8B4513]/20 hover:border-[#8B4513]/40"
                >
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#8B4513]">{letter}</span>
                  <span className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 text-[8px] sm:text-xs font-bold text-[#8B4513]">{points}</span>
                </motion.div>
              ))}
            </div>

            {/* Menu sections with scrabble enhancements */}
            <div className="space-y-8">
              {Object.entries(menuItems).map(([category, items], categoryIndex) => (
                <section key={category} className="relative">
                  {/* Category title with scrabble tiles */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: categoryIndex * 0.2 }}
                    className="flex items-center gap-4 mb-6"
                  >
                    <h2 className="font-medieval text-2xl md:text-3xl text-primary">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </h2>
                    {/* Decorative scrabble tiles for category */}
                    <div className="flex gap-1">
                      {category.slice(0, 3).split('').map((letter, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: categoryIndex * 0.2 + i * 0.1 }}
                          className="bg-[#f7d4a4] w-6 h-6 flex items-center justify-center rounded text-xs font-bold text-[#8B4513] border border-[#8B4513]/20"
                        >
                          {letter.toUpperCase()}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                  
                  <div className="grid gap-4">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                          y: -2
                        }}
                        transition={{ delay: index * 0.1 }}
                        className="game-card p-4 md:p-6 cursor-pointer transform transition-all duration-300 relative overflow-hidden"
                      >
                        {/* Scrabble word decoration */}
                        <div className="absolute top-2 right-2 flex gap-0.5">
                          {item.letters.split('').slice(0, 4).map((letter, i) => (
                            <div
                              key={i}
                              className="bg-[#f7d4a4] w-4 h-4 flex items-center justify-center rounded text-[8px] font-bold text-[#8B4513] border border-[#8B4513]/20 opacity-30"
                            >
                              {letter}
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-baseline mb-2">
                          <h3 className="font-medieval text-lg md:text-xl text-primary pr-8">{item.name}</h3>
                          <span className="font-medieval text-lg md:text-xl text-accent whitespace-nowrap">{item.price}</span>
                        </div>
                        <p className="text-primary/80 text-sm md:text-base">{item.description}</p>
                        
                        {/* Scrabble score for item */}
                        <div className="mt-2 text-xs text-primary/60">
                          Word Score: {item.letters.split('').reduce((sum, letter) => sum + (scrabblePoints[letter] || 0), 0)} points
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Scrabble-themed call to action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-center mt-12 p-8 bg-[#f7d4a4]/50 rounded-lg border-2 border-[#8B4513]/20"
            >
              <h3 className="font-medieval text-2xl text-primary mb-4">Ready to Play?</h3>
              <p className="text-primary/80 mb-6">Book your table and start spelling out your perfect game night!</p>
              <a 
                href="/book" 
                className="inline-block bg-primary text-parchment px-8 py-3 rounded-lg font-medieval 
                         transition-all duration-300 transform hover:-translate-y-1
                         shadow-lg hover:shadow-xl"
              >
                Reserve Your Spot
              </a>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}