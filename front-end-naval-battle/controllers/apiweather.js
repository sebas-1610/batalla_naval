export async function getWeatherData(location, countryCode) {
    const apiKey = '96d54f2170d16e2a38b8ea9c83657167';
    
    // Primero intenta con "Nombre País, Código"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location},${countryCode}&units=metric&lang=es&appid=${apiKey}`;
    
    try {
        let response = await fetch(url);
        
        // Si falla, intenta solo con el código de país
        if (!response.ok) {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${countryCode}&units=metric&lang=es&appid=${apiKey}`;
            response = await fetch(url);
        }
        
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
        
        const data = await response.json();
        return {
            temperature: data.main.temp,
            conditions: data.weather[0].description,
            icon: data.weather[0].icon,
            actualLocation: data.name // Nombre real del lugar encontrado
        };
    } catch (error) {
        console.error("Error en getWeatherData:", error.message);
        return null;
    }
}