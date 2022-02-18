const selectContinent = document.getElementById('selectContinent') //select tag
const countriesList = document.getElementById('countriesList')
const countryProps = document.getElementById('countryProps')

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
  const countries =  await getCountriesFromContinent(continentCode)
  countriesList.innerHTML = ''
  countries.forEach(country => {
    const div = document.createElement('div')
    div.innerHTML = `
      <h2>Country: ${country.name}</h2>
      <h2>Capital: ${country.capital}</h2>
      <br>
    `
    countriesList.append(div)
  })
})

function getCountriesFromContinent (continentCode) {
  return queryFetch(`
    query getThemCountries ($code:ID!) {
      continent(code: $code) {
        countries{
          name
          capital
        }
      }
    }
  `, {code: continentCode}).then(data => {
    let allCountries = data.data.continent.countries
    return allCountries
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