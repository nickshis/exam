import { categories, catalog, items, submit, catalogPage } from "/modules/functions"
import { category } from "/modules/db"
import { getData, patchData } from '/modules/axios'
import { user } from "/modules/user-data"

if(user){
    getData('users/' + user.id)
    .then(res => {
        for(let item of res.basket){
            basket_items.push(item)
        }
    })
}

/// black orange blue green red grey white brown

let basket_items = []
let idd = location.search.split('=').at(-1) 
let car = false
let form = document.forms.login
let form_inp = form.querySelector('input')
let uzum_img = document.querySelector('.uzum_img')
let categoriesPlace = document.querySelector('.categories_box')
let list = document.querySelector('.list')
let list_info = document.querySelector('.list_info')
let catalogg = document.querySelector('.catalog_btn')
let catalog_orig = document.querySelector('.catalog')
let delete_log = document.querySelector('.logins .delete')
let neag = document.querySelector('.neag')
let login_btn = document.querySelector('.login')
let log = document.querySelector('.logins')
let voyti = document.querySelector('.voyti')
let korzina = document.querySelector('.korzina')
let alert_btn = document.querySelector('.alert .right button')
let moremoe = document.querySelector('.moremoe')
let way = document.querySelector('.way')
let container = document.querySelector('#container')
let c = document.querySelector('.c')

uzum_img.onclick = () => {
    location.assign('/')
}


alert_btn.onclick = () => {
    location.assign('/pages/basket/')
}


catalogPage(container, idd)


getData('items')
.then(res => {
    for(let item of res){
        for(let i of category){
            if(+i.id === +idd){
                if(i.title === item.type){
                    way.innerHTML = 'Главная / Все категории / ' + item.type
                    c.innerHTML = item.type
                }
            } else {
                way.innerHTML = 'Главная / Все категории '
                c.innerHTML = 'Все категории'
            }
        }
    }
})


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

login_btn.onclick = () => {
    if(voyti.innerHTML.length > 1){
        neag.style.display = 'flex'
        log.style.display = 'flex'
    } else {
        localStorage.removeItem('user')
        location.reload()
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
    location.assign('/pages/basket/')
}

