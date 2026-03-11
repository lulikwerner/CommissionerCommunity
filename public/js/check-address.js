document.getElementById('addressForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const streetNumber = document.getElementById('streetNumber').value;
  const streetType = document.getElementById('streetType').value;

  const response = await fetch('/check-address', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ streetNumber, streetType })
  });

  const html = await response.text();
  document.getElementById('result').innerHTML = html;

  // Wait for DOM update before checking
  setTimeout(() => {
    const addressFound = document.getElementById('address-found');
    if (addressFound) {
      window.location.href = '/contact.html';
    }
  }, 50);
});
