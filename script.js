const selectContinent = document.getElementById("selectContinent")

queryFetch(`
  query {
    continents {
      name
      code
    }
  }
`).then(data => {
  data.data.continents.forEach(continent => {
    const option = document.createElement('option')
    option.value = continent.code //works like id in this case
    option.innerText = continent.name
    selectContinent.append(option)
  });
})

function queryFetch (query) {
  return fetch("https://countries.trevorblades.com", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      query: query
    })
  }).then(resp => resp.json())
}