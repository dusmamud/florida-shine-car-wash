// Florida Shine Car Wash — ALL Spanish copy for the /es routes lives here.
// Mock translations of the English site. Prices ($16/$28/$45, $19/$29/$39/mo),
// phone (305) 555-0198 and hours never change — only the words do.
// Slugs, prices and availability logic are reused from site.ts so they
// can never drift from the English site.
export const baseUrl = 'https://florida-shine-car-wash.pages.dev';

/** Full hreflang URLs for a Spanish page and its English equivalent. */
export function hreflangUrls(esPath: string, enPath: string) {
	return { es: `${baseUrl}${esPath}`, en: `${baseUrl}${enPath}`, xDefault: `${baseUrl}${enPath}` };
}

/** BreadcrumbList JSON-LD. Items: { name, path } — path only, e.g. "/es/packages". */
export function breadcrumb(items: { name: string; path: string }[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.name,
			item: `${baseUrl}${item.path}`
		}))
	};
}

export const siteEs = {
	tagline: 'Auto limpio. Días más brillantes.',
	phone: '(305) 555-0198',
	phoneHref: 'tel:+13055550198',
	email: 'hello@floridashinecarwash.com',
	address: '1200 Biscayne Blvd, Miami, FL 33132',
	hoursEs: 'lun–sáb 7:00 a. m.–7:00 p. m. · dom 8:00 a. m.–6:00 p. m.',
	lastWashEs: 'Último lavado 15 minutos antes del cierre',
	/** Hours in the long form used on the locations index. */
	hoursLong: 'Lun – sáb: 7:00 a. m. – 7:00 p. m. · Dom: 8:00 a. m. – 6:00 p. m.'
};

export const navEs = {
	home: 'Inicio',
	packages: 'Paquetes',
	memberships: 'Membresías',
	book: 'Reservar',
	locations: 'Ubicaciones',
	reviews: 'Reseñas'
};

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */
export const homeEs = {
	heroLines: ['AUTO LIMPIO.', 'DÍAS MÁS BRILLANTES.', 'FLORIDA BRILLA.'],
	heroSub: 'Servicios premium de lavado y detailing en Florida.',
	viewPackages: 'VER PAQUETES',
	findLocation: 'BUSCAR UNA UBICACIÓN',
	ratingLine: 'Querido por los conductores de Florida',
	ratingSource: 'reseñas de Google',
	trustItems: [
		{ title: 'ECOLÓGICO', text: 'Tecnología que ahorra agua y productos ecológicos' },
		{ title: 'SEGURO PARA LA PINTURA', text: 'Materiales suaves para una limpieza sin rayones' },
		{ title: 'RÁPIDO Y CÓMODO', text: 'Servicio rápido para que vuelva pronto a la carretera' },
		{ title: '100% DE SATISFACCIÓN', text: 'No estamos contentos hasta que usted lo esté' }
	],
	marquee: ['ASPIRADORAS GRATIS', 'ENJUAGUE SIN MANCHAS', 'ESPUMA SUAVE', 'RE-LAVADO POR LLUVIA', 'ABIERTO 7 DÍAS'],
	counters: {
		locations: 'UBICACIONES EN FLORIDA',
		reviews: 'RESEÑAS DE GOOGLE',
		rating: 'CALIFICACIÓN PROMEDIO',
		since: 'BRILLANDO DESDE'
	},
	packagesEyebrow: '— ELIGE TU BRILLO —',
	packagesHeading: 'PAQUETES DE LAVADO',
	packagesSub:
		'Cada lavado incluye nuestra espuma suave, enjuague sin manchas y una sonrisa. Mejore su lavado cuando quiera.',
	mostPopular: 'EL MÁS POPULAR',
	getStarted: 'EMPEZAR',
	seeDetails: 'Ver todos los detalles',
	compareAll: 'Comparar todos los paquetes y complementos',
	clubHeading: 'CLUB DE LAVADO ILIMITADO',
	clubSub: '¡Lave tan seguido como quiera!',
	clubPerks: ['Lavados ilimitados', 'Cancele cuando quiera', 'Beneficios exclusivos para miembros'],
	joinNow: 'UNIRSE',
	startingAt: 'DESDE',
	perMonth: '/MES',
	whyHeading: 'POR QUÉ LOS CONDUCTORES DE FLORIDA NOS ELIGEN',
	whyItems: [
		{ title: 'FUERZA DE FLORIDA', text: 'Hecho para el sol, la sal y la arena: protegemos su auto.' },
		{ title: 'ENJUAGUE SIN MANCHAS', text: 'Los sistemas avanzados no dejan manchas.' },
		{ title: 'EQUIPO AMABLE', text: 'Expertos locales a los que les importa su auto.' },
		{ title: 'VARIAS UBICACIONES', text: 'Ubicaciones convenientes en toda Florida.' }
	],
	baHeading: 'VEA EL BRILLO',
	baSub: 'Arrastre el control para ver la diferencia que hace un lavado de Florida Shine.',
	baTitle: 'Lavado con espuma triple',
	baCaption:
		'Un auto realmente sucio, antes y después de un lavado de Florida Shine: dos fotos distintas, no un filtro.',
	galleryLink: 'Ver la galería completa',
	locEyebrow: 'CERCA DE USTED',
	locHeading: 'ENCUENTRE UNA UBICACIÓN CERCA DE USTED',
	locText: 'De Miami a Tampa, estamos aquí para que Florida brille.',
	locSub:
		'8 ubicaciones en Florida: abiertas los 7 días de la semana, con aspiradoras gratis y equipos locales amables en cada lavado.',
	viewAllLocations: 'VER TODAS LAS UBICACIONES',
	bookAppointment: 'Reservar una cita',
	reviewsHeading: 'A LOS CONDUCTORES DE FLORIDA LES ENCANTA EL BRILLO',
	readAllReviews: 'Leer todas las reseñas',
	ctaHeading: '¿LISTO PARA BRILLAR?',
	ctaText: 'Reserve un lavado o un detalle en menos de dos minutos, o simplemente venga. Su auto se lo agradecerá.',
	ctaBook: 'RESERVAR UNA CITA',
	ctaCall: 'LLAMAR'
};

/* ------------------------------------------------------------------ */
/* Packages, services, add-ons, vehicle sizes                          */
/* ------------------------------------------------------------------ */
export const packageNames: Record<string, string> = {
	'basic-wash': 'Lavado Básico',
	'premium-wash': 'Lavado Premium',
	'deluxe-detail': 'Detalle Deluxe'
};
export const packageTaglines: Record<string, string> = {
	'basic-wash': 'Una limpieza de calidad, siempre.',
	'premium-wash': 'Nuestro mejor lavado y protección.',
	'deluxe-detail': 'La limpieza total.'
};
export const packageDescriptions: Record<string, string> = {
	'basic-wash':
		'Nuestro lavado exterior de todos los días: una limpieza suave, enjuague sin manchas y brillo en ruedas y llantas. Perfecto entre un detalle y otro.',
	'premium-wash':
		'Todo lo del Básico, más espuma triple, protección de cera y un enjuague de chasis que resiste el sol, la sal y la arena de Florida.',
	'deluxe-detail':
		'El servicio completo, por dentro y por fuera: lavado premium más limpieza interior completa, tablero y puertas, y cristales por dentro y por fuera.'
};
export const featureNames: Record<string, string> = {
	'Exterior Wash': 'Lavado exterior',
	'Wheel Cleaning': 'Limpieza de ruedas',
	'Tire Shine': 'Brillo de llantas',
	'Wax Protection': 'Protección de cera',
	'Triple Foam': 'Espuma triple',
	'Interior Cleaning': 'Limpieza interior',
	'Dash & Door Detail': 'Detalle de tablero y puertas'
};
export const compareFeatures = [
	'Lavado exterior',
	'Limpieza de ruedas',
	'Brillo de llantas',
	'Protección de cera',
	'Espuma triple',
	'Limpieza interior',
	'Detalle de tablero y puertas'
];
export const serviceNames: Record<string, string> = {
	'exterior-wash': 'Lavado exterior',
	'interior-detailing': 'Detalle interior',
	'ceramic-coating': 'Recubrimiento cerámico',
	'wax-and-polish': 'Cera y pulido',
	'wheel-and-tire-care': 'Cuidado de ruedas y llantas',
	'pet-hair-and-odor': 'Pelo y olor de mascota'
};
export const serviceShorts: Record<string, string> = {
	'exterior-wash': 'Lavado suave, espuma triple y enjuague sin manchas.',
	'interior-detailing': 'Limpieza profunda de asientos, alfombras, tablero y cada rejilla.',
	'ceramic-coating': 'Meses de brillo hidrofóbico y protección solar.',
	'wax-and-polish': 'Cera aplicada a mano y pulido a máquina para un brillo espejo.',
	'wheel-and-tire-care': 'Sin polvo de frenos: ruedas brillantes y llantas impecables.',
	'pet-hair-and-odor': 'Asientos sin pelo y aire fresco, incluso después de perros de playa.'
};
export const addonNames: Record<string, string> = {
	'Ceramic Coating': 'Recubrimiento cerámico',
	'Full Interior Detail': 'Detalle interior completo',
	'Pet Hair Removal': 'Eliminación de pelo de mascota',
	'Headlight Restoration': 'Restauración de faros',
	'Odor Elimination': 'Eliminación de olores',
	'Engine Bay Detail': 'Detalle del motor',
	'Rain Repellent': 'Repelente de lluvia',
	'Clay Bar Treatment': 'Tratamiento con barra de arcilla'
};
export const addonDescriptions: Record<string, string> = {
	'Ceramic Coating': 'Hasta 12 meses de protección hidrofóbica y brillo profundo.',
	'Full Interior Detail': 'Aspirado profundo, champú, cuidado de cuero y detalle de consola.',
	'Pet Hair Removal': 'Herramientas especiales quitan el pelo incrustado de asientos y alfombras.',
	'Headlight Restoration': 'Devuelve la claridad a los faros opacos para mayor seguridad.',
	'Odor Elimination': 'El tratamiento con ozono elimina olores de humo, comida y humedad.',
	'Engine Bay Detail': 'Desengrase seguro y acabado para un motor como de salón.',
	'Rain Repellent': 'Tratamiento para el parabrisas que repele el agua a velocidad.',
	'Clay Bar Treatment': 'Elimina los contaminantes adheridos para una pintura lisa como el cristal.'
};
export const addonNotes: Record<string, string> = {
	'Ceramic Coating':
		'El mismo recubrimiento cerámico profesional de 12 meses que el servicio independiente: agréguelo a cualquier lavado o resérvelo como cita propia.',
	'Full Interior Detail':
		'Un detalle con champú profundo añadido a su lavado; el servicio independiente de Detalle Interior empieza en $45 por una limpieza interior básica.',
	'Pet Hair Removal':
		'El mismo precio, $25, como complemento de un lavado o como parte del servicio independiente de Eliminación de pelo y olores de mascota.',
	'Headlight Restoration': 'Un complemento independiente, no forma parte de ningún paquete de lavado.',
	'Odor Elimination':
		'El mismo tratamiento con ozono incluido en el servicio de Eliminación de pelo y olores de mascota; agréguelo por separado aquí.',
	'Engine Bay Detail': 'Un complemento independiente, no forma parte de ningún paquete de lavado.',
	'Rain Repellent': 'Un complemento rápido para cualquier lavado, no forma parte de ningún paquete.',
	'Clay Bar Treatment':
		'La misma preparación con barra de arcilla que usamos antes del Recubrimiento cerámico; agréguela a cualquier lavado aquí.'
};
export const sizeLabels: Record<string, string> = {
	Sedan: 'Sedán',
	SUV: 'SUV',
	Truck: 'Camioneta',
	Van: 'Furgoneta',
	'Sports car': 'Deportivo'
};
export const sizeUpchargeNoteEs =
	'Recargo por tamaño de vehículo: sedán y deportivo incluidos · SUV +$5 · camioneta y furgoneta +$8, añadido al precio del lavado al reservar.';
export const fromPrice = 'desde';

/** Translate an English duration from site.ts into Spanish, e.g. "About 10 minutes" → "unos 10 minutos". */
export function esDuration(duration: string): string {
	return duration
		.replace(/^About /i, 'unos ')
		.replace(/minutes/gi, 'minutos')
		.replace(/minute/gi, 'minuto')
		.replace(/hours/gi, 'horas')
		.replace(/hour/gi, 'hora');
}

export const packagesPageEs = {
	title: 'Paquetes de lavado — Florida Shine Car Wash',
	description:
		'Tres paquetes de lavado desde $16: Lavado Básico $16, Lavado Premium $28, Detalle Deluxe $45. Espuma suave, enjuague sin manchas, cera e interiores en 8 ubicaciones de Florida.',
	eyebrow: 'ELIGE TU BRILLO',
	heading: 'Paquetes de lavado',
	subtitle:
		'Tres paquetes sencillos, un solo resultado brillante. Cada lavado usa espuma suave, agua filtrada y un enjuague sin manchas, y cada paquete se puede reservar en línea en dos minutos.',
	compareHeading: 'Comparar paquetes',
	includedCol: 'Qué incluye',
	notIncluded: 'No incluido',
	included: 'Incluido',
	addonsHeading: 'Complementos: hágalo a su manera',
	addonsSub: 'Añada cualquiera de estos a cualquier lavado, en el lavado o al reservar en línea.',
	bookThisWash: 'RESERVAR ESTE LAVADO',
	details: 'Detalles',
	breakEvenWith: (clubName: string, price: number, breakEven: string) =>
		`${breakEven} con el ${clubName} ($${price}/mes).`
};

/* ------------------------------------------------------------------ */
/* Memberships                                                         */
/* ------------------------------------------------------------------ */
export const membershipNames: Record<string, string> = {
	'basic-club': 'Club Básico',
	'premium-club': 'Club Premium',
	'deluxe-club': 'Club Deluxe'
};
export const membershipTaglines: Record<string, string> = {
	'basic-club': 'Lavados Básicos ilimitados cada mes.',
	'premium-club': 'Lavados Premium ilimitados + cera.',
	'deluxe-club': 'Ilimitado todo, por dentro y por fuera.'
};
export const membershipFeatures: Record<string, string> = {
	'Unlimited Basic Washes': 'Lavados Básicos ilimitados',
	'Unlimited Premium Washes': 'Lavados Premium ilimitados',
	'Unlimited Deluxe Details': 'Detalles Deluxe ilimitados',
	'One car per plan': 'Un auto por plan',
	'Cancel anytime': 'Cancele cuando quiera',
	'Member-only wash lane': 'Carril exclusivo para miembros',
	'Wax protection included': 'Protección de cera incluida',
	'Free vacuum use': 'Uso gratuito de aspiradoras',
	'Interior cleaning included': 'Limpieza interior incluida',
	'10% off add-ons': '10% de descuento en complementos',
	'Priority booking lane': 'Carril prioritario de reservas'
};
export const membershipBillingEs = 'Se cobra mensualmente en la fecha en que se unió';
export const membershipRecognitionEs = 'calcomanía RFID en el parabrisas';
export const membershipDailyLimitEs = '1 lavado por día, por vehículo';
export const membershipBreakEven: Record<string, string> = {
	'basic-club': 'Se paga solo con 2 lavados',
	'premium-club': 'Se paga solo con 2 lavados',
	'deluxe-club': 'Se paga solo con 1 lavado'
};

export const membershipsPageEs = {
	title: 'Club de Lavado Ilimitado — Florida Shine Car Wash',
	description:
		'Club de Lavado Ilimitado desde $19/mes: lavados ilimitados en las 8 ubicaciones de Florida, reconocimiento por calcomanía RFID, 1 lavado por día por vehículo, cobro mensual en su fecha de registro, cancele cuando quiera.',
	eyebrow: 'CLUB DE LAVADO ILIMITADO',
	heading: 'Lave tan seguido como quiera',
	subtitle:
		'Un precio mensual fijo, lavados ilimitados en las 8 ubicaciones de Florida. Sin contratos, cancele cuando quiera, y los miembros evitan la fila en el carril exclusivo.',
	howHeading: 'Cómo funciona la membresía',
	billingTitle: 'Fecha de cobro',
	billingText: `Todos los planes: ${membershipBillingEs}. Su primer mes empieza el día en que se une.`,
	recognitionTitle: 'Cómo lo reconocemos',
	recognitionText: `Por la ${membershipRecognitionEs} en su parabrisas: sin tarjeta, sin aplicación. Funciona en las 8 ubicaciones.`,
	dailyTitle: 'Límite diario',
	dailyText: `${membershipDailyLimitEs}. Lave todos los días si quiere, solo una vez al día por vehículo.`,
	extraTitle: '¿Un segundo auto?',
	extraText: 'Añada un vehículo extra por $10/mes (Básico), $15/mes (Premium) o $20/mes (Deluxe).',
	tablePlan: 'Plan',
	tablePrice: 'Precio',
	tableBreakEven: 'Se paga solo',
	tableExtra: 'Vehículo extra',
	breakEvenNote:
		'El cálculo de amortización se hace frente al lavado individual equivalente: Lavado Básico $16, Lavado Premium $28, Detalle Deluxe $45.',
	joinHeading: (plan: string, price: number) => `Únase al Club — ${plan} $${price}/mes`,
	joinMockNote:
		'Registro simulado: no se cobra ningún pago. Le enviaremos un paquete de bienvenida y los datos de su calcomanía de miembro.',
	planLabel: 'Elija su plan',
	nameLabel: 'Nombre completo',
	emailLabel: 'Correo electrónico',
	termsTitle: (plan: string, price: number) => `Resumen de términos — ${plan}, $${price}/mes`,
	termsText: (price: number) =>
		`${membershipBillingEs}. Reconocimiento por ${membershipRecognitionEs}. ${membershipDailyLimitEs}. Cancele cuando quiera en línea o en persona, sin cargo por cancelación. El precio es $${price}/mes.`,
	consentText: (price: number) =>
		`Acepto los Términos de Membresía: $${price}/mes, cobro mensual en mi fecha de registro, cancele cuando quiera en línea o en persona.`,
	termsLink: 'Términos de Membresía',
	errorDetails: 'Escriba su nombre y un correo electrónico válido.',
	errorConsent: 'Acepte los Términos de Membresía antes de unirse.',
	submit: (plan: string, price: number) => `UNIRSE — ${plan.toUpperCase()} $${price}/MES`,
	joinButton: (plan: string) => `UNIRSE AL ${plan.toUpperCase()}`,
	footnote: 'Mes a mes. Cancele cuando quiera. No se cobra ningún pago en esta demostración.',
	successTitle: (name: string) => `¡Bienvenido al club, ${name}!`,
	successBody: (plan: string, price: number, email: string) =>
		`Su membresía ${plan} ($${price}/mes) está lista en esta demostración. Se ha «enviado» una confirmación a ${email}. Muestre esta página en cualquier ubicación para activar su calcomanía de miembro.`,
	successTerms: (plan: string, price: number) =>
		`Sus términos: $${price}/mes, ${membershipBillingEs.toLowerCase()}, reconocimiento por ${membershipRecognitionEs}, ${membershipDailyLimitEs.toLowerCase()}, cancele cuando quiera en línea o en persona.`,
	successManage: 'Gestione o cancele cuando quiera en su cuenta.',
	successQuestions: '¿Preguntas? Llame al (305) 555-0198.',
	accountLink: 'su cuenta'
};

/* ------------------------------------------------------------------ */
/* Locations                                                           */
/* ------------------------------------------------------------------ */
export const locationFeatures: Record<string, string> = {
	'Tunnel wash': 'Túnel de lavado',
	'Detail studio': 'Estudio de detailing',
	'Free vacuums': 'Aspiradoras gratis',
	'EV charging': 'Carga para vehículos eléctricos',
	'Pet wash bay': 'Zona de lavado para mascotas'
};
export const locationEntrance: Record<string, string> = {
	'miami-downtown': 'Entre por Biscayne Blvd; siga las flechas azules',
	'miami-kendall': 'Entre por SW 88th St; el túnel está detrás de las aspiradoras',
	tampa: 'Entre por N Dale Mabry Hwy; gire en el arco amarillo',
	orlando: 'Entre por International Dr; busque el letrero azul con la ola',
	jacksonville: 'Entre por Southside Blvd; el túnel está a la izquierda al entrar',
	'fort-lauderdale': 'Entre por N Federal Hwy; siga las flechas azules pasando las aspiradoras',
	naples: 'Entre por Tamiami Trail N; la entrada está junto a la fila de palmeras',
	sarasota: 'Entre por Bee Ridge Rd; gire en el letrero amarillo con el sol'
};
export const locationBusyHours: Record<string, string> = {
	'miami-downtown': 'Suele estar concurrido: sáb 10:00 a. m.–2:00 p. m. · Suele estar tranquilo: mar–jue por la mañana',
	'miami-kendall': 'Suele estar concurrido: sáb 9:00 a. m.–1:00 p. m. · Suele estar tranquilo: lun–mié por la mañana',
	tampa: 'Suele estar concurrido: sáb 10:00 a. m.–2:00 p. m. · Suele estar tranquilo: mar–jue por la tarde',
	orlando: 'Suele estar concurrido: vie–sáb 11:00 a. m.–3:00 p. m. · Suele estar tranquilo: lun–mar por la mañana',
	jacksonville: 'Suele estar concurrido: sáb 9:00 a. m.–12:00 p. m. · Suele estar tranquilo: mié–jue por la mañana',
	'fort-lauderdale': 'Suele estar concurrido: sáb 10:00 a. m.–2:00 p. m. · Suele estar tranquilo: mar–jue por la mañana',
	naples: 'Suele estar concurrido: sáb 10:00 a. m.–1:00 p. m. · Suele estar tranquilo: lun–mié por la tarde',
	sarasota: 'Suele estar concurrido: sáb 9:00 a. m.–12:00 p. m. · Suele estar tranquilo: mar–jue por la mañana'
};

export const locationsPageEs = {
	title: 'Ubicaciones — Florida Shine Car Wash',
	description:
		'8 ubicaciones de Florida Shine Car Wash, de Miami a Jacksonville: Miami, Tampa, Orlando, Fort Lauderdale, Naples y Sarasota. Túnel suave, aspiradoras gratis, abierto 7 días a la semana.',
	eyebrow: 'CERCA DE USTED',
	heading: 'Encuentre una ubicación cerca de usted',
	subtitle: 'De Miami a Tampa, estamos aquí para que Florida brille. 8 ubicaciones, abiertas los 7 días de la semana.',
	whenHeading: 'Cuándo venir',
	whenText:
		'Las horas habituales de mayor y menor afluencia se muestran en cada página de ubicación: los sábados de 10:00 a. m. a 2:00 p. m. suelen ser los más concurridos, y las mañanas entre semana, las más tranquilas. Son horarios típicos, no tiempos de espera en vivo.',
	offersHeading: 'Qué ofrece cada ubicación',
	offers: [
		'Túnel de lavado suave, seguro para todo tipo de pintura',
		'Aspiradoras gratis después de cada lavado: el último lavado es 15 minutos antes del cierre',
		'Las membresías funcionan en las 8 ubicaciones: su calcomanía RFID es reconocida en todas',
		'El túnel admite vehículos de hasta 7 pies de alto'
	],
	searchLabel: 'Buscar por ciudad o código postal',
	searchPlaceholder: 'Pruebe Miami, Tampa o 33132…',
	found: (n: number) => `${n} ${n === 1 ? 'ubicación encontrada' : 'ubicaciones encontradas'}`,
	noneFound: (q: string) =>
		`Ninguna ubicación coincide con «${q}». Pruebe una ciudad cercana, o llame al (305) 555-0198 y le indicaremos el lavado más cercano.`,
	detailsButton: 'DETALLES DE LA UBICACIÓN',
	bookHereButton: 'RESERVAR AQUÍ'
};

export const locationDetailEs = {
	eyebrow: 'NUESTRAS UBICACIONES',
	howToEnter: 'Cómo llegar:',
	busyLabel: 'Cuándo hay más gente:',
	washTypeLabel: 'Tipo de lavado:',
	vacuumsLabel: 'Aspiradoras gratis:',
	vacuumsBays: (n: number) => `${n} bahías`,
	membershipLabel: 'Membresía:',
	membershipText: 'funciona en todas las ubicaciones.',
	bookHere: 'RESERVAR EN ESTA UBICACIÓN',
	allLocations: 'Todas las ubicaciones',
	addonsHeading: 'Añada algo extra',
	addWhenBooking: 'Añadir al reservar →',
	goodToKnow: 'Conviene saber',
	driversSay: 'Qué dicen los conductores aquí',
	readAllReviews: 'Leer todas las reseñas →',
	otherLocations: 'Otras ubicaciones',
	mapTitle: (name: string, city: string) => `Mapa de ${name}, ${city}`
};

/* ------------------------------------------------------------------ */
/* Reviews (mock — translated from the English mock reviews)           */
/* ------------------------------------------------------------------ */
export type ReviewEs = { name: string; city: string; rating: number; service: string; date: string; text: string };
export const reviewsEs: ReviewEs[] = [
	{
		name: 'Marcus T.',
		city: 'Miami',
		rating: 5,
		service: 'Lavado Premium',
		date: 'nov 2026',
		text: 'El mejor lavado de Miami, sin duda. La espuma triple y la cera duran de verdad: mi auto sigue repeliendo el agua una semana después.'
	},
	{
		name: 'Sofia R.',
		city: 'Tampa',
		rating: 5,
		service: 'Detalle Deluxe',
		date: 'nov 2026',
		text: 'Sacaron dos años de arena de playa de mi SUV. El interior parece nuevo y huele increíble.'
	},
	{
		name: 'James W.',
		city: 'Orlando',
		rating: 5,
		service: 'Club Premium',
		date: 'oct 2026',
		text: 'El Club Ilimitado se paga solo con dos visitas. Paso después de cada viaje a la playa: entro y salgo en 15 minutos.'
	},
	{
		name: 'Alicia G.',
		city: 'Fort Lauderdale',
		rating: 5,
		service: 'Recubrimiento cerámico',
		date: 'oct 2026',
		text: 'El recubrimiento cerámico valió cada centavo. La lluvia ahora resbala y el sol de Florida no le hace nada a este brillo.'
	},
	{
		name: 'David K.',
		city: 'Naples',
		rating: 4,
		service: 'Lavado Básico',
		date: 'sep 2026',
		text: 'Rápido, amable y una limpieza realmente buena por el precio. Las aspiradoras gratis son un buen detalle.'
	},
	{
		name: 'Priya N.',
		city: 'Jacksonville',
		rating: 5,
		service: 'Eliminación de pelo de mascota',
		date: 'sep 2026',
		text: 'Dos golden retrievers, un asiento trasero lleno de pelo… y se fue todo. El equipo fue muy amable.'
	}
];

/* FAQs shown on location detail pages (translated from the English FAQs). */
export const faqsEs = [
	{
		q: '¿Cuánto dura un lavado?',
		a: 'Un Lavado Básico dura unos 10 minutos; el Premium, unos 15; y un Detalle Deluxe, unos 45 minutos. Los servicios de detailing se reservan con cita para no hacerle esperar.'
	},
	{
		q: '¿Necesito cita?',
		a: 'No necesita cita para los lavados en túnel: solo venga. El detailing, el recubrimiento cerámico y los servicios de interior son con cita, para dedicarle a su auto el tiempo que merece.'
	},
	{
		q: '¿Su lavado es seguro para mi pintura?',
		a: 'Sí. Usamos espuma suave, agua filtrada y jabones de pH neutro. Nuestro lavado es seguro para la capa transparente, los recubrimientos cerámicos y los vinilos.'
	},
	{
		q: '¿Qué altura cabe en el túnel?',
		a: 'El túnel admite vehículos de hasta 7 pies de alto y 7 pies de ancho. Los vehículos más altos, las camionetas con ruedas dobles y los vehículos grandes son bienvenidos en nuestros estudios de detailing con cita.'
	},
	{
		q: '¿Puedo usar mi membresía en cualquier ubicación?',
		a: 'Sí: todos los planes del Club de Lavado Ilimitado funcionan en las 8 ubicaciones de Florida Shine, y su calcomanía RFID es reconocida en cada túnel.'
	}
];

/* ------------------------------------------------------------------ */
/* Booking                                                             */
/* ------------------------------------------------------------------ */
export const bookEs = {
	title: 'Reservar una cita — Florida Shine Car Wash',
	description:
		'Reserve un lavado o un servicio de detailing en cualquiera de nuestras 8 ubicaciones de Florida en menos de dos minutos. Elija el servicio, la fecha y la hora; pague en el lavado, sin tarjeta.',
	eyebrow: 'RESERVAR UNA CITA',
	heading: 'Reserve su brillo',
	subtitle:
		'Elija un servicio, una ubicación y una hora: listo en menos de dos minutos. No paga ahora; pague en el lavado.',
	steps: ['Servicio', 'Ubicación', 'Fecha y hora', 'Sus datos'],
	step1Heading: 'Paso 1: elija un servicio o paquete',
	packagesLegend: 'Paquetes de lavado',
	servicesLegend: 'Servicios de detailing',
	addonsLegend: 'Complementos (opcional)',
	step2Heading: 'Paso 2: elija una ubicación',
	step3Heading: 'Paso 3: elija fecha y hora',
	dateLabel: 'Fecha',
	pickDateFirst: 'Elija una fecha para ver las horas disponibles.',
	timesLegend: (loc: string) => `Horas disponibles en ${loc}`,
	fullSuffix: ' — lleno',
	slotsNote:
		'La disponibilidad es una vista previa simulada: la misma fecha, hora y ubicación siempre muestran los mismos horarios.',
	step4Heading: 'Paso 4: vehículo y sus datos',
	makeLabel: 'Marca *',
	modelLabel: 'Modelo *',
	yearLabel: 'Año',
	sizeLabel: 'Tamaño del vehículo',
	nameLabel: 'Su nombre *',
	phoneLabel: 'Teléfono *',
	emailLabel: 'Correo electrónico (para su confirmación)',
	summaryHeading: 'Resumen de su reserva',
	totalAtWash: 'Total a pagar en el lavado:',
	back: 'Atrás',
	continue: 'Continuar',
	confirm: 'CONFIRMAR RESERVA',
	errorDateSlot: 'Elija una fecha y una hora.',
	errorPastDate: 'Esa fecha ya pasó. Elija hoy o una fecha futura.',
	errorSlotTaken: (slot: string, when: string, loc: string) =>
		`Lo sentimos: ${slot} el ${when} en ${loc} ya no está disponible. Elija otra hora.`,
	errorDetails: 'Complete los datos de su vehículo y de contacto para confirmar la reserva.',
	errorPhone: 'Escriba un número de teléfono válido con al menos 10 dígitos.',
	errorEmail: 'Esa dirección de correo no parece correcta; revísela.',
	doneTitle: (name: string) => `¡Su reserva está lista, ${name}!`,
	doneSub: 'Su cita está confirmada. Esta es una reserva simulada: no se cobró ningún pago.',
	labelRef: 'Referencia',
	labelService: 'Servicio',
	labelSize: (size: string) => `Tamaño del vehículo (${size})`,
	labelAddons: 'Complementos',
	labelLocation: 'Ubicación',
	labelWhen: 'Cuándo',
	labelVehicle: 'Vehículo',
	labelEta: 'Tiempo estimado',
	labelTotal: 'Total (pague en el lavado)',
	bringHeading: 'Qué traer',
	bringItems: (ref: string) => [
		`Su referencia de reserva (${ref}): muéstrela en su teléfono o simplemente diga su nombre.`,
		'Retire los objetos de valor y sueltos del auto antes de llegar.',
		'Llegue 5 minutos antes; los miembros usan el carril exclusivo.'
	],
	managePrefix: '¿Necesita cambiarla?',
	manageLink: 'Gestionar o reprogramar esta reserva',
	viewLocation: 'Ver ubicación',
	backHome: 'Volver al inicio'
};
