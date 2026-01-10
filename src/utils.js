export async function getContent() {
	const res = await fetch(
		"/api/content",
		{ cache: "force-cache" }
	)

	if(!res.ok) throw new Error("Failed")
	return res.json()
}

export function changeThumbnailResolution(url = "", res = 300) {
	return url.replace("&sz=w1000",`&sz=w${res}`)
}
