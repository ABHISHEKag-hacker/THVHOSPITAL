function handleAppointmentClick() {
    const button = document.getElementById('appointmentBtn');
    button.textContent = 'Waiting for Call...';
    button.disabled = true;
    button.style.backgroundColor = '#cccccc';
}

function handleChatbotSubmit() {
    const button = document.getElementById('chatbotBtn');
    button.textContent = 'Processing...';
    button.disabled = true;
    setTimeout(() => {
        button.textContent = 'Submit';
        button.disabled = false;
    }, 2000); // Simulate processing time
}

async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const form = document.getElementById('patientForm');
    const formData = new FormData(form);

    doc.setFillColor(0, 122, 255); // Blue color for the title bar
    doc.rect(0, 0, 210, 20, 'F');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255); // White text
    doc.text('Patient Entry Details', 10, 14);

    let yOffset = 30;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black text

    formData.forEach((value, key) => {
        doc.text(`${key}: ${value}`, 10, yOffset);
        yOffset += 10;
        if (yOffset > 280) {
            doc.addPage();
            yOffset = 20;
        }
    });

    doc.save('Patient_Report.pdf');
}
