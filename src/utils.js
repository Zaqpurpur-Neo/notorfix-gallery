export async function getContent() {
	try {
		const res = await fetch(
			"/api/content",
			{ cache: "force-cache" }
		)

		if (!res.ok) {
      		throw new Error(`HTTP error! status: ${res.status}`);
    	}
		
		return await res.json()
	} catch (err) {
		throw new Error(err.message)
	}
}

export function changeThumbnailResolution(url = "", res = 300) {
	return url.replace("&sz=w1000",`&sz=w${res}`)
}
