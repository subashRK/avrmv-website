const hiddenEls = document.querySelectorAll(".hidden")
const linksContainerToggler = document.querySelector(".navbar .toggle")
const linksContainer = document.querySelector(".links")
const cardsContainer = document.querySelector("#events .container")
const moverEls = document.querySelectorAll(".mover")

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
  linksContainerToggler.classList.toggle("close")
}

function scrollEvent(e) {
  dir = e.target.dataset.dir

  cardsContainer.scrollBy({
    behavior: "smooth",
    left: dir === "right" ? 1 : -1,
  })
}

linksContainerToggler.onclick = toggleLinksContainer

moverEls.forEach(mover => (mover.onclick = scrollEvent))
