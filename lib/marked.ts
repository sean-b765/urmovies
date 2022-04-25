import { marked } from 'marked'

const renderer = new marked.Renderer()

renderer.link = function (href, title, text) {
	return `<a>${text}</a>`
}
renderer.code = function (code, lang, isEscaped) {
	return code
}
// Since marked will parse <html tags>, we need to exclude these! This allows for <script> tags to be parsed
//  This is different from setting sanitize: true in options, as this will remove the wrapping <tag> but keep the inner text
renderer.html = function (html) {
	return ''
}

export default renderer
