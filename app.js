const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('https://file-system-tkk3.onrender.com/', (req, res) => {
    const { folder, fileName } = req.body;

    const timestamp = new Date().toISOString();
  
    if (!folder || !fileName) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
  
    const filePath = path.join(__dirname, folder, fileName);
  
    // Ensure the folder exists, create it if not
    if (!fs.existsSync(path.join(__dirname, folder))) {
      fs.mkdirSync(path.join(__dirname, folder), { recursive: true });
    }
  
    // Write content to the file
    fs.writeFile(filePath, timestamp, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error creating the file' });
      }
  
      res.status(201).json({ message: 'File created successfully' });
    });
  });
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
