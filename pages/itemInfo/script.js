import { categories, catalog, items, submit, swiper } from "/modules/functions"
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


let basket_items = []
let idd = location.search.split('=').at(-1) 
let car = false
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
let korzina = document.querySelector('.korzina')
let alert_btn = document.querySelector('.alert .right button')
let alert = document.querySelector('.alert')
let alert_img = document.querySelector('.alert .left img') 
let alert_title = document.querySelector('.alert .left .textik .title')
let moremoe = document.querySelector('.moremoe')
let colours_item = document.querySelector('.colors .colousrs')
let color_h4 = document.querySelector('.colors h4')
let right_title = document.querySelector('.rightyar .topi .topchik .title')
let plus = document.querySelector('.maain .colich .add .plus')
let summa = document.querySelector('.maain .add .summa')
let minus = document.querySelector('.maain .add .minus')
let sale_price = document.querySelector('.maain .pricik .sale')
let origg_price = document.querySelector('.maain .pricik .orig')
let rassrochka_badge = document.querySelector('.maain .rassrochka .badge')
let places = document.querySelectorAll('swiper-container')
let swip = document.querySelector('#swip')
let addd_btn = document.querySelector('.addd_btn')
let descr_h4 = document.querySelector('.descr h4')
let descr_img = document.querySelector('.descr img')
let rate = document.querySelector('.ocenka h4')
let otziv_btn = document.querySelector('.otziv_btn')
let descr_btn = document.querySelector('.descr_btn')
let descr = document.querySelector('.bar .descr')
let otz = document.querySelector('.bar .otzivi')
let container = document.querySelector('#container')
let way = document.querySelector('.way')

uzum_img.onclick = () => {
    location.assign('/')
}

otziv_btn.onclick = () => {
    descr_btn.classList.remove('activeto')
    otziv_btn.classList.add('activeto')
    descr.style.display = 'none'
    otz.style.display = 'flex'
}

descr_btn.onclick = () => {
    otziv_btn.classList.remove('activeto')
    descr_btn.classList.add('activeto')
    otz.style.display = 'none'
    descr.style.display = 'flex'
}

alert_btn.onclick = () => {
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
    location.assign('/pages/basket/')
}

getData('items')
.then(res => {
    for(let item of res){
        if(+item.id === +idd){
            let filtered = res.filter(el => {
                if(el.type === item.type && el.id !== idd){
                    return el
                }
            })  

            items(filtered.slice(0, 5), container)

            way.innerHTML = 'Главная / Все категории / ' + item.type + ' / ' + item.title.slice(0, 50)

            if(item.description.length === 0){
                descr_h4.innerHTML = 'Пусто'
            } else {
                descr_h4.innerHTML = item.description
            }
            let randomizer = Math.round(Math.random() * 1000)
            
            descr_img.src = item.media[1]
            rate.innerHTML = item.rating + ` (${randomizer} оценок)`

            swip.slidesPerView = item.media.length

            addd_btn.onclick = () => {
                alert.style.display = 'flex'
                alert.style.marginBottom = '0'
                alert_img.src = item.media[0]
                alert_title.innerHTML = item.title.slice(0, 30) + '...'
                setTimeout(() => {
                    alert.style.display = 'none'
                    alert.style.marginBottom = '500'
                }, 3000)
                basket_items.filter(el => el !== el)
                basket_items.push(item.id)
                patchData('users/' + user.id, {basket: basket_items})    
            }

            places.forEach(place => {
                swiper(item, place)
            })
            if(item.colors.length > 0){
                colours_item.innerHTML = ''
                for(let el of item.media.slice(0, item.colors.length)){

                    let img = document.createElement('img')
                       
                    img.src = el
                    
                    colours_item.append(img)
                }
            } else {
                color_h4.innerHTML = 'Цвет: отсутствует'
            }
            right_title.innerHTML = item.title.slice(0, 25) + '...'
                if(item.isBlackFriday){
                    origg_price.innerHTML = item.price + 'сум'
                    sale_price.innerHTML = Math.round(item.price / 100 * item.salePercentage) + ' сум'
                } else {
                    origg_price.innerHTML = ''
                    sale_price.innerHTML = item.price + 'сум'
                }
                rassrochka_badge.innerHTML = `от ${Math.round(item.price / 8)} сум/мес`
    
                plus.onclick = () => {
                    if(pr < 20){
                        pr++
                        summa.innerHTML = pr
                        if(item.isBlackFriday){
                            origg_price.innerHTML = ''
                            sale_price.innerHTML = Math.round(item.price / 100 * item.salePercentage) * pr + 'сум'
                        } else {
                            origg_price.innerHTML = ''
                            sale_price.innerHTML = item.price * pr + 'сум'
                        }
                    }
                }
                minus.onclick = () => {
                    if(pr >= 2){
                        pr--
                        summa.innerHTML = pr
                        if(item.isBlackFriday){
                            sale_price.innerHTML = Math.round(item.price / 100 * item.salePercentage) * pr + 'сум'
                        } else {
                            sale_price.innerHTML = item.price * pr + 'сум'
                        }
                    }
                }
        }
    }
})