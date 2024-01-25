import { getData, patchData, postData } from "./axios"
import { category } from "./db"
import { user } from "./user-data"


if(user){
    getData('users/' + user.id)
    .then(res => {
        for(let item of res.basket){
            basket_items.push(item)
        }
    })
}

let basket_items = []
let form = document.forms.otdo
let abc = document.querySelector('.abc')
let tbody = document.querySelector('.tbody')
// let dostavim = document.querySelectorAll('.dostavim')
let h4h = document.querySelector('.mid .text h4')
let h5h = document.querySelector('.mid .text h5')
let pul = document.querySelector('.econom h3')
let eco = document.querySelector('.econom h5')
let koka = document.querySelector('.koka')
let kola =  document.querySelector('.kola')
let prog = document.querySelector('.progress .prog')
let colours_item = document.querySelector('.colours')
let left_img = document.querySelector('.add_basket .left img')
let right_title = document.querySelector('.right .topi .title')
let neag = document.querySelector('.neag')
let add_basket = document.querySelector('.add_basket')
let delete_btn = document.querySelector('.deletik')
let plus = document.querySelector('.add .plus')
let summa = document.querySelector('.add .summa')
let minus = document.querySelector('.add .minus') 
let sale_price = document.querySelector('.pricik .sale')
let origg_price = document.querySelector('.pricik .orig')
let rassrochka_badge = document.querySelector('.rassrochka .badge')
let alertt = document.querySelector('.alert')
let alert_img = document.querySelector('.alert .left img') 
let alert_title = document.querySelector('.alert .left .textik .title')
let voyti = document.querySelector('.voyti')
let box_main = document.querySelector('.boxesss')
let add_btn = document.querySelector('.add_btn')
let color_h4 = document.querySelector('color h4')
let colorses = document.querySelectorAll('.colorses .colorr div')
let categories_boxik = document.querySelector('.cat_ory')
let kit_kat1 = document.querySelector('.cat_ory h4')
let clear = document.querySelector('.clear')
let select = document.querySelector('.select')
let ot = document.querySelector('.ot')
let doo = document.querySelector('.do')

export function categories(arr, place){
    for(let item of arr){
        let all = document.createElement('div')
        let h4 = document.createElement('h4')
        let line = document.createElement('div')

        line.classList.add('linee')
        
        h4.innerHTML = item.title

        all.append(h4, line)
        place.append(all)

        all.onmouseenter = () => {
            h4.style.color = 'black'
            line.style.width = '100%'
            all.onmouseleave = () => {
                h4.style.color = 'gray'
                line.style.width = '0%'
            }
        }
    }
}


export function items(arr, place){
    place.innerHTML = ""
    if(arr.length !== 0){
        for(let item of arr){
            let main = document.createElement('div')
            let img = document.createElement('div')
            let liked = document.createElement('img')
            let down = document.createElement('div')
            let title = document.createElement('h5')
            let star_div = document.createElement('div')
            let star = document.createElement('img')
            let text_star = document.createElement('h5')
            let price_badge = document.createElement('h5')
            let orig_priceDiv = document.createElement('div')
            let down_down = document.createElement('div')
            let orig_price = document.createElement('h5')
            let sale = document.createElement('h4')
            let basket = document.createElement('div')
            let basket_img = document.createElement('img')
    
            main.classList.add('item_main')
            down.classList.add('item_down')
            img.classList.add('item_img')
            star_div.classList.add('item_star_div')
            price_badge.classList.add('item_price_badge')
            down_down.classList.add('item_down_down')
            orig_priceDiv.classList.add('item_orig_price')
            basket.classList.add('item_basket')
    
            title.innerHTML = item.title.slice(0, 70) + '...'
            text_star.innerHTML = item.rating + ' ' + `(${Math.round(+item.rating * 1000)}) голосов`
            price_badge.innerHTML = `${Math.round(item.price / 8)}сум/мес`
            if(item.isBlackFriday){
                orig_price.innerHTML = item.price + ' сум'
                sale.innerHTML = Math.round(item.price / 100 * item.salePercentage) + ' сум'
            } else {
                sale.innerHTML = item.price + ' сум'
            }
    
            img.style.backgroundImage = `url(${item.media[0]})`
            star.src = 'https://icon-icons.com/icons2/894/PNG/512/Star_Gold_icon-icons.com_69141.png'
            basket_img.src = '/public/shopping-bag (2).svg'
            liked.src = 'https://webstockreview.net/images/hearts-vector-png-7.png'
    
            // liked active https://grizly.club/uploads/posts/2022-12/1670948951_grizly-club-p-chernoe-serdtse-png-30.png
    
            main.append(img, down)
            img.append(liked)
            down.append(title, star_div, price_badge, down_down)
            star_div.append(star, text_star)
            orig_priceDiv.append(orig_price, sale)
            down_down.append(orig_priceDiv, basket)
            basket.append(basket_img)
            place.append(main)
    
            img.onclick = () => {
                location.assign('/pages/itemInfo/?id=' + item.id)
            }
            
            let o = 0
            img.onmouseenter = () => {
                if(item.media.length > 1){
                    if(o >= item.media.length - 1){
                        o = 0
                    } else {
                        o++
                    }
                    img.style.backgroundImage = `url('${item.media[o]}')`    
                }
                img.onmouseout = () => {
                    if(item.media.length > 1){
                        if(o >= item.media.length - 1){
                            o = 0
                        } else {
                            o++
                        }
                        img.style.backgroundImage = `url('${item.media[o]}')`    
                    }   
                }
            }
            basket.onclick = () => {
                if(user){
                    if(item.colors.length > 1){
                        add_btn.onclick = () => {
                            getData('users/' + user.id)
                            .then(res => {
                                if(res.basket.length <= 1){
                                    tbody.style.marginTop = '300px'
                                } else if(res.basket.length === 0){
                                    tbody.style.marginTop = '0px'
                                    box_main.innerHTML = ''
                                    box_main.innerHTML =  `<div class="wow">У вас нет ничего в корзина</div>`
                                } else if(res.basket.length > 1){
                                    tbody.style.marginTop = '0px'
                                }
                            })
                            basket_items.filter(el => el !== el)
                            basket_items.push(item.id)
                            patchData('users/' + user.id, {basket: basket_items})
                            getData('users/' + user.id)
                            .then(res => basket_box(res.basket, box_main))
                            neag.style.display = 'none'
                            add_basket.style.display = 'none'
                        }
                        let pr = 1
                        neag.style.display = 'flex'
                        add_basket.style.display = 'flex'
                        left_img.src = item.media[0]  
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
                        if(item.colors.length > 0){
                            colours_item.innerHTML = ''
                            for(let el of item.media.slice(0, item.colors.length)){
            
                                let img = document.createElement('img')
                                   
                                img.src = el
                                
                                colours_item.append(img)
            
                                img.onclick = () => {
                                    left_img.src = el
                                }
                            }
                        } else {
                            color_h4.innerHTML = 'Цвет: отсутствует'
                        }
                        delete_btn.onclick = () => {
                            neag.style.display = 'none'
                            add_basket.style.display = 'none'
                        }
                    } else {
                        alertt.style.display = 'flex'
                        alertt.style.marginBottom = '0'
                        alert_img.src = item.media[0]
                        alert_title.innerHTML = item.title.slice(0, 30) + '...'
                        setTimeout(() => {
                            alertt.style.display = 'none'
                            alertt.style.marginBottom = '500'
                        }, 3000)
                        basket_items.filter(el => el !== el)
                        basket_items.push(item.id)
                        patchData('users/' + user.id, {basket: basket_items})
                        .then(ros => {
                            getData('users/' + user.id)
                            .then(res => {
                                basket_box(res.basket, box_main)
                                if(res.basket.length <= 1){
                                    tbody.style.marginTop = '300px'
                                } else if(res.basket.length === 0){
                                    tbody.style.marginTop = '0px'
                                    box_main.innerHTML = ''
                                    box_main.innerHTML =  `<div class="wow">У вас нет ничего в корзина</div>`
                                } else if(res.basket.length > 1){
                                    tbody.style.marginTop = '0px'
                                }
                            })
                        })
                    }
                } else {
                    alert('Зарегистрируйтесь или Войдите')
                }
    
            }
    
        }
    } else {
        place.innerHTML = `<h1>Ничего не нашлось(</h1>`
    }
}

export function catalog(arr, place, arr2, place2){
    for(let item of arr){
        let all = document.createElement('div')
        let div = document.createElement('div')
        let image = document.createElement('img')
        let h4 = document.createElement('h4')
        let img = document.createElement('img')

        all.classList.add('always')
        img.classList.add('chevron')

        h4.innerHTML = item.title

        image.src = item.image
        img.src = '/public/chevron-down.svg'

        div.append(image, h4)
        all.append(div, img)
        place.append(all)
        
        all.onmouseenter = () => {
            let filtered = arr2.filter(el => {
                if(el.type === item.title){
                    return el
                }
            })
            catalogInfo(filtered, place2)
        }
    }   
}


export function catalogInfo(arr, place){
    place.innerHTML = ""

    let main = document.createElement('div')
    let cat_div = document.createElement('div')
    let categorys = document.createElement('h1')
    let img = document.createElement('img')
    
    main.classList.add('main-blochek')

    categorys.innerHTML = arr[0].type 

    img.src = '/public/chevron-down.svg'

    for(let i of arr){
        let title = document.createElement('h5')
        
        title.innerHTML = i.title.slice(0, 50) + '...'  
        
        main.append(title)

        title.onclick = () => {
            location.assign('/pages/itemInfo/?id=' + i.id)
        }
    }

    cat_div.append(categorys, img)
    place.append(cat_div, main)

    cat_div.onclick = () => {
        category.forEach(el => {
            if(el.title === arr[0].type){
                location.assign('/pages/catalogPage/?id=' + el.id)
            }
        })
    }
}

export function filter(arr, place, value){
    let filtered = arr.filter(el => {
        if(el.type === value){
            return el
        }
    })

    place.forEach(elem => {
        let key = elem.getAttribute('data-cat')
        if(key === filtered[0].type){
            items(filtered, elem)
        }
    })
}

export function submit(form) {
    let user = {
        id: Math.random(),
        liked: [],
        basket: []
    };

    let fm = new FormData(form);

    fm.forEach((value, key) => {
        user[key] = value;
    });

    getData('users')
    .then(res => {
        if(res.length !== 0){
            for(let item of res){
                if(item.number === user.number){
                    voyti.innerHTML = ''
                    localStorage.setItem('user', JSON.stringify(user))
                } else {
                    postData('users', user)
                    voyti.innerHTML = ''
                    localStorage.setItem('user', JSON.stringify(user))
                }
            }
        } else {
            postData('users', user)
            voyti.innerHTML = ''
            localStorage.setItem('user', JSON.stringify(user))
        }
    })
}    

export function basket_box(arr, place){
    let checkror = true
    let pr = 1
    place.innerHTML = ''
    getData('items')
    .then(ros => {
        for(let i of ros){
            for(let item of arr){
                if(i.id === item){
                    let main = document.createElement('div')
                    let checkbox = document.createElement('div')
                    let imgik = document.createElement('div')
                    let img = document.createElement('img')
                    let left = document.createElement('div')
                    let right = document.createElement('div')
                    let up = document.createElement('h4')
                    let down = document.createElement('div')
                    let down_text = document.createElement('h4')
                    let plus_minus = document.createElement('div')
                    let plus = document.createElement('h2')
                    let minus = document.createElement('h2')
                    let colich = document.createElement('h2')
                    let right_trash = document.createElement('div')
                    let trash_img = document.createElement('img')
                    let trash_text = document.createElement('h4')
                    let price = document.createElement('div')
                    let price_sale = document.createElement('h2')
                    let price_orig = document.createElement('h3')
            
                    main.classList.add('basket_box_main')
                    checkbox.classList.add('check')
                    left.classList.add('leftik')
                    right.classList.add('rightik')
                    up.classList.add('upp')
                    down.classList.add('downn')
                    right_trash.classList.add('trashsh')
                    price.classList.add('pricece')
                    imgik.classList.add('imgik')
                    colich.style.fontSize = '15px'
                    colich.style.color = 'black'
                    plus.style.cursor = 'pointer'
                    minus.style.cursor = 'pointer'
            
                    checkbox.innerHTML = '✓'
                    up.innerHTML = i.title.slice(0, 100) + '...'
                    if(i.colors.length > 0){
                        down_text.innerHTML = 'Цвет: ' + i.colors[0]
                    }
                    plus.innerHTML = '+'
                    minus.innerHTML = '-'
                    colich.innerHTML = '1'
                    trash_text.innerHTML = 'Удалить'
                    if(i.isBlackFriday){
                        price_sale.innerHTML = Math.round(i.price / 100 * i.salePercentage) + 'сум'
                        price_orig.innerHTML = i.price + 'сум'
                    } else {
                        price_sale.innerHTML = i.price + 'сум'
                    }
            
                    trash_img.src = '/public/trash-2 (3).svg'
                    img.src = i.media[0]
            
                    main.append(checkbox, imgik, left, right)
                    imgik.append(img)
                    left.append(up, down)
                    right.append(right_trash, price)
                    down.append(down_text, plus_minus)
                    right_trash.append(trash_img, trash_text)
                    price.append(price_sale, price_orig)
                    plus_minus.append(minus, colich, plus)
                    place.append(main)
            
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

                    plus.onclick = () => {
                        if(pr <= 20)
                        pr++
                        colich.innerHTML = pr
                        if(i.isBlackFriday){
                            price_sale.innerHTML = Math.round(i.price / 100 * i.salePercentage) * pr + 'сум'
                            price_orig.innerHTML = i.price * pr + 'сум'
                        } else {
                            price_sale.innerHTML = i.price * pr + 'сум'
                        }
                        let per = 0
                        let cur = 0
                        let cyr = 0
                            for(let ig of ros){
                                if(ig.id === i.id){
                                    if(ig.isBlackFriday){
                                        cur += Math.round(ig.price / 100 * ig.salePercentage) * pr
                                        h5h.innerHTML = cur + ' сум'
                                        pul.innerHTML = cur + ' сум'
                                    } else {
                                        cur += ig.price * pr
                                        h5h.innerHTML = cur + ' сум'
                                        pul.innerHTML = cur + ' сум'
                                    }
                                    cyr += ig.price
                                    eco.innerHTML = `Вы экономите ${cyr - cur} сум`
                                    
                                    getData('users/' + user.id)
                                    .then(re => {
                                        if(re.basket.length === 0){
                                            koka.innerHTML = 'Выберите хотя бы 1 товар'
                                            kola.innerHTML = 'Отметьте товары, которые вы хотите оформить в один заказ'
                                        } else if(re.basket.length > 0 && cur < 100000){
                                            koka.innerHTML = 'Бесплатно доставим в пункт выдачи'
                                            kola.innerHTML = `Осталось ${100000 - cur} сум до бесплатной доставки курьером`
                                        } else if(cur > 100000){
                                            koka.innerHTML = 'Бесплатно доставим в пункт выдачи'
                                            kola.innerHTML = ''
                                        } else if(cur < 20000){
                                            koka.innerHTML = 'Минимальная сумма заказа 20 000 сум'
                                            kola.innerHTML = `Осталось ${20000 - cur} сум до бесплатной доставки в пункт выдачи`
                                        }
                                    })
                        
                                    if(cur < 100000){
                                        per = cur / 1000
                                        prog.style.width = per + '%'  
                                    } else {
                                        prog.style.width = '100%'
                                    }
                                }
                            }
                    }

                    minus.onclick = () => {
                        if(pr > 1){
                            pr--
                            colich.innerHTML = pr
                            if(i.isBlackFriday){
                                price_sale.innerHTML = Math.round(i.price / 100 * i.salePercentage * pr) + 'сум'
                                price_orig.innerHTML = i.price * pr + 'сум'
                            } else {
                                price_sale.innerHTML = i.price * pr + 'сум'
                            }
                            getData('users/' + user.id)
                            .then(res => {
                                let per = 0
                                let cur = 0
                                let cyr = 0
                                getData('items')
                                .then(ros => {
                                    for(let i of ros){
                                        for(let item of res.basket){
                                            if(i.id === item){
                                                if(i.isBlackFriday){
                                                    cur += Math.round(i.price / 100 * i.salePercentage) * pr
                                                    h5h.innerHTML = cur + ' сум'
                                                    pul.innerHTML = cur + ' сум'
                                                } else {
                                                    cur += i.price * pr
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
                        }
                    }

                    right_trash.onclick = () => {
                        getData('users/' + user.id)
                        .then(res => {
                            let ochistka = res.basket.filter(el => {
                                if(el !== i.id){
                                    return el
                                }
                            })
                            main.remove()
                            patchData('users/' + user.id, {basket: ochistka})
                            
                            if(res.basket.length <= 1){
                                tbody.style.marginTop = '300px'
                            } else if(res.basket.length === 0){
                                tbody.style.marginTop = '0px'
                                box_main.innerHTML = ''
                                box_main.innerHTML =  `<div class="wow">У вас нет ничего в корзина</div>`
                            } else if(res.basket.length > 1){
                                tbody.style.marginTop = '0px'
                            }

                            // if(res.basket.length === 0){
                            //     main.style.display = 'none'
                            //     main.innerHTML = `У вас нет ничего в корзине <br> :/`
                            //     main.classList.add('pusto')
                            //     console.log('work');
                            // }
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
                    }
                }
            }
        }
    })
}

export function swiper(arr, place){
    for(let item of arr.media){
        let slide = document.createElement('swiper-slide')
        let img = document.createElement('img')

        img.src = item

        slide.append(img)
        place.append(slide)
    }
}

export function catalogPage(place, id){
    colorses.forEach(el => {
        let key = el.getAttribute('class')
        
        el.style.backgroundColor = key
        
        el.onclick = () => {
            colorses.forEach(elem => elem.innerHTML = "")
    
            let h5 = document.createElement('h5')
    
            h5.innerHTML = '✓'
    
            el.append(h5)

            filtering(place, id, key)
        }
    })



    for(let i of category){
        let h4 = document.createElement('h4')
    
        h4.innerHTML = i.title
    
        h4.dataCatory = i.title
    
        categories_boxik.append(h4)
    
        h4.onclick = () => {
            location.assign('/pages/catalogPage/?id=' + i.id)
        }
        kit_kat1.onclick = () => {
            location.assign('/pages/catalogPage/?id=all')
        }
        clear.onclick = () => {
            location.assign('/pages/catalogPage/?id=all')
        }
        filtering(place, id, false)
    }
}


function filtering(place, id, key){
    getData('items')
        .then(res => {
            let error = 0
            if(error >= 2){
                error = 0
                filtered = res.filter(item =>{
                    for(let i of category){
                        if(+i.id === +id){
                            if(item.type === i.title){
                                return item                        
                            }
                        } else if(id === 'all'){
                            return item
                        }
                    }
                })
            }
            let filtered = res.filter(item =>{
                for(let i of category){
                    if(+i.id === +id){
                        if(item.type === i.title){
                            return item                        
                        }
                    } else if(id === 'all'){
                        return item
                    }
                }
            })
            
            if(key){
                error++
                filtered = filtered.filter(item => {
                    if(item.colors.length !== 0){
                        for(let i of item.colors){
                            if(i === key){
                                return item
                            }
                        }
                    }
                })
                items(filtered, place)
            } else {
                items(filtered, place)
            }

            ot.onkeyup = () => {
                if(+ot.value <= +doo.value){
                    filtered = filtered.filter(item => {
                        if(item.price >= ot.value && item.price <= doo.value){
                            return item
                        }
                    })
                    items(filtered, place)
                    ot.parentElement.style.border = '2px solid gray'
                } else {
                    ot.parentElement.style.border = '2px solid red'
                }
            }

            doo.onkeyup = () => {
                if(+ot.value <= +doo.value){
                    filtered = filtered.filter(item => {
                        if(item.price >= ot.value && item.price <= doo.value){
                            return item
                        }
                    })
                    items(filtered, place)
                    doo.parentElement.style.border = '2px solid gray'
                } else {
                    doo.parentElement.style.border = '2px solid red'
                }
            }


            select.onclick = () => {
                select.onclick = () => {
                    if(select.value === 'Много заказов'){
                        error++
                        filtered = filtered.filter(item => {
                            if(+item.rating >= 4.5){
                                return item
                            }
                        })
                        items(filtered, place)
                    } else if(select.value === 'Скидки'){
                        error++
                        filtered = filtered.filter(item => {
                            if(item.isBlackFriday){
                                return item
                            }
                        })
                        items(filtered, place)
                    } else if(select.value === 'Высокий рейтинг'){
                        error++
                        filtered = filtered.filter(item => {
                            if(item.rating >= 5){
                                return item
                            }
                        })
                        items(filtered, place)
                    } else {
                        filtered = res.filter(item =>{
                            for(let i of category){
                                if(+i.id === +id){
                                    if(item.type === i.title){
                                        return item                        
                                    }
                                } else if(id === 'all'){
                                    return item
                                }
                            }
                        })
                        items(filtered, place)
                    }
                }
            }
    })
}