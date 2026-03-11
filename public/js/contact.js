document.addEventListener('DOMContentLoaded', () => {
  const district = localStorage.getItem('district');
  const data = JSON.parse(localStorage.getItem('addressData'));

  if (district && data) {
    const container = document.getElementById('address-found');

    let html = `<h3>✅ District: ${district}</h3><table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody>`;

    for (const [key, value] of Object.entries(data)) {
      html += `<tr><td>${key}</td><td>${value}</td></tr>`;
    }

    html += `</tbody></table>`;
    container.innerHTML = html;
  } else {
    document.getElementById('address-found').innerHTML = '<p>❌ No address data found.</p>';
  }
});
