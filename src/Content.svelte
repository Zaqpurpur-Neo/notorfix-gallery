<script lang="ts">
import { getContent } from "./utils";
import { type Post } from ".";
import Card from "./components/Card.svelte";

const data: Promise<Array<Post>> = getContent();

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

</script>

<section class="content-section">
{#await data}
	<h1>Loading</h1>
{:then value}
<ul class="content-items">
{#each sortByDate(value) as item, index}
	<li>
		<Card index={index} {...item} />
	</li>
{/each}
</ul>
{:catch err}
	<h3>Something Went Wrong!</h3>
	<p>{err.message}</p>
{/await}
</section>

<style>
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
