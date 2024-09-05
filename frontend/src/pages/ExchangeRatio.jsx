import React, { useState} from "react";
import Dropdown from "../components/exchangeRatio/Dropdown";
import styles from '../css/ExchangeRatio.module.scss'
import Slider from "../components/exchangeRatio/Slider";
import { targetAdd, targetList, targetModify, targetDelete } from "../api/target";
import { useMemo } from "react";
import { targetDetail } from "../api/targetDtail";
import { useRef } from "react";


const ExchangeRatio = () => {
    const [countries, setCountries] = useState("")
    const [helpActive, setHelpActive] = useState(false)
    const [goalRate, setGoalRate] = useState("")
    const [submitList, setSubmitList] = useState([])
    const [isAnimating, setIsAnimating] = useState(false);
    const [isHovered, setIsHovered] = useState(false)
    const [hoveredEditIndex, setHoveredEditIndex] = useState(null)
    const [hoveredDeleteIndex, setHoveredDeleteIndex] = useState(null)
    const [targets, setTargets] = useState([])
    const flagRef = useRef(false)
    const memId = localStorage.getItem('memId')
    const token = localStorage.getItem('accessToken')

    useMemo(() => {
        const fetchTargets= async () => {
        try {
            const response = await targetList(memId, token);
           
            if (response.status === 200 && response.data && Array.isArray(response.data.data)) {
              flagRef.ref = true
                setTargets((current)=>{
                    const newArray = [...current]
                    if (response.data.data.length <= 3) {
                        newArray.push(response.data.data)
                    } else {
                        alert('최대 3개까지 추가가능합니다.')
                    }
                    return newArray
                }
            )}
        } catch (error) {
            console.error('Failed to fetch target list:', error);
        }}
        
    fetchTargets()
 
    if (flagRef.ref) {
        window.location.reload();
        flagRef.ref = false
    }
    }, [])




    const toggleHelp = () => {
        setHelpActive(!helpActive);
    }
    const handleDelete = async(index) => {
       await targetDelete(index)
    };

    const handleEdit = async(index) => {
        await targetModify(index)
    }

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
    const handleTargetAdd = async() => {  
        const targetInfo = {
            'memId': memId,
            'ctrId': countries,
            'chgRate': goalRate
        }
        const response = await targetAdd(targetInfo,token)
        if (response.status === 200) {
           
            console.log('성공')
        } else if (response.status === 409) {
            alert('최대 3개국까지 입력가능합니다.')
        }
    }

    const handleSubmit = () => {
        if (!countries || !goalRate) {
            alert('국가와 목표 환율을 모두 선택하세요.');
            return;
        }
     
      
        if (targets.length <= 3) {
            
            handleTargetAdd()
       
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
                            {helpActive ?  <img src="/exchange/check.svg" alt="check" className={styles.checkImg} style={{position:"absolute", top:'-60px', right: '-57px'}}/> : ''}    
                        </div> 
                    </div>

                <div className={styles.goalContents}>
                    <select onChange={handleChangeCountry} name="" id=""  className={styles.dropdownContainer}>
                        <option value="">국가를 선택해주세요</option>
                        <Dropdown/>
                    </select>
                    <img src="/exchange/down.svg" alt="down" className={styles.downImg} />
                </div>
                {helpActive && (
                        <div className={styles.helpText1}>
                            1) 목표 환율을 설정하려면 국가를 선택하세요.
                        </div>
                    )}


                </div>
                <div className={styles.sliderContainer} onChange={handleChangeRate}>
                <Slider/>
                {helpActive && (
                        <div className={styles.helpText2}>
                            
                            2) 1부터 5000까지 슬라이더를 움직여 목표 환율을 설정하세요.
                        </div>
                    )}
                </div>
                <div className={styles.alarmPlus}>
                    <img 
                        src={isHovered ? "/exchange/add_click.svg" : "/exchange/add_gray.svg"}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        alt="plus-img" 
                        onClick={handleSubmit} 
                        className={styles.plusImage}/>
                    <p className={styles.alertAddText}>환율알림 추가</p>
                    <img
                        src="/airplane.svg"
                        alt="plane-img"
                        onAnimationEnd={handleAnimationEnd}
                        className={`${styles.planeImg} ${isAnimating ? styles.planeAnimate : ''}`}
                    />
                    {helpActive && (
                            <div className={styles.helpText3}>
                                3) 국가명과 목표 환율을 선택한 뒤 알림추가 버튼을 누르시면 알림목록에 추가됩니다.
                            </div>
                        )}
                </div>
                    <div className={styles.alarmDialogues}>
                        <span className={styles.alarmDialogueSmall}>최대 3개 추가 가능 / 환율정보 오전 11시 마다 업데이트</span>
                        <div className={styles.alarmDialogueBigs}>
                            <span className={styles.alarmDialogueBig1}>수정</span>
                            <span className={styles.alarmDialogueBig2}>삭제</span>
                        </div>
                    </div>
                    <p className={styles.underLine}></p>
                <div className={styles.lowerSideContents}>

                    <div className={styles.lowerSideContentsInner}>

                    {submitList.length <= 3 && targets.map((item, index) => (
                            <>
                            
                            <div key={0} className={styles.lowerSideCountry}>
                                <div className={styles.lowerSideTexts}>
                                {item[0] &&<span>국가 이름: {item[0]?.ctrName} {item[0]?.curCode}</span>}
                                    {item[0] && <span>설정하신 환율(원화기준): {item[0]?.chgRate}원</span>}
                                </div>
                                <div className={styles.images}>
                                    <img 
                                        className={styles.editImg}
                                        src={hoveredEditIndex === 0 ? "/exchange/edit_click.svg" : "/exchange/edit_gray.svg"}
                                        alt="edit" 
                                        onClick={()=>handleEdit(0)}
                                        onMouseEnter={() => setHoveredEditIndex(0)}
                                        onMouseLeave={() => setHoveredEditIndex(null)}
                                    />
                                    <img 
                                        className={styles.deleteImg} 
                                        src={hoveredDeleteIndex === 0 ? "/exchange/delete_click.svg" : "/exchange/delete_gray.svg"}
                                        alt="delete" 
                                        onClick={()=>handleDelete(0)}
                                        onMouseEnter={() => setHoveredDeleteIndex(0)}
                                        onMouseLeave={() => setHoveredDeleteIndex(null)}
                                    />
                                </div>
                            </div>
                            <div key={1} className={styles.lowerSideCountry}>
                            <div className={styles.lowerSideTexts}>
                                {item[1] && <span>국가 이름: {item[1]?.ctrName} {item[1]?.curCode}</span>}
                                {item[1] &&<span>설정하신 환율(원화기준): {item[1]?.chgRate}원</span>}
                            </div>
                            <div className={styles.images}>
                                <img 
                                    className={styles.editImg}
                                    src={hoveredEditIndex === 1 ? "/exchange/edit_click.svg" : "/exchange/edit_gray.svg"}
                                    alt="edit" 
                                    onClick={()=>handleEdit(1)}
                                    onMouseEnter={() => setHoveredEditIndex(1)}
                                    onMouseLeave={() => setHoveredEditIndex(null)}
                                />
                                <img 
                                    className={styles.deleteImg} 
                                    src={hoveredDeleteIndex === 1 ? "/exchange/delete_click.svg" : "/exchange/delete_gray.svg"}
                                    alt="delete" 
                                    onClick={()=>handleDelete(1)}
                                    onMouseEnter={() => setHoveredDeleteIndex(1)}
                                    onMouseLeave={() => setHoveredDeleteIndex(null)}
                                />
                            </div>
                        </div>
                        <div key={2} className={styles.lowerSideCountry}>
                        <div className={styles.lowerSideTexts}>
                        {item[2] &&<span>국가 이름: {item[2]?.ctrName} {item[2]?.curCode}</span>}
                        {item[2] &&<span>설정하신 환율(원화기준): {item[2]?.chgRate}원</span>}
                        </div>
                        <div className={styles.images}>
                            <img 
                                className={styles.editImg}
                                src={hoveredEditIndex === 2 ? "/exchange/edit_click.svg" : "/exchange/edit_gray.svg"}
                                alt="edit" 
                                onClick={()=>handleEdit(2)}
                                onMouseEnter={() => setHoveredEditIndex(2)}
                                onMouseLeave={() => setHoveredEditIndex(null)}
                            />
                            <img 
                                className={styles.deleteImg} 
                                src={hoveredDeleteIndex === 2 ? "/exchange/delete_click.svg" : "/exchange/delete_gray.svg"}
                                alt="delete" 
                                onClick={()=>handleDelete(2)}
                                onMouseEnter={() => setHoveredDeleteIndex(2)}
                                onMouseLeave={() => setHoveredDeleteIndex(null)}
                            />
                        </div>
                    </div>
                    </>
                        ))}

                       
                    </div>
                </div>
                {helpActive && (
                    <div className={styles.helpText4}>
                        4) 이곳에 설정된 환율은 수정하거나 삭제할 수 있습니다.
                    </div>
                )}
            </main>
        </div>
    )
}

export default ExchangeRatio;