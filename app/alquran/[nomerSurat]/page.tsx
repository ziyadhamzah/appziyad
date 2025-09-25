// type declaration = deklarasi tipe data
type TipeDataParameterQuran = {
    nomerSurat:string
}
type TipeDataHasilFetchinganAPIQuran = {
    data:{
        namaLatin:string
        jumlahAyat:number
    }
}
type TipeDataUntukDisempilkeAPI = string
async function fetchDataQuran(angkaUrutan:TipeDataUntukDisempilkeAPI){
    const mentahanAPIQuran = await fetch(`https://equran.id/api/v2/surat/${angkaUrutan}`)
    const dataSurat:TipeDataHasilFetchinganAPIQuran = await mentahanAPIQuran.json()
    return dataSurat.data
}
    
export default async function QuranTersotir(
    {params}:{params:Promise<TipeDataParameterQuran>}
) {
    const {nomerSurat} = await params
    const informasiSurat = await fetchDataQuran(nomerSurat)
    return(
        <div>
            <h1>Nama surat nya adalah: {informasiSurat.namaLatin}</h1>
            <h1>jumlahAyat: {informasiSurat.jumlahAyat}</h1>
        </div>
    )
}