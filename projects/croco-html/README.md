ng build croco-html
cd dist/croco-html
npm publish

для работы логики спрайта нужно, чтобы в либе было:
1. croco-html/src/lib/assets/svg-for-sprites - папка для хранения исходных иконок
2. croco-html/src/lib/assets/sprites/symbol - папка, куда скрипт положит созданный спрайт (скрипт может этот путь сам создать)
3. croco-html/src/lib/tools/build-sprites.js - сам скрипт с логикой
3.1 часть логики из скрипта (про путь, по которому нужно положить скрипт в dist) можно заменить следующим кодом в croco-html/ng-package.json (в зависимости от того, какие пути нужны):
  "assets": [
    "shared/sprites"
  ]
4. в контейнер-проект в angular.json нужно добавить внутрь "assets" следующий код:
  {
    "glob": "**/*",
    "input": "node_modules/croco-html/lib/assets/sprites/",
    "output": "/assets/sprites/"
  }
  ps: нужно быть предельно внимательным к прописываемым путям!



