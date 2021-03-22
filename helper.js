const baseUrl = 'http://localhost:1717/pastry';

// get all pastries
const getPastries = async () => {
  let response = await fetch(baseUrl);
  return await response.json();
};

// update pastry
async function updatePastry(id, pastry) {
  let url = 'http://localhost:1717/pastry/update/' + id;

  let response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pastry),
  });

  let _pastry = await response.json();
  return _pastry;
}

// delete pastry
async function deletePastry(id) {
  let url = 'http://localhost:1717/pastry/delete/' + id;

  let response = await fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  let pastry = await response.json();
}

// add pastry
async function addPastry(pastry) {
  let url = 'http://localhost:1717/pastry/create/';

  let response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pastry),
  });

  let _pastry = await response.json();
}

export { getPastries, updatePastry, deletePastry, addPastry };
