
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const jsonFilePath = './client/src/new-data.json';

// Olvasd be a JSON fájlt
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the JSON file:', err);
    return;
  }

  try {
    // Az eredeti adatokat parzold fel
    const jsonData = JSON.parse(data);

    // Hozzáad egyedi azonosítót az összes elemhez
    jsonData.items.forEach((item) => {
      item.id = uuidv4();
    });

    // Az adatokat módosítva írd vissza a fájlba
    fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing to the JSON file:', err);
      } else {
        console.log('Unique IDs added successfully!');
      }
    });
  } catch (jsonError) {
    console.error('Error parsing JSON:', jsonError);
  }
});
