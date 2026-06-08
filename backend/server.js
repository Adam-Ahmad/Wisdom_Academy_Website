const app = require('./src/app');
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.status(200).json({ message: "Backend is running successfully!" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



