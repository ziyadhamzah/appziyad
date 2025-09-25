"use client" // wajib use client di komponen yg menggunakan useState dan useEffect
import DropdownSurat from '@/components/combobox/dropdown-surat'
import DropdownAyat from '@/components/combobox/dropdown-ayat'
import React from 'react'

export default function page() {
  const [valueSurat, setValueSurat] = React.useState("1") // menenntukan defult value surat ="1"
  const [valueAyat, setValueAyat] = React.useState("1") // menentukan defult value ayat = "1"
  return (
    <div>
          <DropdownSurat 
            suratTerpilih={valueSurat}
            suratYgBerubah={(suratYgUpdate) => setValueSurat(suratYgUpdate)}
          />
          <DropdownAyat
            valueSurat={valueSurat}
            ayatTerpilih={valueAyat}
            ayatYgBerubah={(nomorAyat)=>setValueAyat(nomorAyat.toString())} // mengubah value ayat menjadi string
          />
    </div>
  )
}
