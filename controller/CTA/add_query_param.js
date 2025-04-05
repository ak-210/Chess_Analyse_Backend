export function AddQueryParam(keyValPair) {
	var ans = "?"
	for(let key in keyValPair) {
		let val = keyValPair[key].replaceAll(" ", "%20")
		ans += `${key}=${val}`
	}
	return ans
}