import { sharedData } from "./store.js";
import { getContent, preloadMultipleImage } from "./utils.js";

window.scrollTo(0, 0);

const loadingScreen = document.querySelector(".loading-screen")
const loadingText = loadingScreen.querySelector(".loading-text");

const data = await getContent();
data.forEach(item => {
	item.coverImageThumb = item.coverImage.replace(".webp", ".thumb.webp");
	item.contentsThumb = item.contents.map(it => ({...it, url: it.url.replace(".webp", ".thumb.webp")}))
})

sharedData.set(data);

const ig = data.map(item => 
	[item.coverImageThumb, item.contentsThumb.filter(it => it.order < 2).map(it => it.url)]
).flat(10);

preloadMultipleImage(ig, {
	onProgress: (percent) => {
		if(percent <= 100) loadingText.textContent = percent + "" + "%"
	},
	onDone: (img) => {
		document.body.style.setProperty("overflow", "unset")
		loadingScreen.classList.add("closed");
		
		import("./content.js");
	}
})

const maintence = false;

if(!maintence) {
	await import("./hero.js");
}
