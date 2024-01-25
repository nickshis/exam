let header = document.createElement('header')
let divLeft = document.createElement('div')
let textMiddle = document.createElement('h5')
let divRight = document.createElement('div')
let divLoc = document.createElement('div')
let loc_img = document.createElement('img')
let loc_text = document.createElement('h5')
let left_text = document.createElement('h5')
let right_quest = document.createElement('h5')
let right_zakaz = document.createElement('h5')
let right_div = document.createElement('div')
let right_div_img = document.createElement('img')
let right_div_text = document.createElement('h5')

divLeft.classList.add('div_left')
textMiddle.classList.add('text_middle')
divRight.classList.add('div_right')

loc_text.innerHTML = `Город: <a href="#" class="city">Ташкент</a>`
left_text.innerHTML = 'Пункты выдачи'
textMiddle.innerHTML = 'Доставим ваш заказ бесплатно - всего за один день!'
right_quest.innerHTML = 'Вопрос-ответ'
right_zakaz.innerHTML = 'Мои заказы'
right_div_text.innerHTML = 'Русский'

loc_img.src = '/public/map-pin.svg'
right_div_img.src = '/public/Флаг_России_(1).jpg'

document.body.prepend(header)
header.append(divLeft, textMiddle, divRight)
divLeft.append(divLoc, left_text)
divRight.append(right_quest, right_zakaz, right_div)
divLoc.append(loc_img, loc_text)
right_div.append(right_div_img, right_div_text)
