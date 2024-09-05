import React, { useState, useEffect, useRef } from "react"
import styles from './SearchBar.module.scss'
import { recommendCountries } from "../../api/recommend"
import { NationCard } from "./NationCard"


export const SearchBar = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isTabVisible, setIsTabVisible] = useState(false)
    const [isTabVisible2, setIsTabVisible2] = useState(false)

    const [isTravelClicked, setIsTravelClicked] = useState(false)
    const [isBudgetClicked, setIsBudgetClicked] = useState(false)

    const [isHovered, setIsHovered] = useState(false)
    const [selectedTabTitle, setSelectedTabTitle] = useState()
    const [budgetInputValue, setBudgetInputValue] = useState("")


    const [showNationCard, setShowNationCard] = useState(false)
  

    const tabNum = useRef()

   const [countryName, setCountryName] = useState([])
   const [description, setDescription] = useState([])
   const [season, setSeason] = useState([])
    const [budget, setBudget] = useState([])

    const tabRef = useRef(null)
    const tabRef2 = useRef(null)

    const tabClickHandler = (index) => {
        setActiveIndex(index)
    }

    const tabContArr = [
      
        { index: 50, tabTitle: "동북아", tabCont: ["중국", "홍콩", "일본"] },
        { index: 60, tabTitle: "동남아", tabCont: ["브루나이", "인도네시아", "말레이시아", "싱가포르", "태국"] },
        { index: 20, tabTitle: "중동", tabCont: ["아랍에미리트", "바레인", "쿠웨이트", "사우디"] },
        { index: 10, tabTitle: "북미", tabCont: ["미국", "캐나다"] },
        { index: 40, tabTitle: "유럽", tabCont: ["유로존", "스위스", "덴마크", "영국", "노르웨이", "스웨덴"] },
        { index: 30, tabTitle: "오세안주", tabCont: ["호주", "뉴질랜드"] }
    ]

    const handleClickOutside = (event) => {
        if (tabRef.current && !tabRef.current.contains(event.target)) {
            setIsTabVisible(false)
            setIsTravelClicked(false)
        }
    }

    const handleClickOutside2 = (event) => {
        if (tabRef2.current && !tabRef2.current.contains(event.target)) {
            setIsTabVisible2(false)
            setIsBudgetClicked(false)
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside)
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    useEffect(() => {
        document.addEventListener("click", handleClickOutside2)
        return () => {
            document.removeEventListener("click", handleClickOutside2)
        }
    }, [])

    const searchBarClass = `${styles.SearchBar} ${isTravelClicked || isBudgetClicked ? styles.inactive : ''}`


    const handleRecommendCountry = async() => {
        
        const userInfo = {
            'continent_id': tabNum.ref,
            'budget': budgetInputValue
        }
        
        const response = await recommendCountries(userInfo)

        if (response.status === 200) {
           setCountryName((current) => {
            const newArr = [...current]
            newArr.push(response.data.country_name)
            return
           })
           setDescription((current) => {
            const newArr = [...current]
            newArr.push(response.data.description)
            return
           })
           setSeason((current) => {
            const newArr = [...current]
            newArr.push(response.data.season)
            return
           })
           setBudget((current) => {
            const newArr = [...current]
            newArr.push(response.data.budget)
            return
           })
        }
    }


    const handleSubmit = () => {
        if (selectedTabTitle && budgetInputValue) {
            setIsTabVisible(false)
            setIsTabVisible2(false)
            setIsBudgetClicked(false)
            setIsTravelClicked(false)
        } else {
            alert('대륙선택과 예산입력을 완료해주세요.')
        }
        setShowNationCard(true)
        handleRecommendCountry()
    }




    const handleBudgetInputChange = (e) => {
        setBudgetInputValue(e.target.value)
    }

    const handleBudgetSubmit = () => {
        if (!isNaN(budgetInputValue) && budgetInputValue.trim() !== "") {
            setIsBudgetClicked(true)
            setIsTabVisible2(false)
        } else {
            alert("숫자로 예산을 입력해주세요.")
        }
    }


    return (
        <div className={styles.MainContainer}>
            <form className={searchBarClass}>
                <div
                    className={`${styles.TravelDestinationContainer} ${isTravelClicked ? styles.clicked : isBudgetClicked ? styles.inactive : ''}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => {
                        setIsTabVisible(true)
                        setIsTravelClicked(true)
                        setIsBudgetClicked(false)
                        setIsTabVisible2(false)
                    }}
                >
                    <p className={styles.TravelDestination}>여행지</p>
                    <p className={styles.TravelDestinationSearch}>{selectedTabTitle || "여행지 검색"}</p>
                </div>

                {isTabVisible && (
                    <div className={styles.TabSetting}>
                        <ul className={styles.TabList}>
                            {tabContArr.map((section, index) => (
                                <p
                                    key={index}
                                    className={`${styles.TabItem} ${index === activeIndex ? styles.isActive : ''}`}
                                    onClick={() => tabClickHandler(index)}
                                >
                                    {section.tabTitle}
                                </p>
                            ))}
                            <div className={styles.ClickSlideWrapper}>
                                <div className={styles.ClickSlide} style={{ left: `${activeIndex * 14.2857}%` }}></div>
                            </div>
                        </ul>

                        <div className={styles.TabContentContainer}>
                            {Array.isArray(tabContArr[activeIndex].tabCont) ? (
                                tabContArr[activeIndex].tabCont.map((item, idx) => (
                                    <span key={idx} className={styles.TabContentItem}>
                                        {item}
                                    </span>
                                ))
                            ) : (
                                <span className={styles.TabContentItem}>
                                    {tabContArr[activeIndex].tabCont}
                                </span>
                            )}
                        </div>
                        <button className={styles.ContinentBtn} onClick={(e) => {
                            e.preventDefault()
                            tabNum.ref = tabContArr[activeIndex].index
                            setSelectedTabTitle(tabContArr[activeIndex].tabTitle)
                            setIsBudgetClicked(true)
                            setIsTabVisible2(true)
                            setIsTravelClicked(false)
                            setIsTabVisible(false)
                            }}>대륙 선택</button>
                    </div>
                )}

                <div
                    onClick={() => {
                        setIsTabVisible2(true)
                        setIsBudgetClicked(true)
                        setIsTravelClicked(false)
                        setIsTabVisible(false)
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`${styles.BudgetContainer} ${isBudgetClicked ? styles.clicked : isTravelClicked ? styles.inactive : ''}`}
                >
                    <p className={styles.Budget}>예산</p>
                    <p className={styles.BudgetInput}>{budgetInputValue || "예산 입력"}</p>
                </div>

                {isTabVisible2 && (
                    <div className={styles.BudgetSetting}>
                        <p className={styles.BudgetSettingTitle}>예산 입력</p>
                        <div className={styles.BudgetSettingInputContainer}>
                            <input
                                autoFocus
                                className={styles.BudgetSettingInput}
                                placeholder="원화로 예산을 입력하세요."
                                value={budgetInputValue}
                                onChange={handleBudgetInputChange}
                            />
                            <span className={styles.won}>원</span>
                            <p className={styles.line}></p>
                        </div>
                        <p className={styles.BudgetSettingSubtext}>입력하신 예산을 기준으로 가장 가성비 좋은 여행지를 추천해드려요!</p>
                        <button
                            className={styles.BudgetBtn}
                            onClick={(e) => {
                                e.preventDefault()
                                handleBudgetSubmit()
                            }}
                        >완료</button>
                    </div>
                )}

                <img 
                    className={styles.SearchImg} 
                    onClick={() => {
                        handleSubmit()
                    }} 
                    src="/search.svg" 
                    alt="searchButton" 
                />
            </form>

            <div className={styles.underline}></div>
            {showNationCard && <NationCard  countryName={countryName} description={description} budget={budget} season={season}/>}
        </div>
    )
}
