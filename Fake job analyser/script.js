function analyzeText() {
  const text = document.getElementById('emailText').value.toLowerCase();
  const redFlags = [];
  if (text.includes('gmail.com') || text.includes('yahoo.com')) {
    redFlags.push('❌ Uses free email domain');
  }
  if (text.includes('payment') || text.includes('registration fee') || text.includes('pay')) {
    redFlags.push('❌ Asks for money');
  }
  if (text.includes('no interview') || text.includes('direct offer')) {
    redFlags.push('❌ No interview mentioned');
  }
  if (text.includes('dear candidate')) {
    redFlags.push('❌ Generic greeting used');
  }
  if (text.includes('urgent') || text.includes('limited time')) {
    redFlags.push('❌ Creates urgency');
  }

  let score = (redFlags.length / 5) * 100;
  let resultText = '';
  if (redFlags.length === 0) {
    resultText = '✅ No major red flags detected. Still, verify via official website.';
  } else {
    resultText = '<strong>Red Flags Detected:</strong><br>' + redFlags.join('<br>');
  }

  resultText += `<br><br><strong>🧪 Scam Probability:</strong> ${score}%`;

  if (score > 60) {
    resultText += "<br><br>🧠 <strong>AI Suggests:</strong> Avoid replying, block sender, and report scam to CERT-In.";
  } else if (score > 30) {
    resultText += "<br><br>🧠 <strong>AI Suggests:</strong> Double-check email domain, validate company name.";
  } else {
    resultText += "<br><br>🧠 <strong>AI Suggests:</strong> No threat detected. Still verify from official site.";
  }

  const outputBox = document.getElementById('output');
  outputBox.innerHTML = resultText;
  outputBox.className = '';
  if (score >= 70) outputBox.classList.add('high-risk');
  else if (score >= 40) outputBox.classList.add('medium-risk');
  else outputBox.classList.add('low-risk');

  document.getElementById('result').style.display = 'block';
}

function toggleTheme() {
  document.body.classList.toggle("light-mode");
}

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const result = document.getElementById('output').innerText;
  doc.text(result, 10, 10);
  doc.save("JobOfferReport.pdf");
}
