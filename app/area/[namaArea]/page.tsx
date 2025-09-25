type TipeDataParameterURL = {
    namaArea : string
}
async function fetchDataArea(namaAreaUntukEndpoint:string) {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${namaAreaUntukEndpoint}&format=json&addressdetails=1,`,{
        headers:{
            'Accept-Language':'en' //biar ga bahasa fuyo
        }
    })
    const data = await res.json()
    return{
        lat:data[0].lat,
        lon:data[0].lon,
        display_name:data[0].display_name,
        country_code: data[0].address.country_code,
        country: data[0].address.country
    }
}

async function fetchDataCuaca(lat:string,lon:string) {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`)
    const dataMeteoMateng = await res.json()
    return dataMeteoMateng.current_weather
}

async function fetchDataWaktu(lat:string,lon:string) {
    const res = await fetch(`https://timeapi.io/api/Time/current/coordinate?latitude=${lat}&longitude=${lon}`)
    const dataTimeMateng = await res.json()
    return dataTimeMateng
}

async function fetchMataUang(countryCode:string) {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
    const dataUangMateng = await res.json()

    const currencies = dataUangMateng[0].currencies
    const currencyKey = Object.keys(currencies)[0]
    return {
        code:currencyKey,
        symbol:currencies[currencyKey].symbol,
        name:currencies[currencyKey].name,
    }
}
async function fetchKurs(currencyCode: string){
    if (currencyCode === "IDR") {
        return { rate: 1, base: "IDR" };
    }

    const response = await fetch(`https://api.frankfurter.app/latest?from=${currencyCode}&to=IDR`)
    const kursData = await response.json()
    return {
        rate: kursData.rates.IDR,
        base: currencyCode,
    }
}

export default async function HalamanInfoWilayah(
    {params}:{params:Promise<TipeDataParameterURL>}
){
    const {namaArea} = await params
    const lokasi = await fetchDataArea(namaArea)
    const cuaca = await fetchDataCuaca(lokasi.lat,lokasi.lon)
    const waktu = await fetchDataWaktu(lokasi.lat,lokasi.lon)
    const mataUang = await fetchMataUang(lokasi.country_code)
    const kurs = await fetchKurs(mataUang.code)
    return(
        <div>
            <h1>
                informasi wilayah: {lokasi.display_name}
            </h1>
            <h3>kordinat bumi: {lokasi.lat},{lokasi.lon}</h3>
            <h3>suhu: {cuaca.temperature}°C</h3>
            <h3>kecepatan angin: {cuaca.windspeed} km/h</h3>
            <h3>tanggal: {waktu.date}</h3>
            <h3>waktu: {waktu.time}</h3>
            <h3>hari: {waktu.dayOfWeek}</h3>
            <h3>Mata Uang: {mataUang.name}</h3>
            <h3>kurs ke indo: {kurs.rate.toLocaleString('id-ID')}</h3>
        </div>
    )
}