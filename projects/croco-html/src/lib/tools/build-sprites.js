'use strict';

const SVGSpriter = require('svg-sprite');
const path = require('path');
const fs = require('fs');

const svgDirectoryPath = 'projects/croco-html/src/lib/assets/svg-for-sprites/';
const spritesOutputPath = 'projects/croco-html/src/lib/assets/sprites/';
const distSpritesPath = 'dist/croco-html/lib/assets/sprites/';
const iconIds = [];

// Конфигурация для SVGSpriter
const config = {
  dest: spritesOutputPath,
  shape: {
    id: {
      generator: (filePath) => {
        const iconId = path.basename(filePath, '.svg');
        iconIds.push(iconId);
        return iconId;
      },
    },
  },
  mode: {
    symbol: {
      bust: true, // Добавляет хэш к имени файла
      sprite: 'croco-html-svg-sprite.svg', // Базовое имя для спрайта
    },
  },
};

const spriter = new SVGSpriter(config);

// Проверка существования директории
if (!fs.existsSync(svgDirectoryPath)) {
  console.error(`Directory "${svgDirectoryPath}" does not exist.`);
  process.exit(1);
}

// Получение всех SVG файлов
const files = fs.readdirSync(svgDirectoryPath).filter((file) => file.endsWith('.svg'));
if (files.length === 0) {
  console.error('No SVG files found.');
  process.exit(1);
}

// Добавляем SVG в спрайтер
files.forEach((file) => {
  const filePath = path.join(svgDirectoryPath, file);
  spriter.add(filePath, file, fs.readFileSync(filePath, 'utf-8'));
});

// Компиляция спрайта
spriter.compile((err, result) => {
  if (err) {
    console.error('Error during sprite compilation:', err);
    return;
  }

  // Извлечение пути к сгенерированному файлу с учётом хэша
  const spriteFilePath = result.symbol.sprite.path;
  const hashedFileName = path.basename(spriteFilePath); // Имя с хэшем

  fs.writeFileSync(spriteFilePath, result.symbol.sprite.contents);
  console.log(`Sprite created: ${spriteFilePath}`);

  // Копирование спрайта в dist
  const spriteSubPath = path.relative(spritesOutputPath, spriteFilePath); // Относительный путь от outputPath
  const distSpriteFullPath = path.join(distSpritesPath, spriteSubPath);

  fs.mkdirSync(path.dirname(distSpriteFullPath), { recursive: true });
  fs.copyFileSync(spriteFilePath, distSpriteFullPath);
  console.log(`Sprite copied to: ${distSpriteFullPath}`);

  // Сохранение ID и хэша
  fs.writeFileSync(
    path.join('projects/croco-html/src', 'sprites-ids.type.ts'),
    'export type SpriteIdsType = ' + iconIds.map((id) => `'${id}'`).join(' | '),
  );

  // Сохранение хэша
  const hash = hashedFileName.replace('croco-html-svg-sprite-', '').replace('.svg', '');
  fs.writeFileSync(
    path.join('projects/croco-html/src', 'sprites-hash.ts'),
    `export const spritesHash = { symbol: "${hash}" };`,
  );
});

