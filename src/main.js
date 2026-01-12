import { sharedData } from "./store.js";
import { getContent } from "./utils.js";

const data = await getContent();
sharedData.set(data)

const maintence = false;

if(!maintence) {
	await import("./content.js");
}
