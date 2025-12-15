console.log("Script loaded!");

document.getElementById("bmiForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    
    console.log("Form submitted!");

    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const resultDiv = document.getElementById("result");

    try {
        const response = await fetch("/calculate-bmi", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ weight, height })
        });

        const data = await response.json();
        
        resultDiv.className = "result";
        resultDiv.classList.remove("hidden");

        
        if (data.success) {
    let bmiClass = "";

    if (data.category === "Underweight") bmiClass = "underweight";
    else if (data.category === "Normal weight") bmiClass = "normal";
    else if (data.category === "Overweight") bmiClass = "overweight";
    else bmiClass = "obese";

    resultDiv.classList.add(bmiClass);
    resultDiv.innerHTML = `Your BMI is <strong>${data.bmi}</strong><br>Category: ${data.category}`;
    } else {
            resultDiv.classList.add("error");
            resultDiv.innerHTML = data.message;
        }
    } catch (error) {
        console.error("Error:", error);
        resultDiv.classList.add("error");
        resultDiv.classList.remove("hidden");
        resultDiv.innerHTML = "An error occurred. Please try again.";
    }
});