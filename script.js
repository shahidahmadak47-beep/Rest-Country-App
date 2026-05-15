let changemode = document.querySelector('.changemode');
const body = document.querySelector('body')
changemode.addEventListener('click', () => {
    console.log(body.classList.contains("light"))
    if (body.classList.contains("light")) {
        body.classList.remove('light')
        body.classList.add("dark")
        changemode.children[0].classList.replace("fa-moon", "fa-sun")
        changemode.children[1].innerHTML = "Light Mode"
    }
    else {
        body.classList.remove('dark')
        body.classList.add("light")
        changemode.children[0].classList.replace("fa-sun", "fa-moon")
        changemode.children[1].innerHTML = "Dark Mode"
    }
})

const filter = document.querySelector('.filter');

filter.addEventListener("click", () => {
    let filterlist = document.querySelector('.filterlist')
    filterlist.classList.toggle("hidden")
    let filterIcon = document.querySelector('.fa-sort-down')
    // if (filterlist.classList.contains("hidden")) {
    //     filterIcon.style.transform = 'rotate(90deg)'
    // }
    // else {
    //     filterIcon.style.transform = 'rotate(0deg)'
    // }

    filterlist.classList.contains("hidden") ? filterIcon.style.transform = 'rotate(90deg)' : filterIcon.style.transform = 'rotate(0deg)'
})

const toparrow = document.querySelector('.toparrow');

toparrow.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})


let page = 1;
const items = 16;
let country;
async function fetchCountry() {
    const res = await fetch('https://backend-projects-bqbd.onrender.com/api.restcountry/v3/all');
    const data = await res.json()
    console.log(data.results)
    if (data.results.length > 16) {
        document.querySelector('#pagination').classList.remove("hidden")
    }
    showCountry(data.results)
    country = data.results
}

window.addEventListener('load', fetchCountry)

let container = document.querySelector('.container')

function showCountry(array) {

    const strIdx = (page - 1) * items;
    const endIdx = page * items
    const newCountry = array.slice(strIdx, endIdx)
    container.innerHTML = ""
    newCountry.forEach((elm, i, arr) => {
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `<div><img src="${elm.flags.svg}" alt="loading..."></div>
            <h1>${elm.name.common}</h1>
            <p>Population: <span>${elm.population}</span></p>
            <p>Region: <span>${elm.region}</span></p>
            <p>Capital: <span>${elm.capital}</span></p>`
        container.appendChild(div)
    })

}

const prevBtn = document.querySelector("#prev")
if (page == 1) {
    prevBtn.disabled = true
}

const nextBtn = document.querySelector("#next");

nextBtn.addEventListener('click', () => {
    page++
    prevBtn.disabled = false
    showCountry(country)
    console.log(page)
})

prevBtn.addEventListener('click', () => {
    if (page > 1) {
        page--
        showCountry(country)
        console.log(page)
    }

})