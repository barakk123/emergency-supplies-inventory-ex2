// Utility function to update messages
function updateMessage(message, isError = false) {
  const messageElement = document.getElementById('messages');
  messageElement.innerText = message;
  messageElement.style.color = isError ? 'red' : 'green';
}

// Fetch and display supplies
async function fetchSupplies() {
  try {
    const response = await fetch('http://localhost:3000/supplies/');
    if (!response.ok) throw new Error('Failed to fetch supplies.');
    const supplies = await response.json();
    const suppliesListElement = document.getElementById('supplies-list');
    suppliesListElement.innerHTML = supplies.map(supply => `<div>Name: ${supply.supply_name}, Category: ${supply.category}, Price: ${supply.unit_price}, Quantity: ${supply.quantity}</div>`).join('');
  } catch (error) {
    console.error(error);
    updateMessage('Failed to load supplies.', true);
  }
}

// Create a new supply
async function createSupply() {
  const supplyData = ['supply_name', 'category', 'unit_price', 'quantity', 'expiration_date', 'supplier', 'location']
    .reduce((acc, field) => {
      const value = document.getElementById(field).value.trim();
      if (value) acc[field] = value;
      return acc;
    }, {});

  try {
    const response = await fetch('http://localhost:3000/supplies/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(supplyData),
    });
    const data = await response.json();
    response.ok ? updateMessage('Supply created successfully!') : updateMessage(data.message || 'Failed to create supply.', true);
    fetchSupplies();
  } catch (error) {
    console.error(error);
    updateMessage('Failed to create supply.', true);
  }
}

// Update a supply by name
async function updateSupplyKeepTheEmptyVals() {
  const supplyName = document.getElementById('supply_name').value.trim();
  if (!supplyName) {
    updateMessage('Supply name is required for updating.', true);
    return;
  }

  const supplyData = ['category', 'unit_price', 'quantity', 'expiration_date', 'supplier', 'location']
    .reduce((acc, field) => {
      const value = document.getElementById(field).value.trim();
      if (value) acc[field] = value;
      return acc;
    }, { supply_name: supplyName });

  try {
    const response = await fetch(`http://localhost:3000/supplies/${supplyName}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(supplyData),
    });
    const data = await response.json();
    response.ok ? updateMessage('Supply updated successfully!') : updateMessage(data.message || 'Failed to update supply.', true);
    fetchSupplies();
  } catch (error) {
    console.error(error);
    updateMessage('Failed to update supply.', true);
  }
}

// Delete a supply
async function deleteSupply() {
  const supplyName = document.getElementById('supply_name').value.trim();
  if (!supplyName) {
    updateMessage('Supply name is required for deletion.', true);
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/supplies/${supplyName}`, { method: 'DELETE' });
    response.ok ? updateMessage(`Supply ${supplyName} deleted successfully!`) : updateMessage('Failed to delete supply.', true);
    fetchSupplies();
  } catch (error) {
    console.error(error);
    updateMessage('Failed to delete supply.', true);
  }
}

// Initial fetch of supplies
document.addEventListener('DOMContentLoaded', fetchSupplies);
