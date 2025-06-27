const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', 'upsell-thank-you', 'page.tsx');

try {
  const content = fs.readFileSync(filePath);
  fs.writeFileSync(filePath, content, { encoding: 'utf8' });
  console.log('File converted to UTF-8 successfully.');
} catch (err) {
  console.error('Error converting file:', err);
  process.exit(1);
} 