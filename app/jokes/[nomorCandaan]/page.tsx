async function fecthDtaJoke(urutanJoke:string) {

    const responeMentah = await fetch(`https://v2.jokeapi.dev/joke/any?idRange=${urutanJoke}`)
    const dataJoke = await responeMentah.json()
    return dataJoke
}

export default async function candaanYgTersortir(
    {params}:{params:Promise<{nomorCandaan:string}>}
){
    const {nomorCandaan} = await params
    const informasiJoke = await fecthDtaJoke(nomorCandaan)
    return(
        <div>
            informasiJoke.type == "single" ? (
                <h1>pertanyaan candaan: {informasiJoke.setup}</h1>
            <h1>jawaban candaan: {informasiJoke.delivery}</h1>
            )
        </div>
    )
}