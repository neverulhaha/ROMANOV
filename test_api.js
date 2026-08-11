const tests = [
  { name: 'Negative quantity', body: { items: [{ id: 1, quantity: -1 }] } },
  { name: 'Missing items', body: {} },
  { name: 'Unknown ID', body: { items: [{ id: 99999, quantity: 1 }] } },
  { name: 'Large quantity (1000)', body: { items: [{ id: 1, quantity: 1000 }] } },
  { name: 'Extra fields (price spoofing)', body: { items: [{ id: 1, quantity: 1 }], total: 1, isPremium: true } },
  { name: 'Valid request', body: { items: [{ id: 1, quantity: 1 }, { id: 2, quantity: 2 }] } },
];

async function runTests() {
  for (const t of tests) {
    try {
      const res = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(t.body)
      });
      const data = await res.json();
      console.log(`[${t.name}] Status: ${res.status}`);
      console.log(data);
      console.log('---');
    } catch (e) {
      console.error(e.message);
    }
  }
}

runTests();
