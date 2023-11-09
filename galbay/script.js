document.addEventListener('DOMContentLoaded', function () {
    // Call the initialization function here
    init();
});

function init() {
    // Trigger file handling function on page load
    handleFileOnLoad();
}

document.getElementById('csvFileInput').addEventListener('change', handleFile);

function handleFile(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const content = e.target.result;
            const sum = calculateSumFromCSV(content);
            displaySum(sum);
        };

        reader.readAsText(file);
    }
}

// New function to handle file on page load
function handleFileOnLoad() {
    // You can replace 'your-file.csv' with the path to your CSV file
    fetch('jomok.csv')
        .then(response => response.text())
        .then(content => {
            const { sum, rowCount } = processCSV(content);
            displaySum(sum);
            displayRowCount(rowCount);
        })
        .catch(error => console.error('Error loading CSV file:', error));
}

function calculateSumFromCSV(csvContent) {
    const lines = csvContent.split('\n');
    let sum = 0;
    let rowCount = lines.length;

    lines.forEach(line => {
        const numbers = line.split(',');

        numbers.forEach(number => {
            const parsedNumber = parseFloat(number.trim());
            if (!isNaN(parsedNumber)) {
                sum += parsedNumber;
            }
        });
    });

    return { sum, rowCount };
}

function displaySum(sum) {
    const formattedSum = formatToIDR(sum);
    document.getElementById('sum').textContent = formattedSum;
}

function formatToIDR(number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
}

function displayRowCount(rowCount) {
    document.getElementById('rowNumber').textContent = rowCount;
}
