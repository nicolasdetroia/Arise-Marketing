// Sample client data
const clients = [
    { name: 'John Doe', email: 'john.doe@example.com', phone: '(555) 123-4567', status: 'Active' },
    { name: 'Jane Smith', email: 'jane.smith@example.com', phone: '(555) 987-6543', status: 'Pending' },
    { name: 'ACME Corp', email: 'contact@acmecorp.com', phone: '(555) 456-7890', status: 'Inactive' },
];

// Populate the client table
const clientTableBody = document.querySelector('#clientTableBody');
clients.forEach((client) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="py-2 px-4">${client.name}</td>
        <td class="py-2 px-4">${client.email}</td>
        <td class="py-2 px-4">${client.phone}</td>
        <td class="py-2 px-4 text-right ${
            client.status === 'Active'
                ? 'text-green-600'
                : client.status === 'Pending'
                ? 'text-yellow-600'
                : 'text-red-600'
        }">${client.status}</td>
    `;
    clientTableBody.appendChild(row);
});

// Filter functionality (example)
document.querySelector('#clientFilter').addEventListener('input', (e) => {
    const filter = e.target.value.toLowerCase();
    const rows = clientTableBody.querySelectorAll('tr');
    rows.forEach((row) => {
        const name = row.querySelector('td:first-child').textContent.toLowerCase();
        row.style.display = name.includes(filter) ? '' : 'none';
    });
});
