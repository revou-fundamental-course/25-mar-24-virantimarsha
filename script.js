document.getElementById('bmiForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var weight = parseFloat(document.getElementById('weight').value);
    var age = parseInt(document.getElementById('age').value);
    var height = parseInt(document.getElementById('height').value);

    // Calculate BMI
    var bmi = calculateBMI(weight, height);

    // Determine BMI category
    var bmiCategory = getBMICategory(bmi);

    // Display result
    displayBMIResult(bmi, bmiCategory);
});

document.getElementById('resetBtn').addEventListener('click', function() {
    document.getElementById('bmiForm').reset();
    document.getElementById('result').style.display = 'none';
});

function calculateBMI(weight, height) {
    var heightInMeter = height / 100;
    return weight / (heightInMeter * heightInMeter);
}

function getBMICategory(bmi) {
    if (bmi < 18.5) {
        return 'Kekurangan Berat Badan';
    } else if (bmi >= 18.5 && bmi < 25) {
        return 'Normal (Ideal)';
    } else if (bmi >= 25 && bmi < 30) {
        return 'Kelebihan Berat Badan';
    } else {
        return 'Kegemukan (Obesitas)';
    }
}

function displayBMIResult(bmi, bmiCategory) {
    var resultElement = document.getElementById('result');
    resultElement.innerHTML = '<h2>Hasil</h2>' +
        bmiCategory + '</p>' +
        bmi.toFixed(2) + '</p>' +
        '<p>';
    if (bmiCategory === 'Kekurangan Berat Badan') {
        resultElement.innerHTML += 'Anda memiliki berat badan kurang.';
    } else if (bmiCategory === 'Normal (Ideal)') {
        resultElement.innerHTML += 'Anda memiliki berat badan normal.';
    } else if (bmiCategory === 'Kelebihan Berat Badan') {
        resultElement.innerHTML += 'Anda memiliki kelebihan berat badan.';
    } else {
        resultElement.innerHTML += 'Anda memiliki obesitas.';
    }
    resultElement.innerHTML += '</p>' +
        '<button id="downloadBtn">Download Hasil BMI</button>';
    resultElement.style.display = 'block';

    // Tambahkan event listener untuk tombol unduh
    document.getElementById('downloadBtn').addEventListener('click', function() {
        downloadBMIResult(bmi, bmiCategory);
    });
}

function downloadBMIResult(bmi, bmiCategory) {
    var resultText = "Hasil BMI: " + bmi.toFixed(2) + "\n" +
                     "Kategori BMI: " + bmiCategory + "\n";

    if (bmiCategory === 'Kekurangan Berat Badan') {
        resultText += 'Anda memiliki berat badan kurang.';
    } else if (bmiCategory === 'Normal (Ideal)') {
        resultText += 'Anda memiliki berat badan normal.';
    } else if (bmiCategory === 'Kelebihan Berat Badan') {
        resultText += 'Anda memiliki kelebihan berat badan.';
    } else {
        resultText += 'Anda memiliki obesitas.';
    }

    var encodedResult = encodeURIComponent(resultText);
    var dataUri = 'data:text/plain;charset=utf-8,' + encodedResult;

    var link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', 'hasil_bmi.txt');
    link.click();
}
