import React, { useState} from "react";
import Dropdown from "../components/exchangeRatio/Dropdown";
import styles from '../css/ExchangeRatio.module.scss'
import Slider from "../components/exchangeRatio/Slider";

const ExchangeRatio = () => {
    const [countries, setCountries] = useState("")
    const [helpActive, setHelpActive] = useState(false)
    const [goalRate, setGoalRate] = useState("")
    const [submitList, setSubmitList] = useState([])
    const [isAnimating, setIsAnimating] = useState(false);
    

    const toggleHelp = () => {
        setHelpActive(!helpActive);
    }
    const handleDelete = (index) => {
        setSubmitList((current) => current.filter((_, i) => i !== index));
    };

    const handleChangeRate = (event) => {
        const selectedRate = event.target.value
        setGoalRate(selectedRate)
    }

    const handleChangeCountry = (event) => {  
        const selectedCountry = event.target.value
        setCountries(selectedCountry)
    }


  
    const handleAnimationEnd = () => {
        setIsAnimating(false); 
    };

    const handleSubmit = () => {
        if (!countries || !goalRate) {
            alert('국가와 목표 환율을 모두 선택하세요.');
            return;
        }
        const obj = {
            country: countries,
            targetRate: goalRate
        }
        if (submitList.length <= 3) {
            setSubmitList((current)=>
                [...current, obj])
            setCountries("")
            setGoalRate("")
            setIsAnimating(true);

    } else {
        return alert('최대 3개 국가 까지 추가 가능합니다.')
    }
        
    }

    return (
        <div className={styles.ExchangeRatio}>
            <header></header>
            <main>
                <div className={styles.upperSideContents}>
                    <div className={styles.helpcontents}>
                        <p className={styles.helpDialogue}>도움말 설정</p>
                        <div className={styles.helpCheckBox} onClick={toggleHelp}>
                            {helpActive ?  <img src="/check.png" alt="check" style={{position:"absolute", marginTop:'-54px', marginLeft:'-27px'}}/> : ''}    
                        </div> 
                    </div>

                <div className={styles.goalContents}>
                    <select onChange={handleChangeCountry} name="" id=""  className={styles.dropdownContainer}>
                        <option value="">국가를 선택해주세요</option>
                        <Dropdown/>
                    </select>
                </div>
                {helpActive && (
                        <div className={styles.helpText1}>
                            1. 목표 환율을 설정하려면 국가를 선택하세요.
                        </div>
                    )}


                </div>
                <div className={styles.sliderContainer} onChange={handleChangeRate}>
                <Slider/>
                {helpActive && (
                        <div className={styles.helpText2}>
                            
                            2. 1부터 5000까지 슬라이더를 움직여 목표 환율을 설정하세요.
                        </div>
                    )}
                </div>
                <div className={styles.alarmPlus}>
                <img src="/add.png" alt="plus-img" onClick={handleSubmit} className={styles.plusImage}/>
                 <p>환율알림 추가</p>
                 <img
        src="/airplane.svg"
        alt="plane-img"
        onAnimationEnd={handleAnimationEnd}
        className={`${styles.planeImg} ${isAnimating ? styles.planeAnimate : ''}`}
      />
                 {helpActive && (
                        <div className={styles.helpText3}>
                            3. 국가명과 목표 환율을 선택한 뒤 알림추가 버튼을 누르시면 알림목록에 추가됩니다.
                        </div>
                    )}
                </div>
                    <div className={styles.alarmDialogues}>
                        <span className={styles.alarmDialogueSmall}>최대 3개국/오전 11시 마다 업데이트</span>
                        <span className={styles.alarmDialogueBig}>환율 수정 / 삭제</span>
                    </div>
                <div className={styles.lowerSideContents}>

                    <div className={styles.lowerSideContentsInner}>

                    {submitList.length <= 3 && submitList.map((item, index) => (
                            <div key={index} className={styles.lowerSideCountry}>
                                <p>국가 이름: {item.country}</p>
                                <p>설정하신 환율(원화기준): {item.targetRate}원</p>
                                  </div>
                        ))}

                        {/* {submitList.length < 3 && submitList && <div className={styles.lowerSideCountry1} >
                        <img src="/flag-sample.png" alt="flag1" className={styles.flag1}/>
                        <p className={styles.lowerSideCountry1Name}>{submitList.country}</p>
                            <img src='/modify.png' alt="modify"className={styles.country1Modify} />
                            <img src="/cancel.png" alt="delete" className={styles.country1Delete}/>
                        </div>}
                        <hr />
                        <div className={styles.lowerSideCountry2}>
                        <img src="/flag-sample2.png" alt="flag2"  className={styles.flag2} />
                        <p className={styles.lowerSideCountry2Name}>국가명 통화코드 환율</p>
                            <img src="/modify.png" alt="modify" className={styles.country2Modify}/>
                            <img src="/cancel.png" alt="delete" className={styles.country2Delete}/>
                        </div>
                        <hr />
                        <div className={styles.lowerSideCountry3}>
                        <img src="/flag-sample3.png" alt="flag3"  className={styles.flag3}/>
                        <p className={styles.lowerSideCountry3Name}>국가명 통화코드 환율</p>
                            <img src="/modify.png" alt="modify" className={styles.country3Modify}/>
                            <img src="/cancel.png" alt="delete" className={styles.country3Delete}/>
                        </div> */}
                       
                    </div>
                </div>
                {helpActive && (
                    <div className={styles.helpText4}>
                        4. 이곳에 설정된 환율은 수정하거나 삭제할 수 있습니다.
                    </div>
                )}
            </main>
        </div>
    )
}

export default ExchangeRatio;