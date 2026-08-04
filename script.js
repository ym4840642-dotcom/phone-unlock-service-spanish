function isValidIMEI(imei) {
    if (!/^\d{15}$/.test(imei)) {
        return false;
    }

    let sum = 0;
    let shouldDouble = false;

    for (let i = imei.length - 1; i >= 0; i--) {
        let digit = parseInt(imei.charAt(i), 10);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}

const form = document.getElementById("unlockForm");

if (form) {
    form.addEventListener("submit", function(event) {
        const imei = document.getElementById("imei").value.trim();

        // IMEI = exactly 15 digits
        const imeiPattern = /^[0-9]{15}$/;

        // Serial Number = 8 to 20 letters or numbers
        const serialPattern = /^[A-Za-z0-9]{8,20}$/;

        if (imeiPattern.test(imei)) {
            if (!isValidIMEI(imei)) {
                event.preventDefault();
                alert("Por favor ingresa un IMEI válido de 15 dígitos (falló la verificación).");
            }
            return;
        }

        if (serialPattern.test(imei)) {
            return; // valid serial
        }

        event.preventDefault();
        alert("Por favor ingresa un IMEI válido de 15 dígitos o un número de serie válido.");
    });
} else {
    console.warn("No se encontró un formulario con el id 'unlockForm'.");
}

