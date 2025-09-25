// library unction panggilan,siap pakai,bukan untuk menampilkan komponen
// pr = mentanslate nomer value data di kolam nama surat menjadi nama latin sesuai JSON api
// form create maupun edit = tambah input
export async function fetchDataQuran():
    Promise<{
        nomor:number // untuk indeks nomer surat
        namaLatin:string // untuk nama surat
        jumlahAyat:number // untuk jumlah ayat
    }[]> // [] agar bila di panggil fetching datanya 1 kali
{
    const res = await fetch("https://equran.id/api/v2/surat")
    const json = await res.json()
    return json.data 
}