/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"DeTweLwYIFLKkjU3","label":"Dev","bookmarks":[{"id":"ukLYseQo3a6E53xL","label":"Github","url":"https://github.com/soma-code"},{"id":"5bGvGJj8Il27o4Y5","label":"Deno","url":"https://console.deno.com/"},{"id":"eeU8JoDtGAXp0yf3","label":"Cloudflare","url":"https://dash.cloudflare.com/"},{"id":"ZHLq0HYyDnWihfat","label":"Google Cloud","url":"https://console.cloud.google.com"}]},{"id":"u6WOYQNlcPhwPCGo","label":"Design","bookmarks":[{"id":"q29iU42yQ97wjHRP","label":"Image/Gif Editor","url":"https://www.canva.com/create/"},{"id":"8DOL5VAssXfNh0VQ","label":"Tokyo Night","url":"https://wixdaq.github.io/Tokyo-Night-Website/index.html"},{"id":"rG604vMzvJPiNASs","label":"Lospec","url":"https://lospec.com"},{"id":"h6d25O4AwznzgCqL","label":"Gradients","url":"https://grabient.com"}]},{"id":"ibI8keyBJQOqXCOv","label":"SOMA","bookmarks":[{"id":"lBLNn1LndcV6UsCl","label":"Portfolio","url":"https://soma3d.org"},{"id":"XIZ987WlKoRVumfV","label":"Artstation","url":"https://www.artstation.com/soma3d"},{"id":"9yPiuTorRfL5olrz","label":"Linkedin","url":"https://www.linkedin.com/in/soma3d/"},{"id":"dyfBL5DOpnyC4AiE","label":"Itch","url":"https://soma-dev.itch.io"}]},{"id":"TabltBHuNoOWQmWd","label":"News","bookmarks":[{"id":"uMNinw4OXOmbRRLS","label":"Google","url":"https://news.google.com"},{"id":"Q7mlJtehYBVooJeS","label":"Rock Paper Shotgun","url":"https://www.rockpapershotgun.com"},{"id":"3Prj3nS0HaNZzfzh","label":"Techradar","url":"https://www.techradar.com"},{"id":"XWmJrMyqHEJ1gFbD","label":"Torrent Freak","url":"https://torrentfreak.com"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
