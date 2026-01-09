export async function getContent() {
	const res = await fetch(
		process.env.WORKER_URL + "content",
		{ cache: "force-cache" }
	)

	if(!res.ok) throw new Error("Failed")
	return res.json()
}

export async function develGetContent() {
	const res = await fetch(
		"localhost:9980/data.json",
	)

	if(!res.ok) throw new Error("Failed")
	return res.json()
}
