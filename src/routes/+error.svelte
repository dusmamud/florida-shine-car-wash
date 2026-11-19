<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} — Florida Shine Car Wash</title>
</svelte:head>

<section class="bg-navy py-20 text-center text-white">
	<div class="mx-auto max-w-2xl px-4">
		<p class="font-display text-7xl font-black text-sun">{page.status}</p>
		<h1 class="mt-4 font-display text-3xl font-black">This page drove off without us.</h1>
		<p class="mt-3 text-white/85">The page you're looking for doesn't exist — or it moved. Let's get your car shining instead.</p>
		<div class="mt-8 flex flex-wrap justify-center gap-3">
			<a href="/" class="inline-flex min-h-12 items-center rounded-full bg-sun px-6 py-3 font-black text-navy">Back to Home</a>
			<a href="/locations" class="inline-flex min-h-12 items-center rounded-full border-2 border-white px-6 py-3 font-black text-white">Find a Location</a>
		</div>
	</div>
</section>
