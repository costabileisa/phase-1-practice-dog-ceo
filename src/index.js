console.log('%c HI', 'color: firebrick');
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const breedsList = [];
let breedsElement;

// on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchImages()
    fetchBreeds()
    filter()

    document.addEventListener("mouseover", event => style(event, "cursor", "pointer"))
    document.addEventListener("mouseout", event => style(event, "cursor", ""))
    document.addEventListener("click", event => style(event, "color", "#ffd1dc"))
})

function style(element, style, value) {
    const target = element.target
    if (target.tagName === "LI") {
        target.style[style] = value
    }
}

function fetchImages() {
    // fetches images
    fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
        // add images to page
        const imgsContainer = document.getElementById("dog-image-container");
        data.message.forEach(element => {
            let img = document.createElement("img");
            img.src = element;
            imgsContainer.append(img);
        })
    });
}

function listBreeds(breedName) {
    let li = document.createElement("li");
    li.id = breedName;
    li.innerHTML = breedName;
    breedsElement.append(li);
}

function fetchBreeds() {
    // fetches breeds
    fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
        breedsElement = document.getElementById("dog-breeds");
        // for each breed, add the name to the ul
        const keys = Object.keys(data.message)
        keys.forEach(element => {
            listBreeds(element)
            breedsList.push(element);
        })
    })
}

function filter() {
    const dropdownMenu = document.getElementById("breed-dropdown");
    // listen for a change to the dropdown menu
    dropdownMenu.addEventListener("change", change => {
        const changeValue = change.target.value.toLowerCase();

        const filtered = breedsList.filter(name => {
            if (changeValue === "-") {
                return name;
            } else {
                return name.toLowerCase().startsWith(changeValue)
            }
        })

        // reset the ul
        breedsElement.innerHTML = "";
        // add all the breed names that match the filter
        filtered.forEach(element => listBreeds(element))
    })
}