"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { 
  getEvents, 
  addEvent, 
  updateEvent, 
  deleteEvent, 
  toggleEventActive, 
  type Event 
} from '@/lib/eventsStorage';

const eventTypes = ['Combat', 'Adventure', 'Social', 'Training', 'Tournament', 'Crafting'] as const;
type EventType = typeof eventTypes[number];

const dndIcons: Record<EventType, string> = {
  Combat: "⚔️",
  Adventure: "🗺️",
  Social: "🎲",
  Training: "📚",
  Tournament: "🏆",
  Crafting: "⚒️"
};

// Define the form data type to match Event structure
type FormData = Omit<Event, 'id' | 'created_at' | 'updated_at'>;

export default function AdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    day: '',
    time: '',
    price: '',
    type: 'Combat',
    is_active: true
  });

  // Simple password authentication (in a real app, use proper auth)
  const ADMIN_PASSWORD = 'otterchaos2024';

  useEffect(() => {
    checkAuth();
    if (isAuthenticated) {
      fetchEvents();
    }
  }, [isAuthenticated]);

  const checkAuth = () => {
    const stored = localStorage.getItem('admin_authenticated');
    setIsAuthenticated(stored === 'true');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingEvent) {
        await updateEvent(editingEvent.id, formData);
      } else {
        await addEvent(formData);
      }

      setFormData({
        title: '',
        description: '',
        day: '',
        time: '',
        price: '',
        type: 'Combat',
        is_active: true
      });
      setEditingEvent(null);
      setShowForm(false);
      fetchEvents();
    } catch (err) {
      console.error('Error saving event:', err);
      alert('Failed to save event');
    }
  };

  const handleEdit = (event: Event) => {
    setFormData({
      title: event.title,
      description: event.description,
      day: event.day,
      time: event.time,
      price: event.price,
      type: event.type,
      is_active: event.is_active
    });
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    try {
      await deleteEvent(id);
      fetchEvents();
    } catch (err) {
      console.error('Error deleting event:', err);
      alert('Failed to delete event');
    }
  };

  const handleToggleActive = async (event: Event) => {
    try {
      await toggleEventActive(event.id);
      fetchEvents();
    } catch (err) {
      console.error('Error updating event:', err);
      alert('Failed to update event');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      day: '',
      time: '',
      price: '',
      type: 'Combat',
      is_active: true
    });
    setEditingEvent(null);
    setShowForm(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#2c2c35] text-white">
        <Navigation />
        <main className="pt-20">
          <div className="container mx-auto max-w-md px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#3c3c45] p-8 rounded-lg border-2 border-[#ffd700]/20"
            >
              <h1 className="font-medieval text-3xl text-[#ffd700] mb-6 text-center">Admin Access</h1>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-white/80 mb-2">
                    Enter admin password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-[#2c2c35] text-white border border-[#ffd700]/20 
                             focus:border-[#ffd700]/40 focus:outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#ffd700] text-[#2c2c35] px-6 py-3 rounded-lg font-medieval 
                           transition-all duration-300 transform hover:-translate-y-1"
                >
                  Sign In
                </button>
              </form>
              <p className="text-white/60 text-sm mt-4 text-center">
                Demo password: otterchaos2024
              </p>
            </motion.div>
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
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-medieval text-4xl text-[#ffd700]">Event Management</h1>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowForm(!showForm);
                  if (!showForm) {
                    resetForm();
                  }
                }}
                className="bg-[#ffd700] text-[#2c2c35] px-6 py-2 rounded-lg font-medieval 
                         transition-all duration-300 transform hover:-translate-y-1"
              >
                {showForm ? 'Cancel' : 'Add Event'}
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-medieval 
                         transition-all duration-300 transform hover:-translate-y-1"
              >
                Sign Out
              </button>
            </div>
          </div>

          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#3c3c45] p-6 rounded-lg border-2 border-[#ffd700]/20 mb-8"
            >
              <h2 className="font-medieval text-2xl text-[#ffd700] mb-4">
                {editingEvent ? 'Edit Event' : 'Add New Event'}
              </h2>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Event Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="px-4 py-2 rounded-lg bg-[#2c2c35] text-white border border-[#ffd700]/20 
                             focus:border-[#ffd700]/40 focus:outline-none"
                    required
                  />
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as EventType })}
                    className="px-4 py-2 rounded-lg bg-[#2c2c35] text-white border border-[#ffd700]/20 
                             focus:border-[#ffd700]/40 focus:outline-none"
                  >
                    {eventTypes.map(type => (
                      <option key={type} value={type}>{dndIcons[type]} {type}</option>
                    ))}
                  </select>
                </div>
                
                <textarea
                  placeholder="Event Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="px-4 py-2 rounded-lg bg-[#2c2c35] text-white border border-[#ffd700]/20 
                           focus:border-[#ffd700]/40 focus:outline-none"
                  rows={3}
                  required
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Day (e.g., Every Thursday)"
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                    className="px-4 py-2 rounded-lg bg-[#2c2c35] text-white border border-[#ffd700]/20 
                             focus:border-[#ffd700]/40 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Time (e.g., 7:00 PM)"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="px-4 py-2 rounded-lg bg-[#2c2c35] text-white border border-[#ffd700]/20 
                             focus:border-[#ffd700]/40 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Price (e.g., £5 entry)"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="px-4 py-2 rounded-lg bg-[#2c2c35] text-white border border-[#ffd700]/20 
                             focus:border-[#ffd700]/40 focus:outline-none"
                    required
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="rounded border-[#ffd700]/20 bg-[#2c2c35] text-[#ffd700] focus:ring-[#ffd700]/40"
                  />
                  <label htmlFor="is_active" className="text-white/80">
                    Event is active (visible to public)
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="bg-[#ffd700] text-[#2c2c35] px-6 py-3 rounded-lg font-medieval 
                           transition-all duration-300 transform hover:-translate-y-1"
                >
                  {editingEvent ? 'Update Event' : 'Create Event'}
                </button>
              </form>
            </motion.div>
          )}

          <div className="grid gap-4">
            {loading ? (
              <div className="text-center py-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="text-4xl text-[#ffd700] inline-block"
                >
                  🎲
                </motion.div>
              </div>
            ) : (
              events.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`bg-[#3c3c45] p-6 rounded-lg border-2 ${
                    event.is_active ? 'border-[#ffd700]/20' : 'border-red-500/20'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <span className="text-2xl">{dndIcons[event.type]}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medieval text-xl text-[#ffd700]">{event.title}</h3>
                          <span className={`px-2 py-1 rounded text-xs ${
                            event.is_active ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                          }`}>
                            {event.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <p className="text-white/80 mb-2">{event.description}</p>
                        <div className="flex gap-4 text-sm text-white/60">
                          <span>{event.day}</span>
                          <span>{event.time}</span>
                          <span>{event.price}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(event)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm 
                                 transition-all duration-300 hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleActive(event)}
                        className={`px-3 py-1 rounded text-sm transition-all duration-300 ${
                          event.is_active 
                            ? 'bg-orange-600 text-white hover:bg-orange-700' 
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        {event.is_active ? 'Hide' : 'Show'}
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm 
                                 transition-all duration-300 hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <div className="mt-8 p-4 bg-[#3c3c45] rounded-lg border border-[#ffd700]/20">
            <h3 className="font-medieval text-lg text-[#ffd700] mb-2">How to Use:</h3>
            <ul className="text-white/80 text-sm space-y-1">
              <li>• Add new events using the "Add Event" button</li>
              <li>• Edit existing events by clicking "Edit"</li>
              <li>• Hide events from public view using "Hide" (they won't be deleted)</li>
              <li>• Delete events permanently using "Delete"</li>
              <li>• All changes are saved locally in your browser</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}