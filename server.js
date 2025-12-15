const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/calculate-bmi", (req, res) => {
    console.log("Received:", req.body);
    
    const weight = parseFloat(req.body.weight);
    const heightCm = parseFloat(req.body.height);
    const heightM = heightCm / 100; 

    if (!weight || !heightCm || weight <= 0 || heightCm <= 0) {
        return res.json({ 
            success: false, 
            message: "Invalid input. Enter positive numbers." 
        });
    }

    const bmi = weight / (heightM * heightM);

    let category = "";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 24.9) category = "Normal weight";
    else if (bmi < 29.9) category = "Overweight";
    else category = "Obese";

    res.json({ 
        success: true, 
        bmi: bmi.toFixed(2), 
        category: category 
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});