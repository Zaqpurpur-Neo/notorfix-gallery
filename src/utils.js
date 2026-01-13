export function preloadImage(url = "", onProgress = () => {}) {
	const img = new Image();
	let done = false;

	const finish = () => {
		if(done) return;
		done = true;

		onProgress();
	}

	img.src = url;

	if(img.complete) {
		finish()
	}

	return url;
}

function reactiveCounter(total, onDone, onProgress) {
	const state = new Proxy(
	{ loaded: 0 },
	{
	  set(target, prop, value) {
		target[prop] = value;

		if (prop === "loaded") {
		  const percent = Math.round((value / total) * 100);
		  onProgress?.(percent);

		  if (value === total) {
			onDone?.();
		  }
		}

		return true;
	  },
	}
  );

  return state;
}

export function preloadMultipleImage(
	urls = [], 
	{
		onProgress = (percent = 0) => {},
		onDone = (res) => {},
		onError = (msg) => {}
	}
) {
	const total = urls.length;
	let state = reactiveCounter(total, onDone, onProgress);

	try {
		for (const url of urls) {
			const img = new Image();

			img.onload = () => state.loaded++;
			img.onerror = () => state.loaded++; // fail-safe
			img.src = url;

			if (img.complete) {
			  state.loaded++;
			}
		  }
	} catch (error) {
		console.error("[Failed]: ", error.message);
		onError(error.message);
	}
}

export async function getContent() {
	try {
		const res = await fetch(
			"/api/content",
			{ cache: "reload" }
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
