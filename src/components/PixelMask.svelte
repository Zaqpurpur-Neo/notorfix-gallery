<script lang="ts">
import { onMount } from "svelte";

let { 
	loaded = false, 
	pixelsize = 64, borderWith = 1,
	chunkSize = 3, stepDelay = 8, 
	colorBackground = "#f1f1f1", colorBorder = "#f1f1f1" 
} = $props();

let pixels: Array<{x: number, y: number}> = [];
let index = 0;
let running = false;
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

let w: number = 0, h: number = 0;

let visible: boolean = $state(true);

onMount(() => {
	ctx = canvas.getContext("2d");
	resize();
	buildPixels();
	drawFull();
})

$effect(() => {
	if(loaded && !running)  {
		start();
	}
})

function resize() {
	const rect = canvas.parentElement.getBoundingClientRect();
	w = Math.ceil(rect.width);
	h = Math.ceil(rect.height + 64);
	
	canvas.width = w;
	canvas.height = h;
}

function drawFull() {
	ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = colorBackground;
	ctx.strokeStyle = colorBorder;
	ctx.lineWidth = borderWith;

    for (const p of pixels) {
		ctx.beginPath();
		ctx.rect(p.x, p.y, pixelsize, pixelsize);
		ctx.fill();
		ctx.stroke();
    }
}

function buildPixels() {
	pixels.length = 0;
	for (let y = 0; y < h; y += pixelsize) {
    	for (let x = 0; x < w; x += pixelsize) {
    		pixels.push({ x, y });
      	}
    }

	pixels.sort((a, b) =>  (a.x + a.y) - (b.x + b.y));
}

function start() {
	running = true;
	index = 0;

	let last = 0;

	function animate(t) {
		if (t - last >= stepDelay) {
        	index += chunkSize;
        	last = t;
      	}

		ctx.clearRect(0, 0, w, h);
		ctx.fillStyle = colorBackground;
		ctx.strokeStyle = colorBorder;
		ctx.lineWidth = borderWith;

      	for (let i = index; i < pixels.length; i++) {
        	const p = pixels[i];
        	ctx.beginPath();
			ctx.rect(p.x, p.y, pixelsize, pixelsize);
			ctx.fill();
			ctx.stroke();
      	}

      	if (index < pixels.length) {
        	requestAnimationFrame(animate);
      	} else {
        	ctx.clearRect(0, 0, w, h);
        	visible = false;
        	running = false;
      }
	}

	requestAnimationFrame(animate);
}
</script>

{#if visible}
<canvas class="pixel-mask" bind:this={canvas}></canvas>	
{/if}

<style>
.pixel-mask {
	position: absolute;
    inset: 0;
    pointer-events: none;
}
</style>
