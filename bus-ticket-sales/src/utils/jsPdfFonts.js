// src/utils/jsPdfFonts.js
import { jsPDF } from 'jspdf';
import robotoTTF from '../fonts/Roboto-Regular.ttf?url';

// Вбудовуємо TTF у VFS jsPDF та реєструємо сімейство
export function registerJsPdfFont() {
  // додаємо файл в VFS
  jsPDF.API.addFileToVFS('Roboto-Regular.ttf', robotoTTF);
  // реєструємо сімейство
  jsPDF.API.addFont('Roboto-Regular.ttf', 'RobotoUnicode', 'normal');
}
