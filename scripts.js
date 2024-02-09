async function fetchSupplies() {
    try {
        const response = await fetch('http://localhost:3000/supplies/');
        const supplies = await response.json();
        console.log(supplies);
        document.getElementById('supplies-list').innerHTML = '';
        for (let i = 0; i < supplies.length; i++) {
            const supply = supplies[i];
            const supplyItem = document.createElement('div');
            supplyItem.innerHTML = `Name: ${supply.supply_name}, Category: ${supply.category}, Price: ${supply.unit_price}, Quantity: ${supply.quantity}`;
            document.getElementById('supplies-list').appendChild(supplyItem);
            
        }
    } catch (error) {
        console.error(error);
    }
}

// Create a new supply
async function createSupply() {
    const supplyData = {
        supply_name: document.getElementById('supply_name').value,
        category: document.getElementById('category').value,
        unit_price: document.getElementById('unit_price').value,
        quantity: document.getElementById('quantity').value,
        expiration_date: document.getElementById('expiration_date').value,
        supplier: document.getElementById('supplier').value,
        location: document.getElementById('location').value,
    };
    try {
        await fetch('http://localhost:3000/supplies/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(supplyData),
        });
        console.log('Supply created');
        fetchSupplies()

    } catch (error) {
        console.error(error);
    }
}

// Update a supply
async function updateSupplyKeepTheEmptyVals() {
    const fields = ['supply_name', 'category', 'unit_price', 'quantity', 'expiration_date', 'supplier', 'location'];
    const supplyData = fields.reduce((data, field) => {
        const value = document.getElementById(field).value;
        if (value) data[field] = value;
        return data;
    }, {});

    try {
        const supplyName = supplyData.supply_name || '';
        if (!supplyName) {
            console.error('Supply name is required for updating.');
            return;
        }

        await fetch(`http://localhost:3000/supplies/${supplyName}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(supplyData),
        });
        console.log('Supply updated');
        fetchSupplies();
    } catch (error) {
        console.error(error);
    }
}

// Delete a supply
async function deleteSupply() {
    const supplyName = document.getElementById('supply_name').value;
    try {
        await fetch(`http://localhost:3000/supplies/${supplyName}`, {
            method: 'DELETE',
        });
        console.log('Supply deleted');
    } catch (error) {
        console.error(error);
    }
}

