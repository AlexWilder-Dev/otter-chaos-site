export type Event = {
  id: string
  title: string
  description: string
  day: string
  time: string
  price: string
  type: 'Combat' | 'Adventure' | 'Social' | 'Training' | 'Tournament' | 'Crafting'
  is_active: boolean
  created_at: string
  updated_at: string
}

const STORAGE_KEY = 'otter_chaos_events';

// Default events data
const defaultEvents: Event[] = [
  {
    id: "1",
    title: "Weekly Game Tournament",
    description: "Compete in our weekly tournament featuring different strategy games each week. Prizes for the winners!",
    day: "Every Thursday",
    time: "7:00 PM",
    price: "£5 entry",
    type: "Combat",
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "2",
    title: "Dungeons & Dragons Night",
    description: "Join our experienced DM for an epic campaign. All levels welcome, characters provided for newcomers.",
    day: "Every Friday",
    time: "6:30 PM",
    price: "£10 per session",
    type: "Adventure",
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "3",
    title: "Family Game Sunday",
    description: "Special family-friendly event with classic board games and kid-friendly snacks.",
    day: "Every Sunday",
    time: "2:00 PM - 5:00 PM",
    price: "£15 per family",
    type: "Social",
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "4",
    title: "Learn to Play Workshop",
    description: "Our game masters teach you popular board games. Perfect for beginners!",
    day: "Every Saturday",
    time: "3:00 PM",
    price: "Free with café purchase",
    type: "Training",
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "5",
    title: "Strategy Game League",
    description: "Monthly league featuring rotating strategy games. Earn points and compete for the season trophy!",
    day: "First Saturday",
    time: "6:00 PM",
    price: "£20 per season",
    type: "Tournament",
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "6",
    title: "RPG Character Workshop",
    description: "Create your perfect character with guidance from experienced players.",
    day: "Second Sunday",
    time: "4:00 PM",
    price: "£8 per person",
    type: "Crafting",
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  }
];

// Get events from localStorage or return default data
export const getEvents = async (): Promise<Event[]> => {
  if (typeof window === 'undefined') return defaultEvents;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Failed to parse stored events:', error);
    }
  }
  
  // Store default events and return them
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultEvents));
  return defaultEvents;
};

// Get active events only
export const getActiveEvents = async (): Promise<Event[]> => {
  const events = await getEvents();
  return events.filter(event => event.is_active);
};

// Save events to localStorage
export const saveEvents = (events: Event[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
};

// Add new event
export const addEvent = async (eventData: Omit<Event, 'id' | 'created_at' | 'updated_at'>): Promise<Event> => {
  const events = await getEvents();
  const newEvent: Event = {
    ...eventData,
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  events.push(newEvent);
  saveEvents(events);
  return newEvent;
};

// Update event
export const updateEvent = async (id: string, eventData: Partial<Event>): Promise<Event | null> => {
  const events = await getEvents();
  const index = events.findIndex(event => event.id === id);
  
  if (index === -1) return null;
  
  events[index] = {
    ...events[index],
    ...eventData,
    updated_at: new Date().toISOString()
  };
  
  saveEvents(events);
  return events[index];
};

// Delete event
export const deleteEvent = async (id: string): Promise<boolean> => {
  const events = await getEvents();
  const filteredEvents = events.filter(event => event.id !== id);
  
  if (filteredEvents.length === events.length) return false;
  
  saveEvents(filteredEvents);
  return true;
};

// Toggle event active status
export const toggleEventActive = async (id: string): Promise<Event | null> => {
  const events = await getEvents();
  const event = events.find(e => e.id === id);
  
  if (!event) return null;
  
  return updateEvent(id, { is_active: !event.is_active });
};