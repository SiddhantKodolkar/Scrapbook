// backend/routes/media.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');
const authenticateToken = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/upload', authenticateToken, upload.single('file'), (req, res) => {
  const { title, description } = req.body;
  const fileUrl = req.file.path;
  const userId = req.user.id;

  db.query('INSERT INTO media (userId, title, description, fileUrl) VALUES (?, ?, ?, ?)', [userId, title, description, fileUrl], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(201).json({ message: 'Media uploaded successfully' });
  });
});
router.get('/', authenticateToken, (req, res) => {
  const userId = req.user.id;
  db.query(`
    SELECT users.username, media.*
    FROM users
    LEFT JOIN media ON users.id = media.userId
    WHERE users.id = ?`, 
    [userId], 
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }

      const userMedia = {
        username: results.length > 0 ? results[0].username : null,
        mediaItems: results.filter(item => item.id !== null) // Filter out rows with no media
      };

      res.status(200).json(userMedia);
    }
  );
});

// New route to fetch media details
router.get('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM media WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Media not found' });
    }
    res.json(results[0]);
  });
});

// New route to update media
router.put('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  db.query('UPDATE media SET title = ?, description = ? WHERE id = ?', [title, description, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.json({ message: 'Media updated successfully' });
  });
});

// New route to delete media
router.delete('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM media WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.json({ message: 'Media deleted successfully' });
  });
});

module.exports = router;
