import React, { useEffect, useState } from 'react';

const CountryAndStateDropdowns = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [states, setStates] = useState([]);

  useEffect(() => {
    populateCountries();
  }, []);

  const populateCountries = () => {
    fetch('https://xc-countries-api.fly.dev/api/countries/')
      .then(response => response.json())
      .then(data => {
        data.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const getStates = () => {
    const selectedCountryCode = document.getElementById("country").value;

    if (selectedCountryCode) {
      fetch(`https://xc-countries-api.fly.dev/api/countries/${selectedCountryCode}/states/`)
        .then(response => response.json())
        .then(data => {
          data.sort((a, b) => a.name.localeCompare(b.name));
          setStates(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      setStates([]);
    }
  };
  
  const addCountry = () => {
    const newCountryName = document.getElementById('newCountryName').value;
    const newCountryCode = document.getElementById('newCountryCode').value;

    if (newCountryName && newCountryCode) {
      fetch('https://xc-countries-api.fly.dev/api/countries/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newCountryName,
          code: newCountryCode
        })
      })
        .then(response => response.json())
        .then(data => {
          alert(`New country added: ${data.name}`);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  const addState = () => {
    const newStateName = document.getElementById('newStateName').value;
    const newStateCode = document.getElementById('newStateCode').value;

    if (selectedCountry && newStateName && newStateCode) {
      fetch('https://xc-countries-api.fly.dev/api/states/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: newStateCode,
          name: newStateName,
          countryId: selectedCountry
        })
      })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <div>
      <h1>Country and State Dropdowns</h1>

      <label htmlFor="country">Select a Country:</label>
      <select id="country" onChange={getStates}>
        <option value="">Select</option>
        {countries.map(country => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>

      <label htmlFor="state">Select a State:</label>
      <select id="state">
        <option value="">Select</option>
        {states.map(state => (
          <option key={state.code} value={state.code}>
            {state.name}
          </option>
        ))}
      </select>

      <br /><br />

      <h2>Add New Country</h2>
      <label htmlFor="newCountryName">Country Name:</label>
      <input type="text" id="newCountryName" />
      <label htmlFor="newCountryCode">Country Code:</label>
      <input type="text" id="newCountryCode" />
      <button onClick={addCountry}>Add Country</button>

      <h2>Add New State</h2>
      <label htmlFor="selectedCountry">Select a Country:</label>
      <select id="selectedCountry" onChange={(e) => setSelectedCountry(e.target.value)}>
        <option value="">Select</option>
        {countries.map(country => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </select>
      <label htmlFor="newStateCode">State Code:</label>
      <input type="text" id="newStateCode" />
      <label htmlFor="newStateName">State Name:</label>
      <input type="text" id="newStateName" />
      <button onClick={addState}>Add State</button>
    </div>
  );
};

export default CountryAndStateDropdowns;

