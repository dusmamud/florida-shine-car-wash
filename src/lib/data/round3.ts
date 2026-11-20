// Florida Shine Car Wash — ROUND-3 mock data (added 2026-11-20, Worker B).
// ALL mock data. Nothing here is a live feed, a real booking, or a real
// measurement. Tunnel limits below are the site's published mock limits —
// they are labelled as such on the pages that use them, because the real
// per-tunnel limits were not measured for this demo. Swap in real data later.
import { locations, type BlogPost } from './site.ts';

// ---------------------------------------------------------------------------
// Rain guarantee — 48-hour free rewash
// NOTE: the rain-check is 48 hours everywhere (offers, FAQ, terms, /rain-guarantee) — reconciled in round 3.
// This page ships the 48-hour guarantee per the round-3 brief; the
// coordinator must reconcile the two wordings in site.ts before shipping.
// ---------------------------------------------------------------------------
export const rainGuarantee = {
	windowHours: 48,
	covered: [
		'Rain — any rainfall that dirties your car within 48 hours of your wash',
		'Road spray kicked up by wet roads after rain',
		'Dust and pollen film left by a passing shower',
		'Lightning or wind closure on the day you washed — we restart your wash free'
	],
	notCovered: [
		'Bird droppings',
		'Tree sap',
		'Off-roading mud',
		'Construction mud and tar',
		'Damage from a storm (dents, broken glass) — that is an insurance matter, not a wash matter',
		'Anything that happened more than 48 hours after your wash'
	],
	memberTreatment:
		'Unlimited Wash Club members are already covered — just drive back in and wash again, no code needed. The guarantee is for pay-per-wash drivers who would otherwise pay twice.',
	singleWashTreatment:
		'Pay-per-wash drivers get one free rewash at the same level as the wash they bought (Basic → Basic, Premium → Premium, Deluxe → Deluxe). Same vehicle only.',
	claimSteps: [
		'Enter your booking reference (FS-#####) or the phone number you booked with.',
		'We check the wash date — it must be within the last 48 hours.',
		'You get a rewash code on screen. Show it at any location within 48 hours of the rain.'
	],
	weWashInRain: 'We wash in the rain. The tunnel runs in rain; we only close for lightning or high wind, and we tell you the restart time at the gate.'
};

// ---------------------------------------------------------------------------
// EV + oversized — tunnel fit limits (MOCK — site's published mock limits)
// Research (§1.3) gives the same industry-typical numbers; Florida Shine's
// real per-tunnel limits were not measured. Do not present these as measured.
// ---------------------------------------------------------------------------
export const vehicleLimits = {
	label: 'Mock limits — the numbers below are the limits published on this demo site, not measured tunnel dimensions.',
	heightIn: 84,
	heightLabel: '7 ft (84 in) maximum height',
	widthIn: 73,
	widthLabel: '73 in maximum width (inside driver tyre to outside passenger tyre)',
	minClearanceIn: 5,
	clearanceLabel: 'Under 5 in ground clearance — excluded from the tunnel',
	maxTyreWidthIn: 13.5,
	tyreLabel: 'Tyres wider than 13.5 in — excluded from the tunnel',
	dually: 'Dual rear wheels (dually) — excluded from the tunnel; detail studio by appointment',
	excluded: [
		'Ladder racks, bike racks and roof boxes that do not fold away',
		'Snowplows and fuel-tank hoses',
		'Full-size Hummer, Raptor, Transit, ProMaster and NV vans',
		'Limousines and conversion vans',
		'Non-folding mirrors and antennas'
	],
	detailStudioNote:
		'Oversized vehicles are welcome at our detail studios by appointment — a hand wash and detail, not the tunnel.'
};

export const teslaGuidance = {
	touchlessOnly:
		'Tesla Model 3, Model S, Model X and Model Y owner manuals say touchless car washes only. Brush or soft-touch tunnels can cause damage the Tesla warranty does not cover — so at Florida Shine, Teslas go through our touchless lane only.',
	carWashModeSteps: [
		'On the touchscreen: Controls > Service > Car Wash Mode.',
		'Car Wash Mode closes the windows, locks the charge port, disables the wipers, Sentry Mode, walk-away lock and sensor chimes.',
		'On a conveyor, also tap Enable Free Roll (Neutral) so the car rolls freely.',
		'Fold in the mirrors if they stick out.'
	],
	cybertruck:
		'The Cybertruck owner manual advises against automatic car washes altogether. We do not send Cybertrucks through any tunnel — book a hand wash at a detail studio instead.',
	otherEvs: [
		'Never wash while charging — unplug first and keep the charge port closed.',
		'Disable automatic wipers and parking sensors before entering.',
		'Keep any pressure wand at least 12 in (30 cm) from the paint, and avoid soaps above pH 13.'
	]
};

// ---------------------------------------------------------------------------
// Referral — give $5, get $5
// ---------------------------------------------------------------------------
export const referral = {
	giveAmount: 5,
	getAmount: 5,
	howItWorks: [
		'Get your referral code below — it is tied to the phone number on your Shine Rewards account.',
		'Share it by text, email or social. Your friend gets $5 off their first wash.',
		'When they wash, you get $5 off your next wash. There is no limit on how many friends you refer.',
		'Your $5 credit lands on your Shine Rewards account and is good for 12 months.'
	],
	terms: [
		'One $5 credit per referred friend, only after their first paid wash.',
		'Your friend must be a new Florida Shine customer.',
		'Credits are not cash and cannot be combined with other offers.',
		'Credits expire 12 months after they are issued.',
		'Self-referrals and duplicate accounts do not earn credit.'
	]
};

// ---------------------------------------------------------------------------
// Service area — built from the 8 real locations in site.ts. No invented
// radius or ZIP count: drive-time wording only.
// ---------------------------------------------------------------------------
export const serviceArea = locations.map((l) => ({
	slug: l.slug,
	city: l.city,
	name: l.name,
	address: l.address,
	zip: l.zip,
	phone: l.phone,
	county:
		l.city === 'Miami'
			? 'Miami-Dade County'
			: l.city === 'Tampa'
				? 'Hillsborough County'
				: l.city === 'Orlando'
					? 'Orange County'
					: l.city === 'Jacksonville'
						? 'Duval County'
						: l.city === 'Fort Lauderdale'
							? 'Broward County'
							: l.city === 'Naples'
								? 'Collier County'
								: 'Sarasota County'
}));

export const notServedYet = [
	{ area: 'Palm Beach County', note: 'West Palm Beach, Boca Raton and Delray Beach — no Florida Shine yet.' },
	{ area: 'Fort Myers & Cape Coral', note: 'Lee County — no Florida Shine yet.' },
	{ area: 'Gainesville', note: 'Alachua County — no Florida Shine yet.' },
	{ area: 'Tallahassee', note: 'Leon County — no Florida Shine yet.' },
	{ area: 'The Florida Keys', note: 'Monroe County — no Florida Shine yet.' }
];

// ---------------------------------------------------------------------------
// Lost and found — mock process
// ---------------------------------------------------------------------------
export const lostAndFound = {
	holdDays: 30,
	whatHappens: [
		'Anything left in a car is handed to the location manager at the end of the shift.',
		'Valuables (phones, wallets, keys, sunglasses) are logged and locked away the same day.',
		'Items are held for 30 days at the location where they were found.',
		'After 30 days, unclaimed items are donated or disposed of — valuables are never sold.'
	],
	whatToBring: [
		'Photo ID matching the name on the claim.',
		'A description of the item — colour, brand, and roughly where in the car you left it.',
		'Your booking reference or the date and time of your wash, if you have it.'
	],
	note: 'We are not responsible for items left in vehicles — the tunnel team reminds every driver to remove valuables before the wash — but we do our best to get things back to you.'
};

// ---------------------------------------------------------------------------
// Wash recommender quiz — 4 questions, rule-based recommendation
// ---------------------------------------------------------------------------
export type QuizOption = { label: string; points: { basic: number; premium: number; deluxe: number } };
export type QuizQuestion = { id: string; question: string; options: QuizOption[] };
export const quizQuestions: QuizQuestion[] = [
	{
		id: 'frequency',
		question: 'How often do you wash your car?',
		options: [
			{ label: 'Every week', points: { basic: 1, premium: 2, deluxe: 1 } },
			{ label: 'Every 2–3 weeks', points: { basic: 2, premium: 2, deluxe: 0 } },
			{ label: 'About once a month', points: { basic: 2, premium: 1, deluxe: 0 } },
			{ label: 'Rarely — this is overdue', points: { basic: 0, premium: 1, deluxe: 2 } }
		]
	},
	{
		id: 'dirt',
		question: 'How dirty is it right now?',
		options: [
			{ label: 'Light dust', points: { basic: 2, premium: 1, deluxe: 0 } },
			{ label: 'Road grime and bugs', points: { basic: 0, premium: 2, deluxe: 1 } },
			{ label: 'Sand, salt and beach trips', points: { basic: 0, premium: 2, deluxe: 1 } },
			{ label: 'It needs everything', points: { basic: 0, premium: 1, deluxe: 2 } }
		]
	},
	{
		id: 'budget',
		question: 'What is your budget today?',
		options: [
			{ label: 'Under $20', points: { basic: 2, premium: 0, deluxe: 0 } },
			{ label: '$20–$35', points: { basic: 0, premium: 2, deluxe: 0 } },
			{ label: 'Best clean, whatever it costs', points: { basic: 0, premium: 1, deluxe: 2 } }
		]
	},
	{
		id: 'interior',
		question: 'Do you want the inside cleaned too?',
		options: [
			{ label: 'Yes — seats, dash, the works', points: { basic: 0, premium: 0, deluxe: 3 } },
			{ label: 'No — exterior only', points: { basic: 1, premium: 1, deluxe: 0 } }
		]
	}
];

// ---------------------------------------------------------------------------
// SMS / text club — mock signup. Transactional and marketing are separate.
// ---------------------------------------------------------------------------
export const smsClub = {
	keyword: 'SHINE',
	marketing: {
		whatYouGet: [
			'Monthly offers — first wash free codes, Club discounts, seasonal deals',
			'Rain alerts — a heads-up when storms are coming, so you can wash before or after',
			'Wash-ready reminders for booked detailing appointments'
		],
		frequency: 'Up to 4 marketing texts a month. Never more — and never on a Sunday morning.'
	},
	transactional: {
		whatYouGet: [
			'Booking confirmations and reminders',
			'Your rewash code if you claim the rain guarantee',
			'Your Shine Rewards stamp and credit updates'
		],
		frequency:
			'Only when you have a booking or a claim — no marketing in these messages, ever. Transactional texts are a separate programme from marketing texts.'
	},
	optOut: 'Reply STOP to any message to stop that programme, or HELP for help. Message and data rates may apply.',
	consentNote:
		'Joining the text club is optional and is never a condition of buying a wash or joining the Club. The consent box is unchecked by default — tick it only if you want marketing texts.'
};

// ---------------------------------------------------------------------------
// Florida car-care seasonal calendar — for the home page (home worker renders)
// ---------------------------------------------------------------------------
export const seasonalCalendar = [
	{
		season: 'Lovebug season',
		when: 'April – May and August – September',
		duration: 'About 4–5 weeks each wave',
		advice:
			'Love bug residue is acidic and etches clear coat if baked in the sun. Wash within 24 hours of a buggy drive — and book wax or ceramic before the season starts, not during it.',
		link: '/blog/lovebug-season'
	},
	{
		season: 'Hurricane season',
		when: '1 June – 30 November',
		duration: 'Six months',
		advice:
			'Before a storm: wash and seal so storm residue rinses off protected paint, photograph the car for insurance, and park away from trees on high ground. After a storm: an underbody salt rinse matters more than the paint. Never start a flooded car.',
		link: '/blog/hurricane-prep'
	},
	{
		season: 'Rainy season',
		when: 'May – October',
		duration: 'About five months',
		advice:
			'Daily afternoon storms mean road spray and standing water. Wash more often, keep the rain guarantee in mind, and let the underbody rinse do its work.',
		link: '/blog/rainy-season-care'
	},
	{
		season: 'Pollen season',
		when: 'January – June (oak pollen peaks February – May)',
		duration: 'About six months',
		advice:
			'Yellow pollen film settles on everything. A weekly wash keeps it off the paint — and off the cabin filter, which is why the interior matters too.'
	},
	{
		season: 'Pre-season protection push',
		when: 'February and July – August',
		duration: 'Before each lovebug wave',
		advice:
			'Book ceramic or wax before lovebug season starts. Pre-season slots fill — the protection has to be on the paint before the bugs arrive, not after.'
	}
];

// ---------------------------------------------------------------------------
// Round-3 blog posts — 2 new posts. Author bylines + share buttons are
// rendered ONLY for these two posts (they carry an author field; the 3
// existing posts do not). Wired into the blog index and [slug] loader by
// merging with blogPosts from site.ts — see src/routes/blog/+page.svelte
// and src/routes/blog/[slug]/+page.server.ts.
// ---------------------------------------------------------------------------
export type Round3BlogPost = BlogPost & {
	author: string;
	authorRole: string;
	authorBio: string;
};
export const round3BlogPosts: Round3BlogPost[] = [
	{
		slug: 'hurricane-prep',
		title: 'Hurricane Season Car Prep: Before, During and After the Storm',
		excerpt:
			'Hurricane season runs 1 June to 30 November. Wash and seal before the storm, photograph the car for insurance, park on high ground — and after it passes, rinse the underbody before you worry about the paint.',
		date: 'May 2026',
		readTime: '5 min read',
		image: 'blog-hurricane-prep',
		category: 'Car Care Tips',
		author: 'Carlos Mendez',
		authorRole: 'Founder & Miami Lead',
		authorBio:
			'Carlos started Florida Shine with one tunnel in Miami in 2018 and still inspects every wash bay himself. He has washed cars through eight Florida hurricane seasons.',
		body: [
			'Hurricane season in Florida runs from 1 June to 30 November, and every year it catches someone with a dirty car and no plan. The prep is simple, but it has to happen before the storm — not after.',
			'First, wash and seal the car. Storm residue — salt spray, sand, leaves, roof grit — releases with a rinse on protected paint. On bare, dirty paint it bonds and becomes a decontamination job. A Premium Wash with wax, or a ceramic coat if you have one, is the cheapest insurance you will buy all season.',
			'Second, photograph the car. Walk around it with your phone and take dated photos of every panel, the roof and the interior. If the storm damages it, those photos are what your insurer asks for first.',
			'Third, park smart. Away from trees and power lines, on high ground, never in a spot that floods in a normal summer storm. Fill the tank, charge the EV, and take the valuables out — the car may sit for days.',
			'After the storm, the order matters. Do not start a flooded car — water in the engine or battery is a job for a mechanic, not a wash. Once the car is safe to move, the underbody salt rinse matters more than the paint: storm surge and standing water throw salt and grit underneath, where it corrodes unseen. Bring it to us for a wash with an underbody rinse as soon as the roads are clear, and let the team check the door jambs and fuel flap where salt collects.',
			'We stay open through the season whenever it is safe to do so, and we close only for lightning or high wind — the same rule as any rainy day. If a storm is coming, wash early: the queue on the day before landfall is the longest of the year.'
		]
	},
	{
		slug: 'rainy-season-care',
		title: 'Rainy Season Car Care: May to October in Florida',
		excerpt:
			'Five months of afternoon storms mean road spray, standing water and grit — every day. Wash more often, keep the rain guarantee in mind, and do not skip the underbody rinse.',
		date: 'June 2026',
		readTime: '4 min read',
		image: 'blog-rainy-season',
		category: 'Car Care Tips',
		author: 'Angela Brooks',
		authorRole: 'Head of Detailing',
		authorBio:
			'Angela leads ceramic and interior detail studios across Florida Shine, with ten years in paint care. She writes the aftercare guides our detail team hands to every customer.',
		body: [
			'Florida’s rainy season runs roughly May to October, and it changes the job of a car wash. In the dry months, a wash is about dust and shine. In the rainy months, it is about road spray, standing water and the grit that comes with both.',
			'Rain itself does not clean a car — that is the first myth to drop. Rainwater picks up dust and pollution on the way down, and the spray from the car in front throws road film, oil and sand onto your paint. A car that has been “washed by the rain” is usually dirtier than before, with water spots baked in by the sun that follows the storm.',
			'So wash more often, not less. Once a week is the honest minimum in the rainy season, and it is exactly what the Unlimited Wash Club is built for — a wash costs nothing extra once you are a member, so there is no reason to drive a dirty car through a wet week.',
			'Two things matter most in a rainy-season wash. The first is the underbody rinse: standing water throws salt and grit underneath the car, where it corrodes unseen. The second is a layer of protection — wax or ceramic — so the next storm’s residue releases with a rinse instead of bonding to the paint.',
			'And remember the rain guarantee: if it rains within 48 hours of your wash and dirties the car again, come back for a free rewash of the same car. Florida weather is unpredictable — your shine should not be. The claim takes two taps on the rain-guarantee page, with your booking reference.',
			'One last habit: after a wet drive, wipe the door jambs and the fuel flap. They collect standing water and sand, and they are the first places rust starts on a Florida car.'
		]
	}
];
