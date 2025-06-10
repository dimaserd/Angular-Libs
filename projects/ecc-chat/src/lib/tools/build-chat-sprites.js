// 'use strict';
//
// const SVGSpriter = require('svg-sprite');
// const path = require('path');
// const fs = require('fs');
//
// const mainPath = 'projects/ecc-chat/src';
// const svgsPath = `${mainPath}/assets/svg-for-sprites`;
// const spritesPath = `${mainPath}/assets/sprites`;
// const iconIds = [];
//
// // Добавляет хэш к имени файла
// const useHash = false;
//
// // Удаляем старый спрайт
// const spriteFilePath = `${spritesPath}/symbol/chat-html-svg-sprite.svg`;
// if (fs.existsSync(spriteFilePath)) {
//   fs.unlinkSync(spriteFilePath);
// }
//
// // Конфигурация для SVGSpriter
// const config = {
//   dest: spritesPath,
//   shape: {
//     id: {
//       generator: (filePath) => {
//         const iconId = path.basename(filePath, '.svg');
//         iconIds.push(iconId);
//         return iconId;
//       },
//     },
//   },
//   mode: {
//     symbol: {
//       bust: useHash, // Добавляет хэш к имени файла
//       sprite: 'chat-html-svg-sprite.svg', // Базовое имя для спрайта
//     },
//   },
// };
//
// const spriter = new SVGSpriter(config);
//
// // Проверка существования директории
// if (!fs.existsSync(svgsPath)) {
//   console.error(`Directory "${svgsPath}" does not exist.`);
//   process.exit(1);
// }
//
// // Получение всех SVG файлов
// const files = fs.readdirSync(svgsPath).filter((file) => file.endsWith('.svg'));
// if (files.length === 0) {
//   console.error('No SVG files found.');
//   process.exit(1);
// }
//
// // Создание директории для спрайтов, если ее нет
// const symbolDir = path.join(spritesPath, 'symbol');
// if (!fs.existsSync(symbolDir)) {
//   fs.mkdirSync(symbolDir, { recursive: true });
// }
//
// // Добавляем SVG в спрайтер
// files.forEach((file) => {
//   const filePath = path.join(svgsPath, file);
//   spriter.add(filePath, file, fs.readFileSync(filePath, 'utf-8'));
// });
//
// // Компиляция спрайта
// spriter.compile((err, result) => {
//   if (err) {
//     console.error('Error during sprite compilation:', err);
//     return;
//   }
//
//   // Извлечение пути к сгенерированному файлу
//   const spriteFilePath = result.symbol.sprite.path;
//
//   fs.writeFileSync(spriteFilePath, result.symbol.sprite.contents);
//   console.log(`Sprite created: ${spriteFilePath}`);
//
//   // Сохранение ID
//   fs.writeFileSync(
//     path.join(mainPath, 'chat-sprite-ids.type.ts'),
//     'export type EccChatSpriteIdsType = ' + iconIds.map((id) => `'${id}'`).join(' | '),
//   );
// });
//
