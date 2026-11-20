// Florida Shine Car Wash — ALL mock data lives here. Swap in real data later.
// Prices in USD. Florida, USA business. No real data, no payments.
export const site = {
	name: 'Florida Shine Car Wash',
	tagline: 'Clean Car. Brighter Days.',
	phone: '(305) 555-0198',
	phoneHref: 'tel:+13055550198',
	whatsappHref:
		'https://wa.me/13055550198?text=Hi%20Florida%20Shine!%20I%20have%20a%20question%20about%20a%20wash.',
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

export const ratingSummary = {
	average: 4.8,
	totalReviews: 2400,
	featuredCount: 6,
	source: 'Google reviews'
};

export const sizeUpcharges: Record<string, number> = { Sedan: 0, SUV: 5, Truck: 8, Van: 8, 'Sports car': 0 };
export const sizeUpchargeNote =
	'Vehicle size upcharge: Sedan and Sports car included · SUV +$5 · Truck and Van +$8, added to the wash price at booking.';

export const beforeAfter = {
	before: 'dirty-car',
	after: 'hero-soapy-car',
	caption: 'A genuinely dirty car, before and after a Florida Shine wash — two different photos, not a filter.'
};

export const beforeAfterInterior = {
	before: 'dirty-interior',
	after: 'interior-detail',
	caption:
		'A genuinely dirty interior — beach sand, crumbs and pet hair — before and after a full interior detail. Two different photos, not a filter.'
};

export const reviewSources = {
	googleUrl: 'https://maps.google.com/?q=Florida+Shine+Car+Wash+Miami'
};

export const firstVisit = {
	steps: [
		{ title: 'Drive in', text: 'Follow the blue arrows into the tunnel entrance. Stay in your car — no need to get out.' },
		{ title: 'Through the tunnel', text: 'Soft-touch foam, rinse and blow-dry take about 5 minutes in the tunnel. Fold in your mirrors and antenna if they stick out.' },
		{ title: 'Dry & finish', text: 'Our team towel-dries the edges and checks the shine before you roll out.' },
		{ title: 'Free vacuums', text: 'Pull into a vacuum bay after your wash — free for 15 minutes with any wash.' }
	],
	notes: [
		'Stay in your car for the whole tunnel wash.',
		'Fold in side mirrors and retract antennas before entering.',
		'The tunnel fits vehicles up to 7 ft tall and 73 in wide.',
		'A tunnel wash takes about 5 minutes; the whole visit — tunnel, towel-dry and vacuums — is about 10 minutes. Detailing is by appointment.'
	]
};

export const accessibility = {
	features: [
		'Step-free access from the parking area into every wash lobby and waiting area.',
		'Accessible parking bays close to the entrance at all 8 locations.',
		'Staff assistance available — wave or call ahead and a team member will guide your car through the tunnel.',
		'Accessible restrooms at all locations with a detail studio.',
		'Large-print price boards and staff who are happy to read them aloud.',
		'Service animals are welcome in waiting areas.'
	],
	statement:
		'Florida Shine aims to meet WCAG 2.2 AA on this website and to make every wash accessible in person. If you hit a barrier, call (305) 555-0198 or email hello@floridashinecarwash.com and we will help.'
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
			'Our everyday exterior wash: a gentle soft-touch clean, spot-free rinse and a shine on your wheels and tires. Perfect between details. About 10 minutes for the whole visit — around 5 minutes in the tunnel, the rest is drying and finishing.',
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
			'Triple Foam',
			'Interior Cleaning',
			'Dash & Door Detail'
		],
		duration: 'About 45 minutes',
		image: 'interior-detail'
	}
];

export type Addon = { name: string; price: number; description: string; time: string; note: string };
export const addons: Addon[] = [
	{ name: 'Ceramic Coating', price: 199, description: 'Up to 12 months of hydrophobic protection and deep gloss.', time: '2 hours', note: 'The same 12-month professional ceramic coating as the standalone service — add it to any wash here, or book it as its own appointment.' },
	{ name: 'Full Interior Detail', price: 89, description: 'Deep vacuum, shampoo, leather care and console detail.', time: '90 minutes', note: 'A deep shampoo detail added to your wash — the standalone Interior Detailing service starts at $45 for a basic interior clean.' },
	{ name: 'Pet Hair Removal', price: 25, description: 'Specialist tools lift embedded pet hair from seats and carpet.', time: '20 minutes', note: 'Same $25 either way — as an add-on to a wash or as part of the standalone Pet Hair & Odor Removal service.' },
	{ name: 'Headlight Restoration', price: 39, description: 'Restores cloudy headlights to clear, bright and safe.', time: '30 minutes', note: 'A standalone add-on — not part of any wash package.' },
	{ name: 'Odor Elimination', price: 29, description: 'Ozone treatment removes smoke, food and mildew smells.', time: '30 minutes', note: 'The same ozone treatment included in the Pet Hair & Odor Removal service — add it on its own here.' },
	{ name: 'Engine Bay Detail', price: 35, description: 'Safe degrease and dress for a showroom engine bay.', time: '25 minutes', note: 'A standalone add-on — not part of any wash package.' },
	{ name: 'Rain Repellent', price: 15, description: 'Windshield treatment that beads water away at speed.', time: '10 minutes', note: 'A quick add-on to any wash — not part of any wash package.' },
	{ name: 'Clay Bar Treatment', price: 49, description: 'Removes bonded contaminants for glass-smooth paint.', time: '40 minutes', note: 'The same clay bar prep used before our Ceramic Coating service — add it to any wash here.' }
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
	process?: string[];
	aftercare?: string;
	warranty?: string;
	limits?: string[];
	sprayVsPro?: string;
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
		image: 'ceramic-coating',
		process: [
			'Wash & decontamination — a full hand wash strips old wax and road film so the coating can bond to clean paint.',
			'Clay bar prep — a clay bar lifts bonded contaminants the wash cannot, leaving glass-smooth paint.',
			'Ceramic application — the coating is applied panel by panel in a dust-controlled bay and levelled by hand.',
			'Curing time — the coating cures for up to 24 hours. Keep the car dry in that window; we give you the exact time.'
		],
		aftercare:
			'Wash with pH-neutral soap only, never automatic brush washes. Avoid waxing over the coating — it does not need it. A maintenance wash every 4–6 weeks keeps the beading strong.',
		warranty: '12-month warranty: if the beading fails on a properly maintained car within 12 months, we re-apply the affected panels free.',
		limits: [
			'Ceramic coating does NOT stop rock chips — it is a thin chemical layer, not armour.',
			'It does NOT make paint scratch-proof — keys, brushes and grit can still mark it.',
			'It does NOT remove existing scratches or swirl marks — paint correction is a separate service.'
		],
		sprayVsPro:
			'Spray ceramic is a quick top-up that lasts weeks; our professional coating is a multi-step application that bonds to the paint and lasts up to 12 months. Spray products are fine for maintenance between professional applications — they are not a substitute for one.'
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
	billing: string;
	recognition: string;
	dailyLimit: string;
	extraVehiclePrice: number;
	breakEven: string;
};
export const memberships: Membership[] = [
	{
		slug: 'basic-club',
		name: 'Basic Club',
		price: 19,
		tagline: 'Unlimited Basic Washes, every month.',
		features: ['Unlimited Basic Washes', 'One car per plan', 'Cancel anytime', 'Member-only wash lane'],
		billing: 'Billed monthly on your join date',
		recognition: 'RFID windshield sticker',
		dailyLimit: '1 wash per day, per vehicle',
		extraVehiclePrice: 10,
		breakEven: 'Pays for itself in 2 washes'
	},
	{
		slug: 'premium-club',
		name: 'Premium Club',
		price: 29,
		tagline: 'Unlimited Premium Washes + wax.',
		features: ['Unlimited Premium Washes', 'Wax protection included', 'One car per plan', 'Cancel anytime', 'Free vacuum use', 'Member-only wash lane'],
		popular: true,
		billing: 'Billed monthly on your join date',
		recognition: 'RFID windshield sticker',
		dailyLimit: '1 wash per day, per vehicle',
		extraVehiclePrice: 15,
		breakEven: 'Pays for itself in 2 washes'
	},
	{
		slug: 'deluxe-club',
		name: 'Deluxe Club',
		price: 39,
		tagline: 'Unlimited everything, inside and out.',
		features: ['Unlimited Deluxe Details', 'Interior cleaning included', 'One car per plan', 'Cancel anytime', 'Free vacuum use', '10% off add-ons', 'Priority booking lane'],
		billing: 'Billed monthly on your join date',
		recognition: 'RFID windshield sticker',
		dailyLimit: '1 wash per day, per vehicle',
		extraVehiclePrice: 20,
		breakEven: 'Pays for itself in 1 wash'
	}
];

// Membership management rules — surfaced on /memberships, /account and in the
// Membership Terms. All mock in this demo: no real billing takes place.
export const membershipRules = {
	pause: 'Pause for up to 60 days a year — billing stops while paused and resumes when you reactivate.',
	vehicleSwaps: 'Swap your registered vehicle up to 2 times a year, free — in your account or at any location.',
	extraVehicle:
		'Add a family or second vehicle for $10/mo (Basic Club), $15/mo (Premium Club) or $20/mo (Deluxe Club).',
	billing: 'Billed monthly on your join date, and your plan runs to the end of the paid month if you cancel.',
	cancel: 'Cancel in 2 clicks from your account — online, in person or by phone — with no fee and no phone call required.'
};

// Florida seasons — wash advice for the year, linked from the home page.
export const floridaSeasons = [
	{
		name: 'Love Bug Season',
		months: 'April – May & August – September',
		text: 'Love bugs swarm twice a year, and their residue can etch paint in a day or two of Florida sun. Wash the same day you drive through a swarm — never scrub dried bugs with a dry cloth.',
		link: '/blog/lovebug-season',
		linkLabel: 'Read the love bug guide'
	},
	{
		name: 'Rainy Season',
		months: 'May – October',
		text: 'Afternoon storms are a daily fact of life. If it rains within 48 hours of your wash, come back for a free re-wash of the same car — bring your receipt or booking reference.',
		link: '/rain-guarantee',
		linkLabel: 'How the rain guarantee works'
	},
	{
		name: 'Hurricane Season',
		months: '1 June – 30 November',
		text: 'Before a storm, a wash and a coat of wax keep salt, sand and storm debris from bonding to your paint. After a storm, rinse salt spray and grit off promptly.',
		link: '/blog/salt-air-care',
		linkLabel: 'Read the salt-air guide'
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
	image: string;
	washType: string;
	vacuums: number;
	lastWash: string;
	entrance: string;
	busyHours: string;
	transferable: boolean;
};
export const locations: Location[] = [
	{ slug: 'miami-downtown', city: 'Miami', name: 'Downtown Miami', address: '1200 Biscayne Blvd', zip: '33132', phone: '(305) 555-0198', hours: 'Mon–Sat 7 AM–7 PM · Sun 8 AM–6 PM', features: ['Tunnel wash', 'Detail studio', 'Free vacuums', 'EV charging'], lat: 25.78, lng: -80.19, image: 'location-miami-downtown', washType: 'Soft-touch tunnel', vacuums: 10, lastWash: 'Last wash 15 minutes before closing', entrance: 'Enter from Biscayne Blvd — follow the blue arrows', busyHours: 'Usually busy: Sat 10 AM–2 PM · Usually quiet: Tue–Thu mornings', transferable: true },
	{ slug: 'miami-kendall', city: 'Miami', name: 'Kendall', address: '8400 SW 88th St', zip: '33156', phone: '(305) 555-0142', hours: 'Mon–Sat 7 AM–7 PM · Sun 8 AM–6 PM', features: ['Tunnel wash', 'Detail studio', 'Free vacuums'], lat: 25.66, lng: -80.36, image: 'location-miami-kendall', washType: 'Soft-touch tunnel', vacuums: 8, lastWash: 'Last wash 15 minutes before closing', entrance: 'Enter from SW 88th St — the tunnel is behind the vacuum bays', busyHours: 'Usually busy: Sat 9 AM–1 PM · Usually quiet: Mon–Wed mornings', transferable: true },
	{ slug: 'tampa', city: 'Tampa', name: 'Dale Mabry', address: '4200 N Dale Mabry Hwy', zip: '33607', phone: '(813) 555-0117', hours: 'Mon–Sat 7 AM–7 PM · Sun 8 AM–6 PM', features: ['Tunnel wash', 'Detail studio', 'Free vacuums', 'Pet wash bay'], lat: 27.99, lng: -82.51, image: 'location-tampa', washType: 'Soft-touch tunnel', vacuums: 10, lastWash: 'Last wash 15 minutes before closing', entrance: 'Enter from N Dale Mabry Hwy — turn in at the yellow arch', busyHours: 'Usually busy: Sat 10 AM–2 PM · Usually quiet: Tue–Thu afternoons', transferable: true },
	{ slug: 'orlando', city: 'Orlando', name: 'International Drive', address: '7800 International Dr', zip: '32819', phone: '(407) 555-0163', hours: 'Mon–Sat 7 AM–7 PM · Sun 8 AM–6 PM', features: ['Tunnel wash', 'Detail studio', 'Free vacuums'], lat: 28.44, lng: -81.47, image: 'location-orlando', washType: 'Soft-touch tunnel', vacuums: 8, lastWash: 'Last wash 15 minutes before closing', entrance: 'Enter from International Dr — look for the blue wave sign', busyHours: 'Usually busy: Fri–Sat 11 AM–3 PM · Usually quiet: Mon–Tue mornings', transferable: true },
	{ slug: 'jacksonville', city: 'Jacksonville', name: 'Southside', address: '9500 Southside Blvd', zip: '32256', phone: '(904) 555-0128', hours: 'Mon–Sat 7 AM–7 PM · Sun 8 AM–6 PM', features: ['Tunnel wash', 'Free vacuums'], lat: 30.24, lng: -81.55, image: 'location-jacksonville', washType: 'Soft-touch tunnel', vacuums: 6, lastWash: 'Last wash 15 minutes before closing', entrance: 'Enter from Southside Blvd — the tunnel is on the left as you pull in', busyHours: 'Usually busy: Sat 9 AM–12 PM · Usually quiet: Wed–Thu mornings', transferable: true },
	{ slug: 'fort-lauderdale', city: 'Fort Lauderdale', name: 'Federal Hwy', address: '2600 N Federal Hwy', zip: '33306', phone: '(954) 555-0174', hours: 'Mon–Sat 7 AM–7 PM · Sun 8 AM–6 PM', features: ['Tunnel wash', 'Detail studio', 'Free vacuums', 'EV charging'], lat: 26.15, lng: -80.12, image: 'location-fort-lauderdale', washType: 'Soft-touch tunnel', vacuums: 10, lastWash: 'Last wash 15 minutes before closing', entrance: 'Enter from N Federal Hwy — follow the blue arrows past the vacuums', busyHours: 'Usually busy: Sat 10 AM–2 PM · Usually quiet: Tue–Thu mornings', transferable: true },
	{ slug: 'naples', city: 'Naples', name: 'Tamiami Trail', address: '5600 Tamiami Trail N', zip: '34108', phone: '(239) 555-0155', hours: 'Mon–Sat 7 AM–7 PM · Sun 8 AM–6 PM', features: ['Tunnel wash', 'Detail studio', 'Free vacuums'], lat: 26.24, lng: -81.8, image: 'location-naples', washType: 'Soft-touch tunnel', vacuums: 8, lastWash: 'Last wash 15 minutes before closing', entrance: 'Enter from Tamiami Trail N — the entrance is beside the palm row', busyHours: 'Usually busy: Sat 10 AM–1 PM · Usually quiet: Mon–Wed afternoons', transferable: true },
	{ slug: 'sarasota', city: 'Sarasota', name: 'Bee Ridge', address: '4100 Bee Ridge Rd', zip: '34233', phone: '(941) 555-0189', hours: 'Mon–Sat 7 AM–7 PM · Sun 8 AM–6 PM', features: ['Tunnel wash', 'Free vacuums'], lat: 27.3, lng: -82.5, image: 'location-sarasota', washType: 'Soft-touch tunnel', vacuums: 6, lastWash: 'Last wash 15 minutes before closing', entrance: 'Enter from Bee Ridge Rd — turn in at the sun-yellow sign', busyHours: 'Usually busy: Sat 9 AM–12 PM · Usually quiet: Tue–Thu mornings', transferable: true }
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
	{ name: 'Marcus T.', city: 'Miami', rating: 5, service: 'Premium Wash', date: 'Nov 2026', location: 'miami-downtown', text: 'Best wash in Miami, hands down. The triple foam and wax actually last — my car still beads water a week later.' },
	{ name: 'Sofia R.', city: 'Tampa', rating: 5, service: 'Deluxe Detail', date: 'Nov 2026', location: 'tampa', text: 'They got two years of beach sand out of my SUV. The interior looks brand new and it smells amazing.' },
	{ name: 'James W.', city: 'Orlando', rating: 5, service: 'Premium Club', date: 'Oct 2026', location: 'orlando', text: 'The Unlimited Club pays for itself in two visits. I stop in after every beach trip — in and out in 15 minutes.' },
	{ name: 'Alicia G.', city: 'Fort Lauderdale', rating: 5, service: 'Ceramic Coating', date: 'Oct 2026', location: 'fort-lauderdale', text: 'Ceramic coating was worth every penny. Rain just rolls off now and the Florida sun has nothing on this shine.' },
	{ name: 'David K.', city: 'Naples', rating: 4, service: 'Basic Wash', date: 'Sep 2026', location: 'naples', text: 'Quick, friendly and a genuinely good clean for the price. The free vacuums are a nice touch too.' },
	{ name: 'Priya N.', city: 'Jacksonville', rating: 5, service: 'Pet Hair Removal', date: 'Sep 2026', location: 'jacksonville', text: 'Two golden retrievers, one very hairy back seat — gone. The team was so kind about it too.' }
];

export const faqs = [
	{ q: 'How long does a wash take?', a: 'A Basic Wash takes about 10 minutes for the whole visit — around 5 minutes in the tunnel, the rest is drying and finishing. Premium is about 15 minutes, and a Deluxe Detail around 45 minutes. Detailing services are booked by appointment so there is no waiting around.', category: 'Wash' },
	{ q: 'Do I need an appointment?', a: 'No appointment is needed for tunnel washes — just drive in. Detailing, ceramic coating and interior services are by appointment so we can give your car the time it deserves.', category: 'Booking' },
	{ q: 'Is your wash safe for my paint?', a: 'Yes. We use soft-touch foam materials, filtered water and pH-neutral soaps. Our wash is safe for clear coat, ceramic coatings and vinyl wraps.', category: 'Wash' },
	{ q: 'How does the Unlimited Wash Club work?', a: 'Pick a plan, register your car, and wash as often as you like at any Florida Shine location. Plans are month-to-month and you can cancel anytime.', category: 'Membership' },
	{ q: 'Do you wash trucks and SUVs?', a: 'Yes — our tunnels fit most trucks and SUVs up to 7 feet tall. Oversized vehicles and dually trucks are welcome at our detail studios by appointment.', category: 'Wash' },
	{ q: 'What payment methods do you accept?', a: 'We accept all major cards, Apple Pay, Google Pay and cash at every location. Memberships are billed monthly to your card.', category: 'Booking' },
	{ q: 'Do you offer gift cards?', a: 'Yes — gift cards from $25 to $200 are available in-store and by phone. They never expire and work at every location.', category: 'Wash' },
	{ q: 'What if it rains after my wash?', a: 'If it rains within 48 hours of your wash, come back for a free re-wash. Florida weather is unpredictable — your shine should not be.', category: 'Wash' },
	{ q: 'How long does the rain-check last?', a: 'The rain-check is a free re-wash within 48 hours of rain after your wash. Bring your receipt (or your booking reference) and we will re-wash the same car free.', category: 'Wash' },
	{ q: 'How tall a vehicle fits in the tunnel?', a: 'The tunnel fits vehicles up to 7 feet tall and 73 inches wide. Taller vehicles, dually trucks and oversized rigs are welcome at our detail studios by appointment.', category: 'Locations' },
	{ q: 'Can I use my membership at any location?', a: 'Yes — every Unlimited Wash Club plan works at all 8 Florida Shine locations, and your RFID windshield sticker is recognised at every tunnel.', category: 'Membership' },
	{ q: 'Do gift cards expire?', a: 'No. Gift cards never expire — under the federal 5-year rule they are valid for at least five years from purchase, and at Florida Shine they carry no expiry date at all.', category: 'Booking' }
];

export const giftCards = [
	{ amount: 25, note: 'A Basic Wash ($16) with change to spare — or put it toward any wash.' },
	{ amount: 50, note: 'A Deluxe Detail ($45) with $5 to spare.' },
	{ amount: 100, note: 'About 2½–5 months of Unlimited Club — 5 months of Basic ($19/mo), 3 of Premium ($29/mo), 2½ of Deluxe ($39/mo).' },
	{ amount: 200, note: 'About 5–10 months of Unlimited Club — or four Deluxe Details.' }
];

export const team = [
	{ name: 'Carlos Mendez', role: 'Founder & Miami Lead', bio: 'Started Florida Shine with one tunnel in Miami in 2018. Still inspects every wash bay himself.', photo: 'team-carlos' },
	{ name: 'Angela Brooks', role: 'Head of Detailing', bio: 'Ten years in paint care. Leads our ceramic and interior detail studios across Florida.', photo: 'team-angela' },
	{ name: 'Devon Carter', role: 'Tampa Location Manager', bio: 'Runs our busiest tunnel and trains every new team member on the Florida Shine standard.', photo: 'team-devon' },
	{ name: 'Maria Santos', role: 'Customer Experience', bio: 'The friendly voice on the phone and the reason our members never wait long.', photo: 'team-maria' }
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

export type BlogPost = {
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	readTime: string;
	image: string;
	category: string;
	author: string;
	authorRole: string;
	authorBio?: string;
	body: string[];
};
export const blogPosts: BlogPost[] = [
	{
		slug: 'lovebug-season',
		title: 'Love Bug Season: Wash Them Off Before They Etch Your Paint',
		excerpt: 'Love bugs swarm twice a year in Florida — April to May and August to September — and their residue can etch clear coat in just a day or two of sun. Here is what to do.',
		date: 'April 2026',
		readTime: '4 min read',
		image: 'blog-lovebugs',
		category: 'Car Care Tips',
		author: 'Angela Brooks',
		authorRole: 'Head of Detailing',
		body: [
			'Love bugs arrive in two waves every year — roughly April to May, then again August to September — and they arrive in clouds. A single drive down I-95 can leave your bumper and mirrors plastered with them.',
			'The danger is not the bug itself, it is what happens next. Love bug residue is acidic, and in Florida sun it bakes onto the paint. Left for a day or two, it can etch the clear coat — a dull mark that no wash will remove and only polishing can fix.',
			'The rule is simple: wash it off fast. A rinse within 24 hours is usually enough; after 48 hours in the sun you are gambling with your paint. Our tunnel wash and a quick bug-removal pass at the front of the car handle it in minutes.',
			'If you drive through a swarm, do not scrub the dried residue with a dry cloth — that grinds it into the paint. Wet it first, or drive straight to a wash. And a coat of wax or ceramic before the season starts gives the residue far less to grip onto.',
			'Members wash free all season, which is the cheapest insurance against a swarm. Non-members: a Basic Wash right after a buggy drive is the best $16 you will spend on your paint.'
		]
	},
	{
		slug: 'salt-air-care',
		title: 'Salt Air & Hard Water: Protecting Your Car on the Gulf Coast',
		excerpt: 'Florida salt air and hard water leave spots, streaks and corrosion if they sit. A spot-free rinse and regular wax are your best defence.',
		date: 'March 2026',
		readTime: '4 min read',
		image: 'blog-salt-air',
		category: 'Car Care Tips',
		author: 'Carlos Mendez',
		authorRole: 'Founder & Miami Lead',
		body: [
			'Living near the Gulf means your car breathes salt air every day. Salt settles on paint, in door jambs and under the car, and where it sits it corrodes — slowly on paint, faster on bare metal and brake parts.',
			'Hard water makes it worse. Tap water in much of Florida is mineral-heavy, so a wash with unfiltered water dries into white spots that etch into the clear coat in the sun. That is why every Florida Shine wash finishes with a filtered, spot-free rinse.',
			'The defence is boring but it works: wash regularly, rinse the underbody, and keep a layer of wax or ceramic between the salt and your paint. Our Premium Wash adds wax protection and an underbody rinse for exactly this reason.',
			'Pay attention to the places you cannot see. Door jambs, the fuel flap and the underside of the boot lid collect salt and sand — wipe them when you wash, or ask our detail team to include them.',
			'If you park near the beach, wash at least once a week in summer. It costs less than a single paint repair, and your car will look — and last — noticeably better.'
		]
	},
	{
		slug: 'ceramic-aftercare',
		title: 'Ceramic Coating Aftercare: What It Does — and What It Does Not',
		excerpt: 'A spray ceramic is not a professional coating, and a coating is not armour. How to look after your ceramic coating so it lasts the full 12 months.',
		date: 'February 2026',
		readTime: '5 min read',
		image: 'blog-ceramic-aftercare',
		category: 'Car Care Tips',
		author: 'Angela Brooks',
		authorRole: 'Head of Detailing',
		body: [
			'First, the distinction that matters most: a spray ceramic you buy in a bottle is a quick top-up that lasts weeks. A professional coating is a multi-step application — wash, decontamination, clay bar, then the coating itself — that bonds to the paint and lasts up to 12 months. They are different products doing different jobs.',
			'A professional coating does a lot: water beads and rolls off, dirt releases more easily, UV protection is built in, and the gloss is genuinely deeper than wax. What it does not do is stop rock chips — it is a thin chemical layer, not armour — and it does not make paint scratch-proof. Keys, brushes and grit can still mark it.',
			'Aftercare is simple. Wash with pH-neutral soap only, and never take a coated car through an automatic brush wash — the brushes are what the coating cannot defend against. Avoid waxing over the coating; it does not need it and the wax can mask the beading.',
			'Keep the car dry for the first 24 hours after application while the coating cures. After that, a maintenance wash every 4–6 weeks keeps the beading strong. If the beading fades on a properly maintained car within 12 months, our warranty covers re-application of the affected panels free.',
			'Spray ceramic has its place: as maintenance between professional applications, it tops up the beading nicely. Just do not expect a spray bottle to do a professional coating\'s job.'
		]
	}
];

export const fleet = {
	tiers: [
		{ vehicles: '5–9 vehicles', discount: '10% off single-wash prices', note: 'Ideal for small businesses and trades.' },
		{ vehicles: '10–24 vehicles', discount: '15% off single-wash prices', note: 'For growing fleets and delivery teams.' },
		{ vehicles: '25+ vehicles', discount: 'Custom pricing', note: 'Tailored rates and a dedicated account manager.' }
	],
	invoicing: 'Monthly invoicing — one itemised bill for every vehicle, no per-wash payments at the tunnel.',
	heightLimit: 'Vehicle height limit: 7 ft in the tunnel. Taller vehicles are detailed by appointment.',
	identification: 'Fleet card or plate list — we recognise your vehicles by fleet card at the tunnel or by the plate list on your account.',
	contact: { name: 'Maria Santos', role: 'Fleet Accounts', phone: '(305) 555-0198', email: 'fleet@floridashinecarwash.com' },
	formFields: ['Company name', 'Contact name', 'Work email', 'Phone', 'Number of vehicles', 'Vehicle types', 'Home location', 'Anything else we should know']
};

export const offers = [
	{
		slug: 'first-wash-free',
		title: 'Your First Wash Is Free',
		detail: 'One free Basic Wash per vehicle for first-time visitors. Enter code SHINEFREE when you book online and your first Basic Wash is $0 — or show the code at any location and we will apply it in person. No card required.',
		terms: 'One free Basic Wash per vehicle, first visit only. No card required. Redeem online at booking with code SHINEFREE, or show the code in person at any Florida Shine location. Not combinable with other offers.'
	},
	{
		slug: 'premium-club-half-price',
		title: 'First Month of Premium Club — 50% Off',
		detail: 'Join Premium Club for $14.50 for your first month (50% off $29). It renews at $29/mo on your join-date anniversary.',
		terms: 'First month $14.50, then $29/mo billed monthly on your join date. Unlimited Premium Washes, 1 wash per day per vehicle. Cancel anytime online or in person.'
	},
	{
		slug: 'rain-check',
		title: 'Rain-Check: Free Rewash Within 48 Hours of Rain',
		detail: 'If it rains within 48 hours of your wash, come back for a free re-wash of the same car. Bring your receipt or booking reference.',
		terms: 'Free re-wash within 48 hours of rain after your wash, same vehicle only. Bring your receipt or booking reference. One re-wash per paid wash.'
	}
];

export const loyalty = {
	name: 'Shine Rewards',
	model: '1 stamp per wash, 8 stamps = a free Basic Wash.',
	stampExpiry: 'Stamps expire after 12 months.',
	referral: 'Give $5, get $5 — refer a friend and you both get $5 off your next wash.',
	birthday: 'A free wash in your birthday month, every year.',
	note: 'Shine Rewards is separate from the Unlimited Wash Club — Club members wash unlimited already, so stamps are for pay-per-wash drivers. Rewards are stated on this page with their expiry; no hidden terms.'
};
