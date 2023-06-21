A website (can be just a single HTML page) that will use JavaScript to get data from an external REST API. The details are as follows:

    When the page loads, populate a dropdown menu with the results from a GET call to https://xc-countries-api.fly.dev/api/countries/
    When a country is selected from the country dropdown, populate a second dropdown with the results from a GET call to https://xc-countries-api.fly.dev/api/countries/<country_code>/states/
    Once all of that is done, create a way to add a new country by sending a POST call to https://xc-countries-api.fly.dev/api/countries/
    Create a way to add new states by sending a POST call to https://xc-countries-api.fly.dev/api/states/
    
React Frontend

Django backend
