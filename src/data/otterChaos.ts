// Everything the site says about Otter Chaos lives in this file.
// Sources: otterchaos.co.uk (home, events, games, booking pages and the April 2026
// food & drink menu PDF), their DesignMyNight venue and gift card pages, Meetup,
// Ticket Tailor and BoardGameGeek (user Otter_Chaos). Nothing here is made up:
// if it couldn't be confirmed, it isn't in the file.


/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const CONTACT = {
  name: 'Otter Chaos',
  tagline: "Brixton's Boardgame Café",
  address: ['Arch 22, Atlantic Road', 'Brixton, London', 'SW9 8HX'],
  addressLine: 'Arch 22, Atlantic Road, SW9 8HX',
  phoneDisplay: '07830 251910',
  phoneHref: 'tel:+447830251910',
  email: 'cafe@otterchaos.co.uk',
  instagram: { handle: '@otterchaosltd', url: 'https://www.instagram.com/otterchaosltd/' },
  tiktok: { handle: '@otterchaosltd', url: 'https://www.tiktok.com/@otterchaosltd' },
  // Their own Google Maps link from otterchaos.co.uk
  googleMaps: 'https://maps.app.goo.gl/rzMo24t8h2nSNPdL9',
  appleMaps: 'https://maps.apple.com/?q=Otter%20Chaos&address=Arch%2022%2C%20Atlantic%20Road%2C%20London%20SW9%208HX&ll=51.4626896,-0.1135727',
  citymapper: 'https://citymapper.com/directions?endcoord=51.4626896%2C-0.1135727&endname=Otter%20Chaos&endaddress=Arch%2022%20Atlantic%20Road%20SW9%208HX',
  geo: { lat: 51.4626896, lng: -0.1135727 },
};

/* ------------------------------------------------------------------ */
/* Opening hours (minutes after midnight, London time)                 */
/* ------------------------------------------------------------------ */

type Span = [number, number];
const h = (hh: number, mm = 0) => hh * 60 + mm;

// index 0 = Sunday … 6 = Saturday
export const CAFE_HOURS: Span[][] = [
  [[h(11), h(23)]], // Sun
  [[h(17), h(23)]], // Mon
  [[h(17), h(23)]], // Tue
  [[h(17), h(23)]], // Wed
  [[h(17), h(23)]], // Thu
  [[h(14), h(23)]], // Fri
  [[h(11), h(23)]], // Sat
];

// Weekend kitchen closes 4pm–5:30pm
export const KITCHEN_HOURS: Span[][] = [
  [[h(12, 30), h(16)], [h(17, 30), h(22)]], // Sun
  [[h(17, 30), h(22)]],
  [[h(17, 30), h(22)]],
  [[h(17, 30), h(22)]],
  [[h(17, 30), h(22)]],
  [[h(17, 30), h(22)]], // Fri
  [[h(12, 30), h(16)], [h(17, 30), h(22)]], // Sat
];

export const HOURS_TABLE = [
  { days: 'Monday – Thursday', cafe: '5pm – 11pm', kitchen: '5:30pm – 10pm' },
  { days: 'Friday', cafe: '2pm – 11pm', kitchen: '5:30pm – 10pm' },
  { days: 'Saturday & Sunday', cafe: '11am – 11pm', kitchen: '12:30pm – 10pm', note: 'Kitchen closed 4pm – 5:30pm' },
];

/* ------------------------------------------------------------------ */
/* Table fee                                                           */
/* ------------------------------------------------------------------ */

export const TABLE_FEE = {
  why: 'To help maintain our library of games, we add a small hourly charge to every person’s bill.',
  adult: { label: 'Adults (16+)', perHour: 2, threeHours: 5 },
  child: { label: 'Children', perHour: 1, threeHours: 2.5 },
  noServiceCharge: 'No service charge will be added to your bill. Any tip you leave goes directly to the team.',
};

export const BOOKING_COPY = {
  always: 'We always recommend you book ahead. We can get very busy and it isn’t always easy to predict when we will have space for walk-ins.',
  confirm: 'We try to auto-confirm bookings, but sometimes a member of staff will reach out, especially for larger bookings. Keep an eye out for the confirmation email!',
  // Their real booking system
  provider: 'DesignMyNight',
  venuePage: 'https://www.designmynight.com/london/event-space/brixton/otter-chaos',
};

/* ------------------------------------------------------------------ */
/* Food & drink: transcribed from Otter-Chaos-Food-and-Drink-Menu.pdf  */
/* (April 2026). Prices in pounds, exactly as printed.                 */
/* ------------------------------------------------------------------ */

export type Diet = 'v' | 've' | 'v/ve';

export interface Pizza {
  name: string;
  diet?: Diet;
  desc: string;
  price: number;
  // The game each pizza's name plays on
  game: string;
  // That game is in their BoardGameGeek collection (checked against all 520 owned titles)
  onShelf?: boolean;
}

export const PIZZA_INTRO = [
  'Our pizzas are prepared to order on hand-stretched sourdough bases.',
  'Vegan mozzarella and gluten-free bases are available *',
];

export const PIZZAS: Pizza[] = [
  { name: 'Cheese Monopoly', diet: 'v/ve', desc: 'Tomato, mozzarella, and basil', price: 10, game: 'Monopoly', onShelf: true },
  { name: 'Taco Cat', diet: 'v', desc: 'Goats cheese, caramelised onion, honey, and rocket on a tomato base', price: 12, game: 'Taco Cat Goat Cheese Pizza', onShelf: true },
  { name: 'Pass on the Pigs', diet: 'v/ve', desc: 'Artichoke hearts, mushrooms, red pepper, olives, and basil, on tomato and mozzarella', price: 12, game: 'Pass the Pigs', onShelf: true },
  { name: "That's my Fish!", desc: 'Anchovies, mushrooms, and olives on tomato, garlic, and mozzarella', price: 13, game: "Hey, That's My Fish!", onShelf: true },
  { name: 'Exploding Chickens', desc: 'Chicken and pesto, with cherry tomatoes and olives, on tomato and mozzarella', price: 13, game: 'Exploding Kittens', onShelf: true },
  { name: 'Pepperoni for Neanderthals', desc: 'Tomato, mozzarella, and pepperoni', price: 12, game: 'Poetry for Neanderthals', onShelf: true },
  { name: 'Cheesy Garlic Pizza Bread', diet: 'v/ve', desc: 'Vegan garlic butter and mozzarella', price: 10, game: '' },
];

export interface MenuItem {
  name: string;
  diet?: Diet;
  desc?: string;
  price?: number | string;
}

export const FOOD_SECTIONS: { title: string; items: MenuItem[] }[] = [
  {
    title: 'Sharers',
    items: [
      { name: 'Charcuterie Board', desc: 'A selection of meats and cheeses, served with crackers, rocket, and caramelised onion chutney.', price: 15 },
      { name: 'Cheese Board', diet: 'v', desc: 'A selection of cheeses, served with crackers, rocket, and caramelised onion.', price: 12 },
    ],
  },
  {
    title: 'Salad',
    items: [{ name: 'Caprese', diet: 'v', desc: 'Mozzarella, cherry tomatoes, basil, drizzled with olive oil and balsamic vinegar', price: 6 }],
  },
  {
    title: 'Sides',
    items: [
      { name: 'Truffle & Parmesan Chips', price: 5.5 },
      { name: 'Cajun Chips', diet: 've', price: 4.5 },
      { name: 'Chips', diet: 've', price: 4 },
    ],
  },
  {
    title: 'Desserts',
    items: [{ name: 'Chocolate Brownie', price: 2.5 }],
  },
];

export const FOOD_NOTES = [
  'v – vegetarian / ve – vegan',
  'Please let a member of staff know of any food allergies before ordering.',
  '*Unfortunately, we cannot guarantee the complete absence of any allergen due to potential cross-contamination in our kitchen.',
];

export const COCKTAIL_DEAL = { one: 10, twoSame: 17.5 };

export const COCKTAILS: { name: string; desc: string }[] = [
  { name: 'Margarita', desc: 'Tequila, Triple Sec, Lime' },
  { name: 'Spicy Margarita', desc: 'Shaken with Chilli Flakes' },
  { name: 'Espresso Martini', desc: 'Vodka, Tia Maria, Espresso' },
  { name: 'Passionfruit Martini', desc: 'Vanilla Vodka, Passionfruit, Sugar' },
  { name: 'Mojito', desc: 'Rum, Lime, Mint, Sugar, Soda' },
  { name: 'Moscow Mule', desc: 'Vodka, Lime, Ginger Beer' },
  { name: 'Dark & Stormy', desc: 'Rum, Lime, Ginger Beer' },
  { name: 'Aperol Spritz', desc: 'Aperol, Prosecco, Soda' },
  { name: 'Sex on the Beach', desc: 'Vodka, Peach Schnapps, Orange Juice, Grenadine' },
  { name: 'Amaretto Sour', desc: 'Amaretto and Lime' },
  { name: 'Strawberry Daiquiri', desc: 'Rum, Strawberry, Lime' },
  { name: 'Old Fashioned', desc: 'Whiskey, Bitters, Sugar' },
  { name: 'Appletini', desc: 'Vodka, Apple Liquer, Apple Juice, Lemon, Lime' },
  { name: 'Prosecco French 75', desc: 'Gin, Lemon, Sugar, Prosecco' },
  { name: 'Tom Collins', desc: 'Gin, Lemon, Sugar, Soda' },
  { name: 'Corpse Reviver no. 2', desc: 'Gin, Vermouth, Orange Juice, Lemon' },
  { name: 'Gimlet', desc: 'Gin, Lime, Sugar' },
  { name: 'Negroni', desc: 'Gin, Campari, Sweet Vermouth' },
];

export const MOCKTAILS: MenuItem[] = [
  { name: 'Pineapple Mule', desc: 'A tangy mix of pineapple and lemon. Cut with ginger ale', price: 6 },
  { name: 'Strawberry Moquiri', desc: 'Strawberry, apple, and lime. Topped with lemonade', price: 6 },
  { name: 'No-jito', desc: 'Muddled lime, fresh mint, and sugar. Topped with soda', price: 6 },
  {
    name: 'Everleaf & Tonic',
    desc: 'Unique and aromatic non-alcoholic aperitif. Everleaf Marine — Bergamot, kelp, sea buckthorn. Everleaf Mountain — strawberry, cherry blossom, rosehip',
    price: 7,
  },
];

// The menu marks every drink with a card suit
export type Suit = 'spade' | 'club' | 'heart' | 'diamond';

export interface Pour {
  name: string;
  suit: Suit;
  origin: string;
  notes: string[];
  prices: (number | null)[];
}

export const DRAUGHT = {
  sizes: ['pint', '2/3', '1/2'],
  items: [
    { name: 'Hiker - Lager', suit: 'spade', origin: 'Mondo, Battersea', notes: ['Crisp', 'Refreshing', 'Helles Lager'], prices: [6.7, 4.5, 3.4] },
    { name: 'Little Victories - IPA', suit: 'club', origin: 'Mondo, Battersea', notes: ['Citrus', 'Hoppy', 'Session IPA'], prices: [6.9, 4.7, 3.6] },
    { name: 'Hazy Hog - Cider', suit: 'heart', origin: 'Hogs back, Surrey', notes: ['Cloudy Apple', 'Dry', 'Cider'], prices: [6.8, 4.6, 3.5] },
  ] as Pour[],
};

export const CANS_NOTE = { title: 'Special & Seasonal Beer Cans', body: 'Check the fridges or ask a member of staff for current options and prices' };

export const ALCOHOL_FREE_BEER: Pour = {
  name: 'Little Swine', suit: 'diamond', origin: 'Hogsback, Surrey', notes: ['Full-hopped', 'Crisp', '0.5% Pale Ale'], prices: [5],
};

export const WINE = {
  sizes: ['175ml', '250ml', 'bottle'],
  groups: [
    {
      title: 'White',
      items: [
        { name: 'Statua Pinot Grigio', suit: 'club', origin: 'Veneto, Italy', notes: ['Clean', 'Fresh', 'Zesty'], prices: [6.5, 9, 26] },
        { name: 'Fairfields Sauvignon Blanc', suit: 'club', origin: 'Marlborough, New Zealand', notes: ['Ripe', 'Tropical', 'Refreshing'], prices: [7.2, 10, 28] },
        { name: 'Jean Biecher Riesling', suit: 'club', origin: 'Alsace, France', notes: ['Limes', 'Floral', 'Crisp'], prices: [7.5, 10.5, 30] },
      ] as Pour[],
    },
    {
      title: 'Red',
      items: [
        { name: 'Oscuro Mendoza Malbec', suit: 'diamond', origin: 'Mendoza, Argentina', notes: ['Fruity', 'Spiced', 'Full-bodied'], prices: [7.2, 10, 28] },
        { name: 'Les Nuages Pinot Noir Rouge', suit: 'diamond', origin: 'Mendoza, Argentina', notes: ['Red Currants', 'Violets', 'Light-bodied'], prices: [8, 11, 32] },
        // Printed origin kept exactly as on the menu
        { name: 'Masseria Borgo Del Trulli Primitivo', suit: 'diamond', origin: 'Mendoza, Argentina', notes: ['Red Fruits', 'Elegant', 'Full-bodied'], prices: [null, null, 36] },
      ] as Pour[],
    },
    {
      title: 'Rosé',
      items: [
        { name: 'Le Versant Grenache Rosé', suit: 'heart', origin: 'Languedoc, France', notes: ['Raspberry', 'Citrus', 'Smooth'], prices: [7.5, 10.5, 30] },
      ] as Pour[],
    },
    {
      title: 'Sparkling',
      items: [
        { name: 'Vitelli Prosecco NV', suit: 'spade', origin: 'Italy', notes: ['Off Dry', 'Peach', 'Pear'], prices: [7, null, 27] },
      ] as Pour[],
    },
  ],
  note: '125ml glasses available on request',
};

export const MEAD = {
  intro: 'Our mead comes from Afon Mêl, a small family-run bee farm on the outskirts of New Quay, Wales',
  sizes: ['125ml', 'bottle'],
  items: [
    { name: 'Heather Mead', suit: 'heart' as Suit, origin: 'Afon Mêl', desc: 'Floral on the nose, with hints of caramel. The honey comes through decisively but not too sweetly.', prices: [7, 40] },
    { name: 'Apricot Mead', suit: 'heart' as Suit, origin: 'Afon Mêl', desc: 'Tart apricot flavour with almond notes.', prices: [7, 40] },
  ],
};

export const SPIRITS: MenuItem[] = [
  { name: 'Gin, Vodka, Rum', price: '5 / 7' },
  { name: 'Whiskey', price: '6 / 8.4' },
  { name: 'Alcohol Free Gin', price: '4 / 5.6' },
  { name: '+ Mixer', price: 1.2 },
];

export const HOT_DRINKS: MenuItem[] = [
  { name: 'Espresso', price: 2.7 },
  { name: 'Americano', price: 3.1 },
  { name: 'Cappuccino', price: 3.5 },
  { name: 'Flat White', price: 3.5 },
  { name: 'Latte', price: 3.5 },
  { name: 'Mocha', price: 3.7 },
  { name: 'Chai Latte', price: 3.2 },
  { name: 'Hot Chocolate', price: 3.1 },
  { name: 'Luxury Hot Chocolate', desc: 'with marshmallows and vegan whipped cream', price: 3.6 },
  { name: 'Black Tea', desc: 'decaf option available', price: 2.2 },
  { name: 'Green Tea', price: 2.2 },
  { name: 'Peppermint Tea', price: 2.2 },
  { name: '+ Syrup', price: 0.5 },
  { name: '+ Oat', price: 0.2 },
];

export const SOFT_DRINKS: MenuItem[] = [
  { name: 'Coke', price: 3 },
  { name: 'Diet Coke', price: 3 },
  { name: 'Coke Zero', price: 3 },
  { name: 'Fanta Orange', price: 3 },
  { name: 'Schweppes Lemonade', price: 3 },
  { name: 'San Pellegrino Orange', price: 3 },
  { name: 'Fentimans Ginger Beer', price: 3.5 },
  { name: 'Fentimans Rose Lemonade', price: 3.5 },
  { name: 'Fentimans Dandelion and Burdock', price: 3.5 },
  { name: 'Trip CBD Mint and Elderflower', price: 3.5 },
  { name: 'Trip CBD Peach and Ginger', price: 3.5 },
  { name: 'Monster energy Ultra white', price: 4 },
  { name: 'Pineapple Juice', price: 2.5 },
  { name: 'Orange Juice', price: 2.5 },
  { name: 'Apple Juice', price: 2.5 },
  { name: 'Harrogate water still/sparkling', price: 1.5 },
];

/* ------------------------------------------------------------------ */
/* Events                                                              */
/* ------------------------------------------------------------------ */

export type ArtKey =
  | 'lorcana'
  | 'mixer'
  | 'clocktower'
  | 'dnd'
  | 'language'
  | 'write'
  | 'music'
  | 'carrom'
  | 'dungeon';

export interface Signup {
  label: string;
  url: string;
  via: 'Meetup' | 'Ticket Tailor' | 'Email' | 'Phone';
}

export interface EventBase {
  id: string;
  name: string;
  start: string; // "18:30", London time
  end?: string;
  price: string; // as they print it
  priceNote?: string;
  blurb: string[]; // their own words
  signups: Signup[];
  howToJoin: string;
  art: ArtKey;
  photo?: string; // key into public/img
}

export interface WeeklyEvent extends EventBase {
  kind: 'weekly';
  weekday: number; // 0 = Sunday
}

export interface MonthlyEvent extends EventBase {
  kind: 'monthly';
  rule: 'last-sunday';
  ruleLabel: string;
  extra?: { label: string; url: string };
}

export interface OneOffEvent extends EventBase {
  kind: 'one-off';
  date: string; // YYYY-MM-DD
  presentedBy?: string;
}

export type AnyEvent = WeeklyEvent | MonthlyEvent | OneOffEvent;

// Meetup groups that run the regular nights. The links on otterchaos.co.uk point at
// single dated occurrences that have since passed (e.g. events/315891720 = 18 Aug 2026),
// so the site links each group's upcoming-events list instead.
const MEETUP_SLBG = 'https://www.meetup.com/south-london-board-games/events/';
const MEETUP_OVERBOARD = 'https://www.meetup.com/overboardlondon/events/';
const MEETUP_SUW = 'https://www.meetup.com/shutupandwritelondon/events/';

export const WEEKLY_EVENTS: WeeklyEvent[] = [
  {
    kind: 'weekly',
    id: 'lorcana',
    weekday: 1,
    name: 'Disney Lorcana TCG',
    // Their events page lists both 6:30pm (full listing) and 7pm (summary strip)
    start: '18:30',
    price: '£5',
    priceNote: 'on the door',
    blurb: [
      'Calling all Disney fans! Come along and play Disney Lorcana at Otter Chaos, where the focus is inclusion and fun!',
      'Never played before? Our passionate and experienced illumineers will be delighted to teach you the game.',
    ],
    signups: [],
    howToJoin: 'Weekly organised play. Just turn up. Questions? Give us a ring.',
    art: 'lorcana',
  },
  {
    kind: 'weekly',
    id: 'mixer',
    weekday: 2,
    name: 'Board Game Social Mixer',
    start: '18:00',
    price: '£5',
    priceNote: 'on the door',
    blurb: [
      'Every Tuesday night we run an open social mixer where you can join in with a friendly group of experienced and brand-new board gamers alike.',
      'Check in with our staff when you arrive and they will point you in the direction of the other social mixers!',
    ],
    signups: [{ label: 'Sign up', url: 'https://www.meetup.com/south-london-board-games/', via: 'Meetup' }],
    howToJoin: 'Come alone or bring friends. Book on Meetup or just show up.',
    art: 'mixer',
    photo: 'mixer',
  },
  {
    kind: 'weekly',
    id: 'clocktower',
    weekday: 3,
    name: 'Blood on the Clocktower',
    start: '19:00',
    price: '£5',
    priceNote: 'on the door',
    blurb: [
      'Our weekly beginner-friendly session of this rich social deduction game, a successor to games like Mafia and Werewolf, led by an experienced storyteller.',
    ],
    signups: [{ label: 'Sign up', url: MEETUP_OVERBOARD, via: 'Meetup' }],
    howToJoin: 'Details and sign-up on the OverBoard Meetup.',
    art: 'clocktower',
  },
  {
    kind: 'weekly',
    id: 'dnd',
    weekday: 4,
    name: 'Dungeons & Dragons',
    start: '18:30',
    price: '£7',
    priceNote: 'on the door',
    blurb: [
      'Whether you’re a seasoned adventurer or completely new to the game, our D&D nights are led by skilled Dungeon Masters who can tailor the experience to be beginner-friendly.',
      'If you are looking for immersive storytelling, thrilling combat, and plenty of laughs along the way then make sure to sign up adventurer!',
    ],
    signups: [{ label: 'Sign up', url: MEETUP_SLBG, via: 'Meetup' }],
    howToJoin: 'Book on Meetup, or just show up on the day.',
    art: 'dnd',
    photo: 'dnd-table',
  },
  {
    kind: 'weekly',
    id: 'language',
    weekday: 6,
    name: 'Spanish / French Language Social',
    start: '11:00',
    price: 'Free',
    blurb: [
      'If you speak Spanish/French or are learning Spanish/French this is the place for you. A weekly language club to socialise, practise and build community.',
    ],
    // Separate French and Spanish sessions, both on the South London Board Games Meetup
    signups: [{ label: 'Pick French or Spanish', url: MEETUP_SLBG, via: 'Meetup' }],
    howToJoin: 'Free to attend. Grab a spot on Meetup.',
    art: 'language',
  },
  {
    kind: 'weekly',
    id: 'write',
    weekday: 0,
    name: 'Shut Up & Write',
    start: '11:00',
    end: '12:30',
    price: 'Free',
    blurb: [
      '11am: early arrivals, time to settle in and chat with the other writers.',
      '11:30am: the timer starts. No talking, focused writing time.',
      '12:30pm: the no-talking time is over. Stay and keep writing, or stay and chat.',
    ],
    signups: [{ label: 'Tickets', url: MEETUP_SUW, via: 'Meetup' }],
    howToJoin: 'Free to attend. Tickets on Meetup.',
    art: 'write',
  },
];

export const MONTHLY_EVENTS: MonthlyEvent[] = [
  {
    kind: 'monthly',
    id: 'music',
    rule: 'last-sunday',
    ruleLabel: 'Last Sunday of every month',
    name: 'Otter Chaos Live Music Night',
    start: '20:00',
    price: '£5',
    priceNote: 'on the door',
    blurb: [
      'End the month with an evening packed with up and coming musicians! With an emphasis on variety, there’s something for everyone. You may even discover a new favourite!',
    ],
    signups: [],
    howToJoin: 'No booking needed, just turn up.',
    extra: { label: 'Want to play? otterchorus@gmail.com', url: 'mailto:otterchorus@gmail.com' },
    art: 'music',
    photo: 'live-music',
  },
];

export const ONE_OFF_EVENTS: OneOffEvent[] = [
  {
    kind: 'one-off',
    id: 'carrom-2026-10-20',
    date: '2026-10-20',
    start: '19:15',
    end: '22:00',
    name: 'Carrom Social',
    presentedBy: 'It’s Not Chai Tea x Otter Chaos',
    price: '£8.50',
    priceNote: 'ticket',
    blurb: [
      'It’s Not Chai Tea is bringing their Carrom Social from Bristol to London for the first time. An evening of carrom competition, nibbles, drinks and of course, prizes for the winners!',
      'Carrom is an Indian tabletop game that is easy to learn for people of all ages and complete beginners.',
    ],
    signups: [{ label: 'Tickets £8.50', url: 'https://www.tickettailor.com/events/itsnotchaiteaevents/2412538', via: 'Ticket Tailor' }],
    howToJoin: 'Ticketed. Compete for the winning prize hamper.',
    art: 'carrom',
  },
  {
    kind: 'one-off',
    id: 'drinking-dungeon-2026-10-31',
    date: '2026-10-31',
    start: '16:00',
    name: 'The Drinking Dungeon',
    presentedBy: 'Halloween D&D show',
    price: '£5',
    priceNote: 'on the door',
    blurb: [
      'This Halloween join us for a crazy Dungeons and Dragons show where the players roll the dice, the audience influences the story and the drinks can change everything!',
      'Grab a drink. Roll the dice. Shape the story. Followed by an Otter Chaos afterparty! (>ᴗ•)',
    ],
    signups: [],
    howToJoin: 'No booking needed. Stay for the afterparty.',
    art: 'dungeon',
  },
];

export const EVENTS_COPY = {
  intro: 'To attend our events you can book in advance through Meetup or just show up on the day!',
};

/* ------------------------------------------------------------------ */
/* Private hire                                                        */
/* ------------------------------------------------------------------ */

export const HIRE = {
  pitch:
    'Whether you are planning a private party, board game tournament or corporate event, our two spacious railway arches can accommodate events from intimate gatherings to full brand takeovers.',
  partOrWhole: 'Some or all of the venue can be booked out for private events.',
  kinds: [
    { id: 'party', title: 'Private party', suit: 'heart' as Suit, body: 'Birthdays, leaving dos, a big catch-up. Pizzas, cocktails and 500+ games for the table.' },
    { id: 'tournament', title: 'Board game tournament', suit: 'club' as Suit, body: 'Clubs, leagues and organised play. Disney Lorcana already runs here every Monday.' },
    { id: 'corporate', title: 'Corporate event', suit: 'diamond' as Suit, body: 'Team socials that aren’t another pub quiz, right by Brixton’s tube and rail stations.' },
    { id: 'takeover', title: 'Brand takeover', suit: 'spade' as Suit, body: 'Both arches, your name on the tables. Ask about launches and pop-ups.' },
  ],
  caseStudy: {
    title: 'Switch Off, Game On',
    with: 'Big Potato Games',
    when: '22–23 January 2026, 2pm–10pm',
    body: 'Two days with Big Potato Games: put your phone away for an hour, play some games and “actually connect in person”. Free to join, with a free drink on arrival.',
    source: { label: 'Brixton Buzz', url: 'https://www.brixtonbuzz.com/2026/01/switch-off-game-on-free-gaming-events-at-otter-chaos-in-brixton-22nd-23rd-january-2026/' },
  },
  alsoHosted: [
    { what: 'Carrom Social with It’s Not Chai Tea, up from Bristol', when: 'Oct 2026' },
    { what: 'A board games fundraiser for Lambeth & Croydon Foodbank', when: 'Apr 2026' },
    { what: 'Weekly organised play for Disney Lorcana, D&D and Blood on the Clocktower', when: 'Every week' },
  ],
  numbersNote:
    'Tell us roughly how many are coming and when, and we’ll come back with what’s possible, including food, drink and minimum spend.',
};

/* ------------------------------------------------------------------ */
/* Gift cards (sold through DesignMyNight)                             */
/* ------------------------------------------------------------------ */

export const GIFT_CARD = {
  name: 'Otter Chaos Gift Card',
  range: '£10 – £50',
  url: 'https://www.designmynight.com/vouchers/otter-chaos-ltd/everything-voucher',
  covers: [
    'Table fees',
    'Anything from the food and drink menu',
    'Board games from the selection we sell on site',
  ],
  terms: ['Valid 12 months from purchase', 'Spend it over as many visits as you like, up to its value', 'Can’t be exchanged for cash'],
  redeem: 'Bring it along and let our staff know when you arrive that you’ll be spending from it.',
};

/* ------------------------------------------------------------------ */
/* Getting here & access                                               */
/* ------------------------------------------------------------------ */

export const GETTING_HERE = {
  line: 'Located minutes away from central London on the Victoria line, we are directly underneath Brixton rail station and just a dice throw away from the tube.',
  routes: [
    { mode: 'Tube', detail: 'Brixton (Victoria line), a couple of minutes’ walk' },
    { mode: 'Rail', detail: 'Brixton station, right above our heads' },
  ],
};

export const ACCESS = {
  listed: ['Wheelchair access', 'Accessible toilets'],
  source: 'Listed on our DesignMyNight venue page',
  music: 'Background music',
  allergens: 'Please let a member of staff know of any food allergies before ordering.',
};

/* ------------------------------------------------------------------ */
/* Press & reviews (verbatim, credited)                                */
/* ------------------------------------------------------------------ */

export const PRESS = [
  { outlet: 'Visit London', title: 'The best board game cafés in London you need to visit', url: 'https://www.visitlondon.com/blog/board-game-cafes-london' },
  { outlet: 'Brixton Buzz', title: 'Otter Chaos – Brixton’s incredible board game cafe keeps on growing', url: 'https://www.brixtonbuzz.com/2026/02/otter-chaos-brixtons-incredible-board-game-cafe/' },
];

// From the reviews on their DesignMyNight listing (reviewers are anonymous there)
export const REVIEWS = [
  { text: 'The staff are very personable and helpful too when selecting a game.', source: 'DesignMyNight review', date: 'October 2024' },
  { text: 'Always have a great time at Otter Chaos. Introduces me to so many new games.', source: 'DesignMyNight review', date: 'February 2025' },
  { text: 'What a great place to be on a grey winters day.', source: 'DesignMyNight review', date: 'January 2025' },
];

export const ABOUT = {
  lines: [
    'Nestled under Brixton station, Otter Chaos has over 500 games for you to play.',
    'Bring your family, a couple of friends, or the whole gang for a wonderful time playing anything from the silliest of party games, to the most involved heavy strategy games.',
  ],
  // From the 2024 Brixton Buzz opening piece, in their words
  cheeky: 'We also host a range of events, in case your friends are boring and don’t want to play games with you every evening.',
  // Their Disney Lorcana store profile
  whoRunsIt: 'A boardgame café in the heart of Brixton, run by 3 friends.',
  libraryNote:
    'We are often getting in new games and occasionally have to retire old favourites. If there is a specific game you really want to play, please call ahead to double check we have it.',
  fullLibrary: 'https://geekgroup.app/users/otter_chaos/collection',
  bgg: 'https://boardgamegeek.com/collection/user/Otter_Chaos',
};

/* ------------------------------------------------------------------ */
/* Games: a sample of the Otter_Chaos collection on BoardGameGeek      */
/* (players, play time and BGG weight from BoardGameGeek)              */
/* ------------------------------------------------------------------ */

// Their three shelves: "casual party and icebreakers, through co-operative puzzlers to heavy strategy"
export type GameTier = 'party' | 'coop' | 'strategy';

export const TIERS: { id: GameTier; title: string; blurb: string }[] = [
  { id: 'party', title: 'Casual party & icebreakers', blurb: 'Quick to teach, loud, good with a drink in hand.' },
  { id: 'coop', title: 'Co-operative puzzlers', blurb: 'Everyone on the same side, against the game.' },
  { id: 'strategy', title: 'Strategy, up to heavy', blurb: 'From gateway games to the ones you book three hours for. More dots, more rules.' },
];

export interface Game {
  id: number; // BoardGameGeek id
  name: string;
  year: number | null;
  minPlayers: number;
  maxPlayers: number;
  minTime: number;
  maxTime: number;
  weight: number; // BGG average weight, 1 (light) to 5 (heavy)
  tier: GameTier;
}

export const GAMES: Game[] = [
  { id: 68448, name: '7 Wonders', year: 2010, minPlayers: 2, maxPlayers: 7, minTime: 30, maxTime: 30, weight: 2.31, tier: 'strategy' },
  { id: 173346, name: '7 Wonders Duel', year: 2015, minPlayers: 2, maxPlayers: 2, minTime: 30, maxTime: 30, weight: 2.23, tier: 'strategy' },
  { id: 31260, name: 'Agricola', year: 2007, minPlayers: 1, maxPlayers: 5, minTime: 30, maxTime: 150, weight: 3.64, tier: 'strategy' },
  { id: 230802, name: 'Azul', year: 2017, minPlayers: 2, maxPlayers: 4, minTime: 30, maxTime: 45, weight: 1.77, tier: 'strategy' },
  { id: 191925, name: 'Bandido', year: 2016, minPlayers: 1, maxPlayers: 4, minTime: 10, maxTime: 15, weight: 1.12, tier: 'coop' },
  { id: 143741, name: 'BANG! The Dice Game', year: 2013, minPlayers: 3, maxPlayers: 8, minTime: 15, maxTime: 15, weight: 1.28, tier: 'party' },
  { id: 2453, name: 'Blokus', year: 2000, minPlayers: 2, maxPlayers: 4, minTime: 30, maxTime: 30, weight: 1.73, tier: 'strategy' },
  { id: 11, name: 'Bohnanza', year: 1997, minPlayers: 3, maxPlayers: 7, minTime: 45, maxTime: 45, weight: 1.67, tier: 'strategy' },
  { id: 224517, name: 'Brass: Birmingham', year: 2018, minPlayers: 2, maxPlayers: 4, minTime: 60, maxTime: 120, weight: 3.86, tier: 'strategy' },
  { id: 171131, name: 'Captain Sonar', year: 2016, minPlayers: 2, maxPlayers: 8, minTime: 45, maxTime: 60, weight: 2.21, tier: 'party' },
  { id: 822, name: 'Carcassonne', year: 2000, minPlayers: 2, maxPlayers: 5, minTime: 30, maxTime: 45, weight: 1.88, tier: 'strategy' },
  { id: 155426, name: 'Castles of Mad King Ludwig', year: 2014, minPlayers: 1, maxPlayers: 4, minTime: 90, maxTime: 90, weight: 2.65, tier: 'strategy' },
  { id: 13, name: 'Catan', year: 1995, minPlayers: 3, maxPlayers: 4, minTime: 60, maxTime: 120, weight: 2.28, tier: 'strategy' },
  { id: 209685, name: 'Century: Spice Road', year: 2017, minPlayers: 2, maxPlayers: 5, minTime: 30, maxTime: 45, weight: 1.8, tier: 'strategy' },
  { id: 178900, name: 'Codenames', year: 2015, minPlayers: 2, maxPlayers: 8, minTime: 15, maxTime: 15, weight: 1.25, tier: 'party' },
  { id: 224037, name: 'Codenames: Duet', year: 2017, minPlayers: 2, maxPlayers: 2, minTime: 15, maxTime: 30, weight: 1.36, tier: 'coop' },
  { id: 158899, name: 'Colt Express', year: 2014, minPlayers: 2, maxPlayers: 6, minTime: 40, maxTime: 40, weight: 1.83, tier: 'strategy' },
  { id: 147151, name: 'Concept', year: 2013, minPlayers: 4, maxPlayers: 12, minTime: 40, maxTime: 40, weight: 1.38, tier: 'party' },
  { id: 131357, name: 'Coup', year: 2012, minPlayers: 2, maxPlayers: 6, minTime: 15, maxTime: 15, weight: 1.41, tier: 'party' },
  { id: 150376, name: 'Dead of Winter: A Crossroads Game', year: 2014, minPlayers: 2, maxPlayers: 5, minTime: 60, maxTime: 120, weight: 3.01, tier: 'strategy' },
  { id: 225694, name: 'Decrypto', year: 2018, minPlayers: 3, maxPlayers: 8, minTime: 15, maxTime: 45, weight: 1.82, tier: 'party' },
  { id: 169654, name: 'Deep Sea Adventure', year: 2014, minPlayers: 2, maxPlayers: 6, minTime: 30, maxTime: 30, weight: 1.19, tier: 'party' },
  { id: 256382, name: 'Disney Villainous: The Worst Takes it All', year: 2018, minPlayers: 2, maxPlayers: 6, minTime: 45, maxTime: 120, weight: 2.48, tier: 'strategy' },
  { id: 39856, name: 'Dixit', year: 2008, minPlayers: 3, maxPlayers: 8, minTime: 30, maxTime: 30, weight: 1.19, tier: 'party' },
  { id: 370591, name: 'Dorfromantik: The Board Game', year: 2022, minPlayers: 1, maxPlayers: 6, minTime: 30, maxTime: 60, weight: 1.63, tier: 'coop' },
  { id: 172225, name: 'Exploding Kittens', year: 2015, minPlayers: 2, maxPlayers: 5, minTime: 15, maxTime: 15, weight: 1.08, tier: 'party' },
  { id: 157354, name: 'Five Tribes: The Djinns of Naqala', year: 2014, minPlayers: 2, maxPlayers: 4, minTime: 40, maxTime: 80, weight: 2.84, tier: 'strategy' },
  { id: 136063, name: 'Forbidden Desert', year: 2013, minPlayers: 2, maxPlayers: 5, minTime: 45, maxTime: 45, weight: 2.04, tier: 'coop' },
  { id: 65244, name: 'Forbidden Island', year: 2010, minPlayers: 2, maxPlayers: 4, minTime: 30, maxTime: 30, weight: 1.74, tier: 'coop' },
  { id: 98778, name: 'Hanabi', year: 2010, minPlayers: 2, maxPlayers: 5, minTime: 25, maxTime: 25, weight: 1.69, tier: 'coop' },
  { id: 158600, name: 'Hanamikoji', year: 2013, minPlayers: 2, maxPlayers: 2, minTime: 15, maxTime: 15, weight: 1.67, tier: 'strategy' },
  { id: 366013, name: 'Heat: Pedal to the Metal', year: 2022, minPlayers: 1, maxPlayers: 6, minTime: 30, maxTime: 60, weight: 2.2, tier: 'strategy' },
  { id: 8203, name: "Hey, That's My Fish!", year: 2003, minPlayers: 2, maxPlayers: 4, minTime: 20, maxTime: 20, weight: 1.44, tier: 'party' },
  { id: 2655, name: 'Hive', year: 2001, minPlayers: 2, maxPlayers: 2, minTime: 20, maxTime: 20, weight: 2.31, tier: 'strategy' },
  { id: 54043, name: 'Jaipur', year: 2009, minPlayers: 2, maxPlayers: 2, minTime: 30, maxTime: 30, weight: 1.46, tier: 'strategy' },
  { id: 2452, name: 'Jenga', year: 1983, minPlayers: 1, maxPlayers: 8, minTime: 20, maxTime: 20, weight: 1.1, tier: 'party' },
  { id: 70323, name: 'King of Tokyo', year: 2011, minPlayers: 2, maxPlayers: 6, minTime: 30, maxTime: 30, weight: 1.48, tier: 'party' },
  { id: 204583, name: 'Kingdomino', year: 2016, minPlayers: 2, maxPlayers: 4, minTime: 15, maxTime: 25, weight: 1.24, tier: 'party' },
  { id: 50, name: 'Lost Cities', year: 1999, minPlayers: 2, maxPlayers: 2, minTime: 30, maxTime: 30, weight: 1.47, tier: 'strategy' },
  { id: 312484, name: 'Lost Ruins of Arnak', year: 2020, minPlayers: 1, maxPlayers: 4, minTime: 30, maxTime: 120, weight: 2.93, tier: 'strategy' },
  { id: 129622, name: 'Love Letter', year: 2012, minPlayers: 2, maxPlayers: 4, minTime: 20, maxTime: 20, weight: 1.18, tier: 'party' },
  { id: 143884, name: 'Machi Koro', year: 2012, minPlayers: 2, maxPlayers: 4, minTime: 30, maxTime: 30, weight: 1.52, tier: 'party' },
  { id: 118, name: 'Modern Art', year: 1992, minPlayers: 3, maxPlayers: 5, minTime: 45, maxTime: 45, weight: 2.27, tier: 'strategy' },
  { id: 1927, name: 'Munchkin', year: 2001, minPlayers: 3, maxPlayers: 6, minTime: 60, maxTime: 120, weight: 1.82, tier: 'party' },
  { id: 181304, name: 'Mysterium', year: 2015, minPlayers: 2, maxPlayers: 7, minTime: 42, maxTime: 42, weight: 1.89, tier: 'coop' },
  { id: 12942, name: 'No Thanks!', year: 2004, minPlayers: 3, maxPlayers: 7, minTime: 20, maxTime: 20, weight: 1.13, tier: 'party' },
  { id: 30549, name: 'Pandemic', year: 2008, minPlayers: 2, maxPlayers: 4, minTime: 45, maxTime: 45, weight: 2.39, tier: 'coop' },
  { id: 2593, name: 'Pass the Pigs', year: 1977, minPlayers: 2, maxPlayers: 10, minTime: 30, maxTime: 30, weight: 1.07, tier: 'party' },
  { id: 163412, name: 'Patchwork', year: 2014, minPlayers: 2, maxPlayers: 2, minTime: 15, maxTime: 30, weight: 1.6, tier: 'strategy' },
  { id: 218603, name: 'Photosynthesis', year: 2017, minPlayers: 2, maxPlayers: 4, minTime: 30, maxTime: 60, weight: 2.26, tier: 'strategy' },
  { id: 312786, name: 'Poetry for Neanderthals', year: 2020, minPlayers: 2, maxPlayers: 12, minTime: 15, maxTime: 15, weight: 1.11, tier: 'party' },
  { id: 244521, name: 'Quacks', year: 2018, minPlayers: 2, maxPlayers: 4, minTime: 45, maxTime: 45, weight: 1.94, tier: 'strategy' },
  { id: 25669, name: 'Qwirkle', year: 2006, minPlayers: 2, maxPlayers: 4, minTime: 45, maxTime: 45, weight: 1.57, tier: 'party' },
  { id: 237182, name: 'Root', year: 2018, minPlayers: 2, maxPlayers: 4, minTime: 60, maxTime: 90, weight: 3.84, tier: 'strategy' },
  { id: 9220, name: 'Saboteur', year: 2004, minPlayers: 3, maxPlayers: 10, minTime: 30, maxTime: 30, weight: 1.32, tier: 'party' },
  { id: 291453, name: 'SCOUT', year: 2019, minPlayers: 2, maxPlayers: 5, minTime: 20, maxTime: 20, weight: 1.4, tier: 'party' },
  { id: 169786, name: 'Scythe', year: 2016, minPlayers: 1, maxPlayers: 5, minTime: 115, maxTime: 115, weight: 3.45, tier: 'strategy' },
  { id: 367220, name: 'Sea Salt & Paper', year: 2022, minPlayers: 2, maxPlayers: 4, minTime: 30, maxTime: 45, weight: 1.49, tier: 'party' },
  { id: 188834, name: 'Secret Hitler', year: 2016, minPlayers: 5, maxPlayers: 10, minTime: 45, maxTime: 45, weight: 1.73, tier: 'party' },
  { id: 92415, name: 'Skull', year: 2011, minPlayers: 3, maxPlayers: 6, minTime: 15, maxTime: 45, weight: 1.12, tier: 'party' },
  { id: 373106, name: 'Sky Team', year: 2023, minPlayers: 2, maxPlayers: 2, minTime: 20, maxTime: 20, weight: 2.04, tier: 'coop' },
  { id: 329839, name: 'So Clover!', year: 2021, minPlayers: 3, maxPlayers: 6, minTime: 30, maxTime: 30, weight: 1.12, tier: 'coop' },
  { id: 123096, name: 'Space Cadets', year: 2012, minPlayers: 3, maxPlayers: 6, minTime: 60, maxTime: 120, weight: 2.75, tier: 'coop' },
  { id: 162886, name: 'Spirit Island', year: 2017, minPlayers: 1, maxPlayers: 4, minTime: 90, maxTime: 120, weight: 4.08, tier: 'coop' },
  { id: 148228, name: 'Splendor', year: 2014, minPlayers: 2, maxPlayers: 4, minTime: 30, maxTime: 30, weight: 1.77, tier: 'strategy' },
  { id: 63268, name: 'Spot it!', year: 2009, minPlayers: 2, maxPlayers: 8, minTime: 15, maxTime: 15, weight: 1.04, tier: 'party' },
  { id: 164153, name: 'Star Wars: Imperial Assault', year: 2014, minPlayers: 2, maxPlayers: 5, minTime: 60, maxTime: 120, weight: 3.3, tier: 'strategy' },
  { id: 192291, name: 'Sushi Go Party!', year: 2016, minPlayers: 2, maxPlayers: 8, minTime: 20, maxTime: 20, weight: 1.33, tier: 'party' },
  { id: 253664, name: 'Taco Cat Goat Cheese Pizza', year: 2018, minPlayers: 2, maxPlayers: 8, minTime: 10, maxTime: 30, weight: 1.03, tier: 'party' },
  { id: 70919, name: 'Takenoko', year: 2011, minPlayers: 2, maxPlayers: 4, minTime: 45, maxTime: 45, weight: 1.97, tier: 'strategy' },
  { id: 118048, name: 'Targi', year: 2012, minPlayers: 2, maxPlayers: 2, minTime: 60, maxTime: 60, weight: 2.34, tier: 'strategy' },
  { id: 46213, name: 'Telestrations', year: 2009, minPlayers: 4, maxPlayers: 8, minTime: 30, maxTime: 30, weight: 1.07, tier: 'party' },
  { id: 167791, name: 'Terraforming Mars', year: 2016, minPlayers: 1, maxPlayers: 5, minTime: 120, maxTime: 120, weight: 3.27, tier: 'strategy' },
  { id: 324856, name: 'The Crew: Mission Deep Sea', year: 2021, minPlayers: 2, maxPlayers: 5, minTime: 20, maxTime: 20, weight: 2.06, tier: 'coop' },
  { id: 284083, name: 'The Crew: The Quest for Planet Nine', year: 2019, minPlayers: 2, maxPlayers: 5, minTime: 20, maxTime: 20, weight: 1.97, tier: 'coop' },
  { id: 221965, name: 'The Fox in the Forest', year: 2017, minPlayers: 2, maxPlayers: 2, minTime: 30, maxTime: 30, weight: 1.62, tier: 'strategy' },
  { id: 281259, name: 'The Isle of Cats', year: 2019, minPlayers: 1, maxPlayers: 4, minTime: 60, maxTime: 90, weight: 2.36, tier: 'strategy' },
  { id: 823, name: 'The Lord of the Rings', year: 2000, minPlayers: 2, maxPlayers: 5, minTime: 60, maxTime: 90, weight: 2.53, tier: 'coop' },
  { id: 244992, name: 'The Mind', year: 2018, minPlayers: 2, maxPlayers: 4, minTime: 20, maxTime: 20, weight: 1.07, tier: 'coop' },
  { id: 41114, name: 'The Resistance', year: 2009, minPlayers: 5, maxPlayers: 10, minTime: 30, maxTime: 30, weight: 1.59, tier: 'party' },
  { id: 128882, name: 'The Resistance: Avalon', year: 2012, minPlayers: 5, maxPlayers: 10, minTime: 30, maxTime: 30, weight: 1.74, tier: 'party' },
  { id: 182028, name: 'Through the Ages: A New Story of Civilization', year: 2015, minPlayers: 2, maxPlayers: 4, minTime: 120, maxTime: 120, weight: 4.44, tier: 'strategy' },
  { id: 14996, name: 'Ticket to Ride: Europe', year: 2005, minPlayers: 2, maxPlayers: 5, minTime: 30, maxTime: 60, weight: 1.92, tier: 'strategy' },
  { id: 163967, name: 'Tiny Epic Galaxies', year: 2015, minPlayers: 1, maxPlayers: 5, minTime: 30, maxTime: 45, weight: 2.15, tier: 'strategy' },
  { id: 16992, name: 'Tsuro', year: 2005, minPlayers: 2, maxPlayers: 8, minTime: 15, maxTime: 20, weight: 1.22, tier: 'party' },
  { id: 126163, name: "Tzolk'in: The Mayan Calendar", year: 2012, minPlayers: 2, maxPlayers: 4, minTime: 90, maxTime: 90, weight: 3.66, tier: 'strategy' },
  { id: 234190, name: 'Unstable Unicorns', year: 2017, minPlayers: 2, maxPlayers: 8, minTime: 30, maxTime: 60, weight: 1.47, tier: 'party' },
  { id: 262543, name: 'Wavelength', year: 2019, minPlayers: 2, maxPlayers: 12, minTime: 30, maxTime: 45, weight: 1.1, tier: 'party' },
  { id: 266192, name: 'Wingspan', year: 2019, minPlayers: 1, maxPlayers: 5, minTime: 40, maxTime: 70, weight: 2.48, tier: 'strategy' },
  { id: 410201, name: 'Wyrmspan', year: 2024, minPlayers: 1, maxPlayers: 5, minTime: 90, maxTime: 90, weight: 2.83, tier: 'strategy' },
];
