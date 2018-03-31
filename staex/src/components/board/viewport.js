export default function viewport() {
	const w = window
	const d = document
	const e = d.documentElement
	const b = d.getElementsByTagName('body')[0]
	const width = w.innerWidth || e.clientWidth || b.clientWidth
	const height = w.innerHeight|| e.clientHeight|| b.clientHeight
	return { width, height }
}
