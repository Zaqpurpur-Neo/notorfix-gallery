<script lang="ts">
import { getContent } from "./utils";
import { type Post } from ".";
import Card from "./components/Card.svelte";
import { sharedData } from "./store";

function randomize(arr: Array<Post>): Array<Post> {
	return arr.slice().sort(() => Math.random() - 0.5)
}

function sortByDate(arr: Array<Post>, mode: "asc" | "desc" = "desc"): Array<Post> {
	return arr.slice().sort((a, b) => {
		const ad = new Date(a.createdAt)
		const bd = new Date(b.createdAt)

		const asc = ad.getTime() - bd.getTime();
		const decs = bd.getTime() - ad.getTime();

		return mode === "asc" ? asc : decs;
	})
}

let direction: "asc" | "desc" = $state("desc");
let content = sortByDate($sharedData, "desc");

</script>

<section class="nav-sticky">
	<button class:selected={direction === "desc"} onclick={() => (direction = "desc")} class="nav-btn">LATEST</button>
	<button class:selected={direction === "asc"} onclick={() => (direction = "asc")} class="nav-btn">OLDEST</button>
</section>
<section class="content-section">
<ul class="content-items">
{#each content as item, index}
	<li style:order={direction === "desc" ? index : $sharedData.length - index}>
		<Card index={$sharedData.length - index} {...item} />
	</li>
{/each}
</ul>
</section>

<style>

.nav-sticky {
	position: sticky;
	top: 0;
	left: 0;
	width: 100%;
	padding: .75em;
	box-sizing: border-box;
	border: 1px solid #4f4f4f;
	background: #100c14;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: .5em;
	z-index: 4;
	border-left: none;
	border-right: none;
}

.nav-btn {
	font-family: 'Outfit', sans-serif;
	box-sizing: border-box;
	padding: .5em 2em;
	font-size: 1.2em;
	color: #efefef;
	background: none;
	border: 1px solid #4f4f4f;
	cursor: pointer;
}

.nav-btn:hover {
	background: var(--accent-3);
	border-color: var(--accent-3);
}

.nav-btn.selected {
	background: var(--accent-2);
	border-color: var(--accent-2);
}

.content-section {
	position: relative;
	height: auto;

	background-color: #100c14;
	opacity: 1;
	background-image: radial-gradient(#2e2638 1.15px, #100c14 1.15px);
	background-size: 40px 40px;
}

.content-items {
	list-style: none;
	display: grid;
	grid-auto-rows: auto;
}

@media (min-width: 600px) {
	.content-items { 
		grid-template-columns: repeat(2, 1fr); 
	}
}

@media (min-width: 900px) {
	.content-items { 
		grid-template-columns: repeat(3, 1fr); 
	}
}
</style>
