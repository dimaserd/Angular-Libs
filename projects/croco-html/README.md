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
4. в контейнер-проект в angular.json нужно добавить внутрь 
"projects"."YourProjectApp"."architect"."build"."options"."assets" следующий код:
  {
    "glob": "**/*",
    "input": "node_modules/croco-html/lib/assets/sprites/",
    "output": "/assets/sprites/"
  }
ps: нужно быть предельно внимательным к прописываемым путям!

Например так
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "GenericApp": {
      "root": "",
      "sourceRoot": "src",
      "projectType": "application",
      "prefix": "app",
      "schematics": {},
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "allowedCommonJsDependencies": ["bezier-easing"],
            "progress": false,
            "outputPath": "dist",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "src/tsconfig.app.json",
            "assets": [
              "src/assets",
              "src/manifest.webmanifest",
              {
                "glob": "**/*",
                "input": "node_modules/croco-html/lib/assets/sprites/",
                "output": "/assets/sprites/"
              }
            ],
          }
        }
      }
    }
  }
}



