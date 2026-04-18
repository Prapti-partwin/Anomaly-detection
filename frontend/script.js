async function checkAnomaly() {
    const temp = document.getElementById("temp").value;
    const humidity = document.getElementById("humidity").value;
    const battery = document.getElementById("battery").value;

    const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            temperature: parseFloat(temp),
            humidity: parseFloat(humidity),
            battery: parseFloat(battery)
        })
    });

    const data = await response.json();

    document.getElementById("result").innerText = data.status;
}

// 🔥 AUTO-GENERATE SENSOR DATA (Real IoT Simulation)
// setInterval(() => {
//     document.getElementById("temp").value = (Math.random() * 100).toFixed(2);
//     document.getElementById("humidity").value = (Math.random() * 100).toFixed(2);
//     document.getElementById("battery").value = (Math.random() * 100).toFixed(2);
// }, 3000);