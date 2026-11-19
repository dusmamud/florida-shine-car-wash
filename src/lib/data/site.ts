// Florida Shine Car Wash — ALL mock data lives here. Swap in real data later.
// Prices in USD. Florida, USA business. No real data, no payments.
export const site = {
	name: 'Florida Shine Car Wash',
	tagline: 'Clean Car. Brighter Days.',
	phone: '(305) 555-0198',
	phoneHref: 'tel:+13055550198',
	email: 'hello@floridashinecarwash.com',
	address: '1200 Biscayne Blvd, Miami, FL 33132',
	hours: [
		{ days: 'Monday – Saturday', time: '7:00 AM – 7:00 PM' },
		{ days: 'Sunday', time: '8:00 AM – 6:00 PM' }
	],
	socials: [
		{ name: 'Facebook', href: 'https://facebook.com/floridashinecarwash' },
		{ name: 'Instagram', href: 'https://instagram.com/floridashinecarwash' },
		{ name: 'X', href: 'https://x.com/floridashine' },
		{ name: 'TikTok', href: 'https://tiktok.com/@floridashinecarwash' }
	]
};

export type Package = {
	slug: string;
	name: string;
	price: number;
	tagline: string;
	description: string;
	features: string[];
	duration: string;
	popular?: boolean;
	image: string;
};

export const packages: Package[] = [
	{
		slug: 'basic-wash',
		name: 'Basic Wash',
		price: 16,
		tagline: 'A quality clean, every time.',
		description:
			'Our everyday exterior wash: a gentle soft-touch clean, spot-free rinse and a shine on your wheels and tires. Perfect between details.',
		features: ['Exterior Wash', 'Wheel Cleaning', 'Tire Shine'],
		duration: 'About 10 minutes',
		image: 'gallery-sedan'
	},
	{
		slug: 'premium-wash',
		name: 'Premium Wash',
		price: 28,
		tagline: 'Our best wash & protection.',
		description:
			'Everything in Basic, plus triple foam, wax protection and an underbody rinse that stands up to Florida sun, salt and sand.',
		features: ['Exterior Wash', 'Wheel Cleaning', 'Tire Shine', 'Wax Protection', 'Triple Foam'],
		duration: 'About 15 minutes',
		popular: true,
		image: 'foam-wash'
	},
	{
		slug: 'deluxe-detail',
		name: 'Deluxe Detail',
		price: 45,
		tagline: 'The ultimate clean.',
		description:
			'The full works, inside and out: premium wash plus a complete interior clean, dash and door detail, and windows inside and out.',
		features: [
			'Exterior Wash',
			'Wheel Cleaning',
			'Tire Shine',
			'Wax Protection',
			'Interior Cleaning',
			'Dash & Door Detail'
		],
		duration: 'About 45 minutes',
		image: 'interior-detail'
	}
];

export type Addon = { name: string; price: number; description: string; time: string };
export const addons: Addon[] = [
	{ name: 'Ceramic Coating', price: 199, description: 'Up to 12 months of hydrophobic protection and deep gloss.', time: '2 hours' },
	{ name: 'Full Interior Detail', price: 89, description: 'Deep vacuum, shampoo, leather care and console detail.', time: '90 minutes' },
	{ name: 'Pet Hair Removal', price: 25, description: 'Specialist tools lift embedded pet hair from seats and carpet.', time: '20 minutes' },
	{ name: 'Headlight Restoration', price: 39, description: 'Restores cloudy headlights to clear, bright and safe.', time: '30 minutes' },
	{ name: 'Odor Elimination', price: 29, description: 'Ozone treatment removes smoke, food and mildew smells.', time: '30 minutes' },
	{ name: 'Engine Bay Detail', price: 35, description: 'Safe degrease and dress for a showroom engine bay.', time: '25 minutes' },
	{ name: 'Rain Repellent', price: 15, description: 'Windshield treatment that beads water away at speed.', time: '10 minutes' },
	{ name: 'Clay Bar Treatment', price: 49, description: 'Removes bonded contaminants for glass-smooth paint.', time: '40 minutes' }
];

export type Service = {
	slug: string;
	name: string;
	short: string;
	description: string;
	priceFrom: number;
	duration: string;
	includes: string[];
	image: string;
};
export const services: Service[] = [
	{
		slug: 'exterior-wash',
		name: 'Exterior Wash',
		short: 'Soft-touch wash, triple foam and a spot-free rinse.',
		description:
			'Our signature soft-touch tunnel wash uses gentle foam, filtered water and a spot-free rinse so Florida sun never leaves marks behind. Safe for every paint type, including ceramic-coated cars.',
		priceFrom: 16,
		duration: '10–15 min',
		includes: ['Soft-touch foam wash', 'Underbody rinse', 'Spot-free rinse', 'Blow dry', 'Wheel cleaning', 'Tire shine'],
		image: 'foam-wash'
	},
	{
		slug: 'interior-detailing',
		name: 'Interior Detailing',
		short: 'Deep clean for seats, carpets, dash and every vent.',
		description:
			'From sand in the carpets to sunscreen on the dash, our team deep-cleans every surface — vacuum, shampoo, leather care and a streak-free finish on glass.',
		priceFrom: 45,
		duration: '45–90 min',
		includes: ['Deep vacuum', 'Carpet & seat shampoo', 'Leather cleaning & conditioning', 'Dash & console detail', 'Interior glass', 'Vent cleaning'],
		image: 'interior-detail'
	},
	{
		slug: 'ceramic-coating',
		name: 'Ceramic Coating',
		short: 'Months of hydrophobic gloss and sun protection.',
		description:
			'Our ceramic coating bonds to your paint for up to 12 months of water beading, UV protection and that just-waxed gloss — built for Florida heat and afternoon storms.',
		priceFrom: 199,
		duration: '2 hours',
		includes: ['Wash & decontamination', 'Clay bar prep', 'Ceramic application', 'Curing time', '12-month protection', 'Aftercare guide'],
		image: 'ceramic-coating'
	},
	{
		slug: 'wax-and-polish',
		name: 'Wax & Polish',
		short: 'Hand wax and machine polish for a mirror shine.',
		description:
			'Hand-applied carnauba wax and a gentle machine polish bring back depth and gloss, and add a sacrificial layer against salt air and love-bug season.',
		priceFrom: 39,
		duration: '30–60 min',
		includes: ['Hand wash', 'Machine polish', 'Carnauba wax', 'Chrome & trim polish', 'Paint inspection'],
		image: 'wax-polish'
	},
	{
		slug: 'wheel-and-tire-care',
		name: 'Wheel & Tire Care',
		short: 'Brake dust gone, wheels gleaming, tires dressed.',
		description:
			'Wheels take the worst of Florida roads. We deep-clean barrels and faces, remove brake dust and finish with a long-lasting tire dressing.',
		priceFrom: 15,
		duration: '15–20 min',
		includes: ['Wheel deep clean', 'Brake dust removal', 'Tire dressing', 'Wheel-well rinse', 'Lug & cap detail'],
		image: 'wheel-tire'
	},
	{
		slug: 'pet-hair-and-odor',
		name: 'Pet Hair & Odor Removal',
		short: 'Fur-free seats and fresh air, even after beach dogs.',
		description:
			'Florida dogs love the beach — and bring it home. Specialist brushes lift embedded hair, then an ozone treatment clears the smell for good.',
		priceFrom: 25,
		duration: '20–30 min',
		includes: ['Pet hair extraction', 'Carpet & seat vacuum', 'Ozone odor treatment', 'Fabric refresh', 'Vent deodorizer'],
		image: 'interior-detail'
	}
];

export type Membership = {
	slug: string;
	name: string;
	price: number;
	tagline: string;
	features: string[];
	popular?: boolean;
};
export const memberships: Membership[] = [
	{
		slug: 'basic-club',
		name: 'Basic Club',
		price: 19,
		tagline: 'Unlimited Basic Washes, every month.',
		features: ['Unlimited Basic Washes', 'One car per plan', 'Cancel anytime', 'Member-only wash lane']
	},
	{
		slug: 'premium-club',
		name: 'Premium Club',
		price: 29,
		tagline: 'Unlimited Premium Washes + wax.',
		features: ['Unlimited Premium Washes', 'Wax protection included', 'One car per plan', 'Cancel anytime', 'Free vacuum use', 'Member-only wash lane'],
		popular: true
	},
	{
		slug: 'deluxe-club',
		name: 'Deluxe Club',
		price: 39,
		tagline: 'Unlimited everything, inside and out.',
		features: ['Unlimited Deluxe Details', 'Interior cleaning included', 'One car per plan', 'Cancel anytime', 'Free vacuum use', '10% off add-ons', 'Priority booking lane']
	}
];

export type Location = {
	slug: string;
	city: string;
	name: string;
	address: string;
	zip: string;
	phone: string;
	hours: string;
	features: string[];
	lat: number;
	lng: number;
};
export const locations: Location[] = [
	{ slug: 'miami-downtown', city: 'Miami', name: 'Downtown Miami', address: '1200 Biscayne Blvd', zip: '33132', phone: '(305) 555-0198', hours: 'Mon–Sat 7 AM–7 PM · Sun 8 AM–6 PM', features: ['Tunnel wash', 'Detail studio', 'Free vacuums', 'EV charging'], lat: 25.78, lng: -80.19 },
	{ slug: 'miami-kendall', city: 'Miami', name: 'Kendall', address: '8400 SW 88th St', zip: '33156', phone: '(305) 555-0142', hours: 'Mon–Sat 7 AM–7 PM · Sun 8 AM–6 PM', features: ['Tunnel wash', 'Detail studio', 'Free vacuums'], lat: 25.66, lng: -80.36 },
	{ slug: 'tampa', city: 'Tampa', name: 'Tampa — Dale Mabry', address: '4200 N Dale Mabry Hwy', zip: '33607', phone: '(813) 555-0117', hours: 'Mon–Sat 7 AM–7 PM · Sun 8 AM–6 PM', features: ['Tunnel wash', 'Detail studio', 'Free vacuums', 'Pet wash bay'], lat: 27.99, lng: -82.51 },
	{ slug: 'orlando', city: 'Orlando', name: 'Orlando — International Drive', address: '7800 International Dr', zip: '32819', phone: '(407) 555-0163', hours: 'Mon–Sat 7 AM–7 PM · Sun 8 AM–6 PM', features: ['Tunnel wash', 'Detail studio', 'Free vacuums'], lat: 28.44, lng: -81.47 },
	{ slug: 'jacksonville', city: 'Jacksonville', name: 'Jacksonville — Southside', address: '9500 Southside Blvd', zip: '32256', phone: '(904) 555-0128', hours: 'Mon–Sat 7 AM–7 PM · Sun 8 AM–6 PM', features: ['Tunnel wash', 'Free vacuums'], lat: 30.24, lng: -81.55 },
	{ slug: 'fort-lauderdale', city: 'Fort Lauderdale', name: 'Fort Lauderdale — Federal Hwy', address: '2600 N Federal Hwy', zip: '33306', phone: '(954) 555-0174', hours: 'Mon–Sat 7 AM–7 PM · Sun 8 AM–6 PM', features: ['Tunnel wash', 'Detail studio', 'Free vacuums', 'EV charging'], lat: 26.15, lng: -80.12 },
	{ slug: 'naples', city: 'Naples', name: 'Naples — Tamiami Trail', address: '5600 Tamiami Trail N', zip: '34108', phone: '(239) 555-0155', hours: 'Mon–Sat 7 AM–7 PM · Sun 8 AM–6 PM', features: ['Tunnel wash', 'Detail studio', 'Free vacuums'], lat: 26.24, lng: -81.8 },
	{ slug: 'sarasota', city: 'Sarasota', name: 'Sarasota — Bee Ridge', address: '4100 Bee Ridge Rd', zip: '34233', phone: '(941) 555-0189', hours: 'Mon–Sat 7 AM–7 PM · Sun 8 AM–6 PM', features: ['Tunnel wash', 'Free vacuums'], lat: 27.3, lng: -82.5 }
];

export const trustItems = [
	{ title: 'ECO FRIENDLY', text: 'Water-saving technology & eco-safe products', icon: 'Droplets' },
	{ title: 'PAINT SAFE', text: 'Soft-touch materials for a scratch-free clean', icon: 'ShieldCheck' },
	{ title: 'FAST & CONVENIENT', text: 'Quick service so you can get back on the road', icon: 'Timer' },
	{ title: '100% SATISFACTION', text: "We're not happy until you're happy", icon: 'BadgeCheck' }
];

export const whyItems = [
	{ title: 'FLORIDA STRONG', text: 'Built for sun, salt & sand — we protect your ride.', icon: 'Sun' },
	{ title: 'SPOT-FREE RINSE', text: 'Advanced systems leave no spots behind.', icon: 'Droplets' },
	{ title: 'FRIENDLY TEAM', text: 'Local experts who care about your car.', icon: 'Users' },
	{ title: 'MULTIPLE LOCATIONS', text: 'Convenient locations across Florida.', icon: 'MapPin' }
];

export type GalleryItem = { image: string; title: string; category: string; alt: string };
export const gallery: GalleryItem[] = [
	{ image: 'hero-soapy-car', title: 'Triple foam in action', category: 'Exterior Wash', alt: 'Dark blue sports car covered in white soap foam at a Florida car wash' },
	{ image: 'gallery-suv', title: 'SUV, showroom fresh', category: 'Exterior Wash', alt: 'Freshly washed white SUV sparkling clean at a Florida car wash' },
	{ image: 'gallery-sedan', title: 'Red sedan, mirror shine', category: 'Wax & Polish', alt: 'Freshly washed red sedan gleaming in the sun' },
	{ image: 'gallery-truck', title: 'Pickup, road-trip ready', category: 'Exterior Wash', alt: 'Freshly washed silver pickup truck at a Florida car wash' },
	{ image: 'interior-detail', title: 'Interior detail, spotless', category: 'Interior Detailing', alt: 'Spotless car interior being detailed' },
	{ image: 'foam-wash', title: 'Foam bath', category: 'Exterior Wash', alt: 'Car covered in thick white triple foam' },
	{ image: 'wax-polish', title: 'Hand wax finish', category: 'Wax & Polish', alt: 'Worker applying wax to a glossy black car hood' },
	{ image: 'wheel-tire', title: 'Wheels & tires', category: 'Wheel & Tire Care', alt: 'Sparkling clean alloy wheel and shiny tire' },
	{ image: 'ceramic-coating', title: 'Ceramic beading', category: 'Ceramic Coating', alt: 'Water beading on a ceramic-coated silver car hood' },
	{ image: 'club-car', title: 'Fresh off the tunnel', category: 'Exterior Wash', alt: 'Clean dark blue sedan driving away from the car wash' },
	{ image: 'wash-building', title: 'Our Miami wash', category: 'Locations', alt: 'Modern Florida car wash building exterior with palm trees' },
	{ image: 'about-team', title: 'The Florida Shine team', category: 'Locations', alt: 'Florida Shine team beside a freshly washed car' }
];

export const reviews = [
	{ name: 'Marcus T.', city: 'Miami', rating: 5, service: 'Premium Wash', text: 'Best wash in Miami, hands down. The triple foam and wax actually last — my car still beads water a week later.' },
	{ name: 'Sofia R.', city: 'Tampa', rating: 5, service: 'Deluxe Detail', text: 'They got two years of beach sand out of my SUV. The interior looks brand new and it smells amazing.' },
	{ name: 'James W.', city: 'Orlando', rating: 5, service: 'Premium Club', text: 'The Unlimited Club pays for itself in two visits. I stop in after every beach trip — in and out in 15 minutes.' },
	{ name: 'Alicia G.', city: 'Fort Lauderdale', rating: 5, service: 'Ceramic Coating', text: 'Ceramic coating was worth every penny. Rain just rolls off now and the Florida sun has nothing on this shine.' },
	{ name: 'David K.', city: 'Naples', rating: 4, service: 'Basic Wash', text: 'Quick, friendly and a genuinely good clean for the price. The free vacuums are a nice touch too.' },
	{ name: 'Priya N.', city: 'Jacksonville', rating: 5, service: 'Pet Hair Removal', text: 'Two golden retrievers, one very hairy back seat — gone. The team was so kind about it too.' }
];

export const faqs = [
	{ q: 'How long does a wash take?', a: 'A Basic Wash takes about 10 minutes, Premium about 15, and a Deluxe Detail around 45 minutes. Detailing services are booked by appointment so there is no waiting around.' },
	{ q: 'Do I need an appointment?', a: 'No appointment is needed for tunnel washes — just drive in. Detailing, ceramic coating and interior services are by appointment so we can give your car the time it deserves.' },
	{ q: 'Is your wash safe for my paint?', a: 'Yes. We use soft-touch foam materials, filtered water and pH-neutral soaps. Our wash is safe for clear coat, ceramic coatings and vinyl wraps.' },
	{ q: 'How does the Unlimited Wash Club work?', a: 'Pick a plan, register your car, and wash as often as you like at any Florida Shine location. Plans are month-to-month and you can cancel anytime.' },
	{ q: 'Do you wash trucks and SUVs?', a: 'Yes — our tunnels fit most trucks and SUVs up to 7 feet tall. Oversized vehicles and dually trucks are welcome at our detail studios by appointment.' },
	{ q: 'What payment methods do you accept?', a: 'We accept all major cards, Apple Pay, Google Pay and cash at every location. Memberships are billed monthly to your card.' },
	{ q: 'Do you offer gift cards?', a: 'Yes — gift cards from $25 to $200 are available in-store and by phone. They never expire and work at every location.' },
	{ q: 'What if it rains after my wash?', a: 'If it rains within 24 hours of your wash, come back for a free re-wash. Florida weather is unpredictable — your shine should not be.' }
];

export const giftCards = [
	{ amount: 25, note: 'A quick wash for someone you like.' },
	{ amount: 50, note: 'A Deluxe Detail, on you.' },
	{ amount: 100, note: 'A month of Unlimited washes.' },
	{ amount: 200, note: 'The full Florida Shine treatment.' }
];

export const team = [
	{ name: 'Carlos Mendez', role: 'Founder & Miami Lead', bio: 'Started Florida Shine with one tunnel in Miami in 2018. Still inspects every wash bay himself.' },
	{ name: 'Angela Brooks', role: 'Head of Detailing', bio: 'Ten years in paint care. Leads our ceramic and interior detail studios across Florida.' },
	{ name: 'Devon Carter', role: 'Tampa Location Manager', bio: 'Runs our busiest tunnel and trains every new team member on the Florida Shine standard.' },
	{ name: 'Maria Santos', role: 'Customer Experience', bio: 'The friendly voice on the phone and the reason our members never wait long.' }
];

export const careers = [
	{ title: 'Wash Attendant', location: 'Miami — Downtown', type: 'Full-time', pay: '$16–$18/hr', description: 'Greet guests, guide cars through the tunnel and keep the wash floor spotless. No experience needed — we train you.' },
	{ title: 'Detail Technician', location: 'Orlando', type: 'Full-time', pay: '$20–$24/hr', description: 'Interior details, wax and ceramic prep. Detailing experience preferred, certification a plus.' },
	{ title: 'Shift Supervisor', location: 'Tampa', type: 'Full-time', pay: '$22–$26/hr', description: 'Lead a shift of 6–8 team members, handle guest questions and keep quality high all day.' },
	{ title: 'Customer Service Representative', location: 'Fort Lauderdale', type: 'Part-time', pay: '$17–$19/hr', description: 'Answer calls, help members and book appointments. Friendly, patient and organized.' }
];

export const timeSlots = ['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];

// Deterministic mock availability: hash of date+slot+location decides booked/free.
export function slotAvailable(dateISO: string, slot: string, locationSlug: string): boolean {
	let h = 0;
	const s = `${dateISO}|${slot}|${locationSlug}`;
	for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 997;
	return h % 4 !== 0; // ~75% of slots free, same every time for the same inputs
}

export function bookingRef(name: string, dateISO: string): string {
	let h = 0;
	const s = `${name}${dateISO}`;
	for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 100000;
	return `FS-${String(h).padStart(5, '0')}`;
}

export function money(n: number): string {
	return `$${n}`;
}
