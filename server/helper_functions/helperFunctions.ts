export const fetchKey = async (query: string) => {
    try {
        const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${process.env.API_KEY}&q=${query}`)
        const data = await response.json();
        if (data.length < 1) {
            throw new Error('Not a valid city');
          }
        const city = data.find((city: any) => city.AdministrativeArea.LocalizedName === query)
        return city;
    } catch (err) {
        throw err
    }
}

export const fetchWeather = async (key: number) => {
    try {
        const response = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${process.env.API_KEY}`)
        const data = await response.json();
        return [{...{key: key},...data[0]}];
    } catch (err) {
        return err
    }
}

