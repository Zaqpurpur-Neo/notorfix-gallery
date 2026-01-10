<script lang="ts">
import { getContent } from "./utils";
import { type Post } from ".";
import Card from "./components/Card.svelte";

const data: Promise<Array<Post>> = getContent();

</script>

<section class="content-section">
{#await data}
	<h1>Loading</h1>
{:then value}
<ul class="content-items">
{#each value.reverse() as item, index}
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
}

.content-items {
	list-style: none;
	display: grid;
}

@media (min-width: 600px) {
	.content-items { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 900px) {
	.content-items { grid-template-columns: repeat(3, 1fr); }
}
</style>
