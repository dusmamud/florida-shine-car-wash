<script lang="ts">
	let {
		src,
		alt,
		width = 1200,
		height = 800,
		sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px',
		eager = false,
		class: cls = ''
	}: {
		src: string;
		alt: string;
		width?: number;
		height?: number;
		sizes?: string;
		eager?: boolean;
		class?: string;
	} = $props();
</script>

<picture class={cls}>
	<source
		type="image/avif"
		srcset={`/images/${src}-480.avif 480w, /images/${src}-800.avif 800w, /images/${src}-1200.avif 1200w, /images/${src}-1600.avif 1600w`}
		{sizes}
	/>
	<source
		type="image/webp"
		srcset={`/images/${src}-480.webp 480w, /images/${src}-800.webp 800w, /images/${src}-1200.webp 1200w, /images/${src}-1600.webp 1600w`}
		{sizes}
	/>
	<img
		src={`/images/${src}-800.jpg`}
		srcset={`/images/${src}-480.jpg 480w, /images/${src}-800.jpg 800w, /images/${src}-1200.jpg 1200w, /images/${src}-1600.jpg 1600w`}
		{sizes}
		{alt}
		{width}
		{height}
		loading={eager ? 'eager' : 'lazy'}
		decoding="async"
		fetchpriority={eager ? 'high' : 'auto'}
		class="h-full w-full object-cover"
	/>
</picture>
