# check-ege-notifier
Я от нечего делать написал скрипт, который уведомляет об изменениях результатов ЕГЭ.
# Как использовать:
1. Зайти и залогиниться на сайте check.ege.edu.ru
2. Нажать F12
3. Перейти на вкладку Console
4. Вставить этот скрипт и нажать ENTER: ```var s=document.createElement('script');s.id="xLivan-check-ege-notifier";s.src="https://rawgit.com/xLivan/check-ege-notifier/master/check-ege.js";document.body.previousElementSibling.appendChild(s);```
5. Нажать F12

Profit. Раз в минуту скрипт "обновляет" страницу и сравнивает результаты.
# Важно:
1. Не обновляйте страницу сами с помощью F5 или "Обновить страницу" в браузере (для этого есть кнопка "Обновить" в скрипте), иначе придётся повторять все шаги заново. 
2. Не закрывайте браузер и вкладку с сайтом
3. Проверить работу уведомлений можно с помощью кнопки "Проверить уведомление"
