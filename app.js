const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");

const app = express();

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://abieroalvin:vloyd21johns@cluster0.qgsfgkd.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// Express configuration
app.use(session({ secret: "YOUR_SESSION_SECRET" }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
