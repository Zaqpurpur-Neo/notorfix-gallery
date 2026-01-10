<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import type { Post } from "..";
    import { changeThumbnailResolution } from "../utils";
    import PixelMask from "./PixelMask.svelte";
	
	let loaded: boolean = $state(false);
	let post: Post & { index: number } = $props();
	let isHovered: boolean = $state(false);
	let mq: MediaQueryList;
	let observer: IntersectionObserver | null = null;
	let elementObserve: HTMLDivElement;
	
	const placeholder = changeThumbnailResolution(post.coverImage, 20);
	const originalImage = changeThumbnailResolution(post.coverImage, 550);
	const content = post.contents.filter(item => item.order < 3);

	function enableObserver() {
		if(observer) return;

		observer = new IntersectionObserver(([entry]) => {
			isHovered = entry.isIntersecting
		}, { threshold: 0.6 })

		observer.observe(elementObserve)
	}

	function disableObserver() {
		if(!observer) return;

		observer.disconnect();
		observer = null;
		isHovered = false;
	}

	onMount(() => {
		mq = window.matchMedia('(max-width: 768px)');
		const handleChange = e => {
			e.matches ? enableObserver() : disableObserver();
		}

		handleChange(mq);
		mq.addEventListener('change', handleChange);

		onDestroy(() => {
			mq.removeEventListener('change', handleChange);
			disableObserver();
		})
	})

</script>

<div class="card-container">
	<h4 class="index-item">{post.index + 1}</h4>

	<div class="stackable" bind:this={elementObserve} class:hovered={isHovered}>
		<div class="img-stack" class:loaded={loaded}>
		{#each content as item}
		<img
			referrerpolicy="no-referrer"
			class="img-stack-item"
			src={changeThumbnailResolution(item.url, 200)}
			loading="lazy"
			decoding="async"
			alt={post.slug + "-" + item.order.toString()} />
		{/each}
		</div>

		<div class="image-wrapper" class:loaded={loaded} class:hovered={isHovered}>
			<img
				referrerpolicy="no-referrer"
				src={placeholder} 
				alt={post.slug}
				class="img placeholder"
				aria-hidden="true"
			/>

			<img 
				referrerpolicy="no-referrer"
				src={originalImage}
				alt={post.slug}
				class="img full"
				onload={() => {loaded = true}}
				decoding="async"
				loading="lazy"
			/>
		</div>
	
	</div>

	<div class="bottom">
		<h3 class="title">{post.title}</h3>
	</div>

	<PixelMask 
		colorBackground="#262626" 
		colorBorder="#4f4f4f"
		loaded={loaded} />
</div>

<style>
.card-container {
	position: relative;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1em;
	border-top: 1px solid #4f4f4f;
	justify-content: space-around;
	overflow: hidden;
	height: 100%;
	aspect-ratio: 1/1.15;
}

.img-stack {
	position: absolute;
	top: 0;
	visibility: hidden;
}

.img-stack.loaded {
	visibility: unset;
}

.img-stack-item {
	position: absolute;
	width: 14em;
	min-width: 14em;
	min-height: 15em;
	transform-origin: bottom;
	transition: 
		transform .3s ease;
}

.index-item {
	position: relative;
	align-self: flex-end;
	padding: .5em 1em;
	z-index: 2;
}

.bottom {
	width: 100%;
	height: auto;
	padding: .75em;
	box-sizing: border-box;
	margin-top: auto;
}

.title {
	position: relative;
	margin-top: auto;
	text-transform: uppercase;
	z-index: 2;
}


.stackable {
	position: relative;
	margin: auto 0;
}

.image-wrapper {
	position: relative;
	overflow: hidden;
	width: 14em;
	min-width: 14em;
	min-height: 16.5em;
	border: 1px solid #4f4f4f;
	transition: transform .3s ease;
}

.image-wrapper:hover,
.image-wrapper.hovered {
	transform: rotate(-4deg) scale(1.05);
	border: 1px solid #6A4BED;
}

.stackable:hover .img-stack-item:nth-child(even), 
.stackable.hovered .img-stack-item:nth-child(even) {
	transform: 
		rotate(10deg) scale(0.9)
		translate(50px, -10px);
}

.stackable:hover .img-stack-item:nth-child(odd),
.stackable.hovered .img-stack-item:nth-child(odd) {
	transform: 
		rotate(-12deg) scale(0.9)
		translate(-50px, -10px);
}

.image-wrapper .img {
	width: 100%;
	height: auto;
	display: block;
}

.img.placeholder {
	position: absolute;
	inset: 0;

	image-rendering: pixelated;
	filter: grayscale();
	scale: 1.1;
	transition: 
		transform .4s ease 0s,
		visibility 0s ease .5s;
}

.img.full {
  opacity: 0;
}

.image-wrapper.loaded .img.placeholder {
	visibility: hidden;
	transform: translateY(100%);
}

.image-wrapper.loaded .img.full {
  opacity: 1;
}

@media (max-width: 1000px) {
	.title {
		font-size: 1em;
	}
}

@media (min-width: 600px) {
	.card-container {
		border-right: 1px solid #4f4f4f
	}
}

@media (max-width: 600px) {
	.card-container {
		aspect-ratio: 1/1.25;
	}
	
	.img-stack-item {
		width: 60vw;
		min-width: unset;
		min-height: unset;
	}

	.image-wrapper,
	.image-wrapper .img {
		width: 60vw;
		min-width: unset;
		min-height: unset;
	}
	
	.stackable:hover, 
	.image-wrapper:hover {
		transform: none;
	}

	.image-wrapper.hovered {
		transform: rotate(-3deg);
		border: 1px solid #6A4BED;
	}

	.stackable.hovered .img-stack-item:nth-child(even) {
		transform: 
			rotate(10deg) scale(0.8)
			translate(50px, -6px);
	}

	.stackable.hovered .img-stack-item:nth-child(odd) {
		transform: 
			rotate(-12deg) scale(0.8)
			translate(-50px, -6px);
	}
}

</style>

