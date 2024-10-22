const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");

// Get user profile by id
router.get("/user/:id", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user || user.is_deleted) {
            return res.status(404).json({ message: "User not found" });
        }
        const { name, email } = user;
        res.json({ name, email });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
