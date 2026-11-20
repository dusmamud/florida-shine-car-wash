<script lang="ts">
	// Seo.svelte — per-page SEO for every route.
	// Props API (for the next agent — reuse on every new route):
	//   title: string            — full <title>, e.g. "Wash Packages — Florida Shine Car Wash"
	//   description: string      — UNIQUE meta description for this page (150–160 chars ideal)
	//   canonical: string        — path only, e.g. "/packages" or "/locations/tampa" ("/" for home)
	//   ogImage?: string         — image base name in static/images, default "hero-soapy-car"
	//   type?: 'website' | 'product' | 'article' — default "website"
	//   jsonLd?: object          — optional JSON-LD object (Organization, AutoWash, BreadcrumbList,
	//                              Product+Offer only). NEVER pass aggregateRating, FAQPage or HowTo.
	//   hreflang?: { lang: string; href: string }[] — alternate-language URLs, e.g.
	//                              [{ lang: 'es', href: 'https://…/es/packages' }, { lang: 'x-default', href: 'https://…/packages' }]
	const base = 'https://florida-shine-car-wash.pages.dev';
	let {
		title,
		description,
		canonical,
		ogImage = 'hero-soapy-car',
		type = 'website',
		jsonLd,
		hreflang
	}: {
		title: string;
		description: string;
		canonical: string;
		ogImage?: string;
		type?: 'website' | 'product' | 'article';
		jsonLd?: Record<string, unknown>;
		hreflang?: { lang: string; href: string }[];
	} = $props();
	const url = $derived(`${base}${canonical}`);
	const imageUrl = $derived(`${base}/images/${ogImage}-1200.jpg`);
	const jsonLdText = $derived(jsonLd ? JSON.stringify(jsonLd) : '');
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	{#if hreflang}
		{#each hreflang as alt}
			<link rel="alternate" hreflang={alt.lang} href={alt.href} />
		{/each}
	{/if}
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:url" content={url} />
	<meta property="og:type" content={type} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
	{#if jsonLd}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html `<script type="application/ld+json">${jsonLdText}</${'script>'}`}
	{/if}
</svelte:head>
