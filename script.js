const selectContinent = document.getElementById('selectContinent') //select tag
const countriesList = document.getElementById('countriesList')

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

selectContinent.addEventListener('change', async (e) => {
  const continentCode = e.target.value
  const countries =  await getContinentCountries(continentCode)
  countriesList.innerHTML = ''
  countries.forEach(country => {
    const div = document.createElement('div')
    div.innerText = country.name
    countriesList.append(div)
  })
})

function getContinentCountries (continentCode) {
  return queryFetch(`
    query getThemAll ($code:ID!) {
      continent(code: $code) {
        countries{
          name
        }
      }
    }
  `, {code: continentCode}).then(data => {
    return data.data.continent.countries
  })
}

function queryFetch (query, variables) {
  return fetch("https://countries.trevorblades.com", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      query: query,
      variables: variables
    })
  }).then(resp => resp.json())
}