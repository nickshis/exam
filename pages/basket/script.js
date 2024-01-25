import { categories, catalog, submit, basket_box, items } from "/modules/functions"
import { category } from "/modules/db"
import { getData } from '/modules/axios'
import { user } from "../../modules/user-data"
import { filter } from "/modules/functions"

let car = false
let tbody = document.querySelector('.tbody')
let form = document.forms.login
let form_inp = form.querySelector('input')
let uzum_img= document.querySelector('.uzum_img')
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
let checkbox = document.querySelector('.left .up .leftt .input')
let box_main = document.querySelector('.boxesss')
let contaner = document.querySelector('#container')
let sticky = document.querySelector('.main')
let sticky_lef = document.querySelector('.main .all .left')
let con = document.querySelector('#con')
let abc = document.querySelector('.abc')
let dostavim = document.querySelectorAll('.dostavim')
let h4h = document.querySelector('.mid .text h4')
let h5h = document.querySelector('.mid .text h5')
let pul = document.querySelector('.econom h3')
let eco = document.querySelector('.econom h5')
let koka = document.querySelector('.koka')
let kola =  document.querySelector('.kola')
let prog = document.querySelector('.progress .prog')
let moremoe = document.querySelector('.more')
let checkror = true

uzum_img.onclick = () => {
    location.assign('/')
}

dostavim.forEach(el => {
    el.innerHTML = (new Date().getDate() + 1) + ' января (Завтра)'
})


setInterval(() => {
    let style = window.getComputedStyle(sticky_lef)

    sticky.style.height = style.height
}, 100)

checkbox.onclick = () => {
    if(checkror){
        checkror = false
        checkbox.style.border = '2px solid gray'
        checkbox.style.background = 'none'
        checkbox.innerHTML = ''
    } else {
        checkror = true
        checkbox.style.border = 'none'
        checkbox.style.backgroundColor = '#7000FF'
        checkbox.innerHTML = '✓'
    }
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

getData('users/' + user.id)
.then(res => basket_box(res.basket, box_main))

getData('items')
.then(res => {
    let rnd = Math.random() * 45

    items(res.slice(rnd, rnd + 5), contaner)
})

getData('items')
.then(res => {
    let rnd = Math.random() * 45

    items(res.slice(rnd, rnd + 5), con)
})

getData('users/' + user.id)
.then(res => {
    if(res.basket.length <= 1){
        tbody.style.marginTop = '300px'
    } else if(res.basket.length === 0){
        tbody.style.marginTop = '0px'
        box_main.innerHTML = ''
        box_main.innerHTML =  `<div class="wow">У вас нет ничего в корзинe</div>`
    } else if(res.basket.length > 1){
        tbody.style.marginTop = '0px'
    }
    let per = 0
    let cur = 0
    let cyr = 0
    abc.innerHTML = res.basket.length
    h4h.innerHTML = `Товары (${res.basket.length}):`
    
    getData('items')
    .then(ros => {
        for(let i of ros){
            for(let item of res.basket){
                if(i.id === item){
                    if(i.isBlackFriday){
                        cur += Math.round(i.price / 100 * i.salePercentage)
                        h5h.innerHTML = cur + ' сум'
                        pul.innerHTML = cur + ' сум'
                    } else {
                        cur += i.price 
                        h5h.innerHTML = cur + ' сум'
                        pul.innerHTML = cur + ' сум'
                    }
                    cyr += i.price
                    eco.innerHTML = `Вы экономите ${cyr - cur} сум`

                    if(res.basket.length === 0){
                        koka.innerHTML = 'Выберите хотя бы 1 товар'
                        kola.innerHTML = 'Отметьте товары, которые вы хотите оформить в один заказ'
                    } else if(res.basket.length > 0 && cur < 100000){
                        koka.innerHTML = 'Бесплатно доставим в пункт выдачи'
                        kola.innerHTML = `Осталось ${100000 - cur} сум до бесплатной доставки курьером`
                    } else if(cur > 100000){
                        koka.innerHTML = 'Бесплатно доставим в пункт выдачи'
                        kola.innerHTML = ''
                    } else if(cur < 20000){
                        koka.innerHTML = 'Минимальная сумма заказа 20 000 сум'
                        kola.innerHTML = `Осталось ${20000 - cur} сум до бесплатной доставки в пункт выдачи`
                    }

                    if(cur < 100000){
                        per = cur / 1000
                        prog.style.width = per + '%'  
                    } else {
                        prog.style.width = '100%'
                    }
                }
            }
        }
    })
})
