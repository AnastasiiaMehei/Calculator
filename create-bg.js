import fs from 'fs';
import path from 'path';
import { createCanvas } from 'canvas';

const canvas = createCanvas(1920, 1080);
const ctx = canvas.getContext('2d');

const gradient = ctx.createLinearGradient(0, 0, 1920, 1080);
gradient.addColorStop(0, '#667eea');
gradient.addColorStop(1, '#764ba2');

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 1920, 1080);

const buffer = canvas.toBuffer('image/png');
const outputPath = path.join(process.cwd(), 'public', 'background.png');

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, buffer);
console.log('Background created successfully!');
