const hiddenEls = document.querySelectorAll(".hidden")
const linksContainerToggler = document.querySelector(".navbar .toggle")
const linksContainer = document.querySelector(".navbar .links")
const cardsContainer = document.querySelector("#events .container")
const moverEls = document.querySelectorAll(".mover")
const subContainerToggler = document.querySelector("#contact .toggle")
const subContainer = document.querySelector("#contact .sub-container")
const galleryContainer = document.querySelector("#gallery .container")

const observer = new IntersectionObserver(showHiddenEls)
hiddenEls.forEach(el => observer.observe(el))

function showHiddenEls(els) {
  els.forEach(item => {
    el = item.target

    if (el.classList.contains("bottom")) {
      const client = el.getBoundingClientRect()

      if (!item.isIntersecting && client.bottom <= 0)
        return el.classList.toggle("show", true)
      return el.classList.toggle("show", item.isIntersecting)
    }

    el.classList.toggle("show", item.isIntersecting)
  })
}

function toggleLinksContainer() {
  linksContainer.classList.toggle("open")
  linksContainerToggler.classList.contains("close")
    ? linksContainerToggler.classList.remove("close")
    : linksContainerToggler.classList.add("close")
}

function scrollEvent(e) {
  const toRight = e.target.dataset.dir === "right"
  const isGallery = e.target.parentElement.id === "gallery"
  const container = isGallery ? galleryContainer : cardsContainer
  const scrollByValue = container.firstElementChild.offsetWidth

  if (isGallery) handleGalleryChange(toRight)

  container.scrollBy({
    behavior: "smooth",
    left: toRight ? scrollByValue : -scrollByValue,
  })
}

linksContainerToggler.onclick = toggleLinksContainer
linksContainer.onclick = e => {
  if (e.target.localName !== "a") return
  toggleLinksContainer()
}

moverEls.forEach(mover => (mover.onclick = scrollEvent))

subContainerToggler.onclick = () => {
  subContainerToggler.classList.toggle("rotate")
  subContainer.classList.toggle("show")
}

// Gallery logic
requestAnimationFrame(moveToCenter) // moves the image when the windows is ready to paint, DOMLoadedevent and readystatechange events didn't work.

function moveToCenter() {
  const centerEl = document.querySelector("#gallery .container img.center")
  const index = Array.from(galleryContainer.children).indexOf(centerEl)

  galleryContainer.scrollTo({
    behavior: "smooth",
    left: centerEl.offsetWidth * index,
  })
}

function handleGalleryChange(toRight) {
  const currentCenterEl = document.querySelector(
    "#gallery .container img.center"
  )
  const nextEl = toRight
    ? currentCenterEl.nextElementSibling
    : currentCenterEl.previousElementSibling
  const { firstElementChild, lastElementChild } = galleryContainer

  // Make sure to use first/lastElementChild instead of first/lastChild, the latter returns event text and comments if they are the first child
  if (toRight && nextEl === lastElementChild) {
    galleryContainer.appendChild(firstElementChild)
  } else if (!toRight && nextEl == firstElementChild) {
    galleryContainer.prepend(lastElementChild)
  }

  currentCenterEl.classList.toggle("center", false)
  nextEl.classList.toggle("center", true)
}
