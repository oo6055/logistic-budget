const products = [
    { name: 'חלב רגיל', price: 7.254 },
    { name: 'חלב סויה', price: 11.8755 },
    { name: 'מעדן חלב', price: 3.2877 },
    { name: 'יוגורט לבן/ עם פרי', price: 4.2237 },
    { name: 'מעדן סויה', price: 3.2877 },
    { name: 'קורנפלקס רגיל', price: 21.095 },
	{ name: 'עוגיות יבשות 1 ק"ג', price: 24.7923 },
	{ name: 'קפה מיובש JACOBS', price: 33.7545 },
	{name: 'קפה נמס קופסא 1', price: 23.0724},
		{name: 'לחם אחיד פרוס', price: 6.3297},
		{name: 'קפה שחור', price: 9.8982},
		{name: "'קוטג", price: 6.7275},
				{name: "גבינה לבנה אישי", price: 5.5341},
				{name: "בייגלה", price: 16.8831},
					{name: "עוגה בחושה", price: 13.1859},
					{name: "נייטשר וואלי - 5 יחידות בקופסא", price: 24.1605},
					{name: "שתייה מתוקה גדולה", price: 9.9333},


	

];

let quantities = products.reduce((acc, product) => {
    acc[product.name] = 0;
    return acc;
}, {});

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#productTable tbody');
    const budgetInput = document.getElementById('budget');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const totalAmountDisplay = document.getElementById('totalAmount');

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>₪${product.price.toFixed(2)}</td>
            <td><span id="${product.name}-quantity">0</span></td>
            <td>
                <button onclick="changeQuantity('${product.name}', -1)">-</button>
                <button onclick="changeQuantity('${product.name}', 1)">+</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    window.changeQuantity = (productName, delta) => {
        quantities[productName] = Math.max(0, quantities[productName] + delta);
        document.getElementById(`${productName}-quantity`).innerText = quantities[productName];
        updateTotal();
    };

    budgetInput.addEventListener('input', updateTotal);
    checkoutBtn.addEventListener('click', updateTotal);

    function updateTotal() {
        const budget = parseFloat(budgetInput.value) || 0;
        const total = products.reduce((sum, product) => {
            return sum + product.price * quantities[product.name];
        }, 0);

        totalAmountDisplay.innerText = `Total: ₪${total.toFixed(2)}`;
        totalAmountDisplay.className = total > budget ? 'red' : 'blue';
    }
});