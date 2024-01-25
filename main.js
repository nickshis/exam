import { categories, catalog, items, filter, submit } from "./modules/functions"
import { category } from "./modules/db"
import { getData } from './modules/axios'
import { user } from "./modules/user-data"

let car = false
let form = document.forms.login
let form_inp = form.querySelector('input')
let categoriesPlace = document.querySelector('.categories_box')
let list = document.querySelector('.list')
let list_info = document.querySelector('.list_info')
let catalogg = document.querySelector('.catalog_btn')
let catalog_orig = document.querySelector('.catalog')
let container = document.querySelector('.container')
let rassrochka = document.querySelector('#rassrochka')
let sale = document.querySelector('#sale')
let popular = document.querySelector('#popular')
let list_cat = document.querySelectorAll('.main .container')
let delete_log = document.querySelector('.logins .delete')
let neag = document.querySelector('.neag')
let login_btn = document.querySelector('.login')
let log = document.querySelector('.logins')
let voyti = document.querySelector('.voyti')
let korzina = document.querySelector('.korzina')
let alertt = document.querySelector('.alert .right button')
let moremoe = document.querySelector('.moremoe')

alertt.onclick = () => {
    location.assign('/pages/basket/')
}


categories(category, categoriesPlace)

getData('items')
.then(res => catalog(category, list, res, list_info))

moremoe.onclick = () => {
    car = true
    setTimeout(() => {
        catalog_orig.style.opacity = '1'
    }, 300)
    catalog_orig.style.display = 'flex'
}

catalogg.onclick = () => {
    if(car){
        car = false
        catalog_orig.style.opacity = '0'
        setTimeout(() => {
            catalog_orig.style.display = 'none'
        }, 300)
    } else {
        car = true
        setTimeout(() => {
            catalog_orig.style.opacity = '1'
        }, 300)
        catalog_orig.style.display = 'flex'
    }
}


getData('items')
.then(res => items(res.slice(37, 42), container))

getData('items')
.then(res => {
    let filtered = res.filter(el => {
        if(!el.isBlackFriday){
            return el
        }
    })

    items(filtered.slice(12, 17), rassrochka)
})

getData('items')
.then(res => {
    let filtered = res.filter(el => {
        if(el.isBlackFriday){
            return el
        }
    })

    items(filtered.slice(0, 15), sale)
})

getData('items')
.then(res => {
    let filtered = res.filter(el => {
        if(el.rating >= 5){
            return el
        }
    })

    items(filtered.slice(0, 15), popular)
})

getData('items')
.then(res => { 
    filter(res, list_cat, 'Мебель')
})

getData('items')
.then(res => { 
    filter(res, list_cat, 'Компьютеры')
})

getData('items')
.then(res => { 
    filter(res, list_cat, 'Аудио')
})

getData('items')
.then(res => { 
    filter(res, list_cat, 'Телевизоры')
})

getData('items')
.then(res => { 
    filter(res, list_cat, 'Кухня')
})


login_btn.onclick = () => {
    if(voyti.innerHTML.length > 1){
        neag.style.display = 'flex'
        log.style.display = 'flex'
    } 
}

if(user){
    voyti.innerHTML = ""
}

delete_log.onclick = () => {
    neag.style.display = 'none'
    log.style.display = 'none'
}

let regexNum = /^\+998([- ])?(90|91|93|94|95|98|99|33|97|71)([- ])?(\d{3})([- ])?(\d{2})([- ])?(\d{2})$/

form.onsubmit = (e) => {
    e.preventDefault()

    let error = false

    if(regexNum.test(form_inp.value)){
        error = true
        form_inp.style.border = 'none'
    } else {
        error = false
        form_inp.style.border = '2px solid red'
    }

    if(error){
        submit(form)
        neag.style.display = 'none'
        log.style.display = 'none'
    }
}

korzina.onclick = () => {
    if(user){
        location.assign('/pages/basket/')
    } else {
        alert('Зарегистрируйтесь или Войдите')
    }
}