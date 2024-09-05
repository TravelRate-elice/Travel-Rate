import React from "react";
import styles from'../../css/DropDown.module.scss'
import useStore from "../../store/store.jsx";
import { currencyList } from "../../api/target.js";
import { useMemo } from "react";
import { useState } from "react";

function Dropdown () {
    const [countries, setCountries] = useState([])
    // const country = useStore()
    // console.log(country)
    // const {storeCountry} = useStore((state) => state)
    useMemo( async()=>{
        const response = await currencyList()
        if (response.status === 200) {
            setCountries(response.data)
        } else {
            alert('데이터를 불러오는데 실패했습니다.')
        }
    }, [countries])
    

    // const countries = [
    //     'CAD 캐나다',
    //     'USD 미국',
    //     'ED 아랍에미리트',
    //     'BHD 바레인',
    //     'BND 브루나이',
    //     'CNH 중국',
    //     'HKD 홍콩',
    //     'IDR 인도네시아',
    //     'JPY 일본',
    //     'KWD 쿠웨이트',
    //     'MYR 말레이시아',
    //     'SAR 사우디아라비아',
    //     'SGD 싱가포르',
    //     'THB 태국',
    //     'AUD 호주',
    //     'NZD 뉴질랜드',
    //     'CHF 스위스',
    //     'DKK 덴마크',
    //     'EUR 유로',
    //     'GBP 영국',
    //     'NOK 노르웨이',
    //     'SEK 스웨덴'
    // ]
    return (
        <>
               
                {countries.map((country, index) => (
                    <option key={index} className={styles.dropdownItem}
                    value={country.ctrId}
                    
                    >
                    {  <>
                    {country.name}
                    {country.code}
                        </>}
                    </option>
                ))}
                </>
   
    )
}

export default Dropdown;
