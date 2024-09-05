import React, { useEffect, useState } from "react"
import styles from './Scroll.module.scss'

export const Scroll = () => {
    const [isInViewport, setIsInViewport] = useState(false)

    const checkViewport = () => {
        const airplane = document.querySelector(`.${styles.Airplane1}`)
        if (airplane) {
            const rect = airplane.getBoundingClientRect()
            setIsInViewport(rect.top < window.innerHeight && rect.bottom > 0)
        }
    }

    useEffect(() => {
        const header = document.querySelector(`.${styles.header}`)
        const headerTitle = document.querySelector(`.${styles.headerTitle}`)
        const fixedDescription = document.getElementById(styles.fixedDescription)
        const secondDescriptionTitle = document.querySelector(`.${styles.secondDescriptionTitle}`)
        const secondDescriptionContent = document.querySelector(`.${styles.secondDescriptionContent}`)
        const airplane = document.querySelector(`.${styles.Airplane1}`)

        const handleMouseMove = (e) => {
            if (header && headerTitle) {
                const xRelativeToHeader = e.clientX / header.clientWidth
                const yRelativeToHeader = e.clientY / header.clientHeight

                headerTitle.style.transition = 'transform 0s'
                headerTitle.style.transform = `translate(${xRelativeToHeader * -30}px, ${yRelativeToHeader * -30}px)`
            }
        }

        const handleMouseEnter = () => {
            if (headerTitle) {
                headerTitle.style.transition = 'transform 0.5s ease-in-out'
            }
        }

        const handleMouseLeave = () => {
            if (headerTitle) {
                headerTitle.style.transition = 'transform 0.5s ease-in-out'
                headerTitle.style.transform = 'translate(0, 0)'
            }
        }

        const handleScroll = () => {
            const scrollPosition = window.scrollY
            const fixedDescriptionTriggerHeight = 500
            const secondDescriptionTriggerHeight = 1200

            if (fixedDescription) {
                if (scrollPosition > fixedDescriptionTriggerHeight) {
                    fixedDescription.style.opacity = '1'
                    fixedDescription.style.transform = 'translateY(0)'
                } else {
                    fixedDescription.style.opacity = '0'
                    fixedDescription.style.transform = 'translateY(100px)'
                }
            }

            if (secondDescriptionTitle && secondDescriptionContent) {
                if (scrollPosition > secondDescriptionTriggerHeight) {
                    secondDescriptionTitle.style.opacity = '1'
                    secondDescriptionTitle.style.transform = 'translateY(0)'
                    
                    secondDescriptionContent.style.opacity = '1'
                    secondDescriptionContent.style.transform = 'translateY(0)'
                } else {
                    secondDescriptionTitle.style.opacity = '0'
                    secondDescriptionTitle.style.transform = 'translateY(100px)'
                    
                    secondDescriptionContent.style.opacity = '0'
                    secondDescriptionContent.style.transform = 'translateY(400px)'
                }
            }

            if (airplane && isInViewport) {
                const scrollRatio = Math.min(1, (scrollPosition - fixedDescriptionTriggerHeight) / 700)
                const viewportWidth = window.innerWidth
                const translateX = viewportWidth - airplane.offsetWidth
                const translateY = -airplane.offsetHeight

                airplane.style.transform = `translate(${translateX * scrollRatio}px, ${translateY * scrollRatio}px)`
            }
        }

        if (header) {
            header.addEventListener("mousemove", handleMouseMove)
            header.addEventListener("mouseenter", handleMouseEnter)
            header.addEventListener("mouseleave", handleMouseLeave)
        }

        window.addEventListener("scroll", handleScroll)
        window.addEventListener("resize", checkViewport)

        checkViewport()

        return () => {

            if (header) {
                header.removeEventListener("mousemove", handleMouseMove)
                header.removeEventListener("mouseenter", handleMouseEnter)
                header.removeEventListener("mouseleave", handleMouseLeave)
            }
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", checkViewport)
        }
    }, [isInViewport])

    useEffect(() => {
        checkViewport()
        window.addEventListener('scroll', checkViewport)
        return () => {
            window.removeEventListener('scroll', checkViewport)
        }
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <img className={styles.headerTitle} src="/headerTitle.png" alt="headerTitle" />
                <img className={styles.downArrow} src="/exchange/down.svg" alt="down_icon" />
            </div>

            <div id={styles.fixedDescription}>
                <p className={styles.fixedText1}>트래블 레이트와 함께라면</p>
                <p className={styles.fixedText2}>여행이 현명해집니다.</p>
            </div>

            <div className={styles.airplaneSection}>
                <img className={styles.Airplane1} src="/3dAirplane1.svg" alt="airplane" />
            </div>

            <div className={styles.secondSection}>
                <div className={styles.secondDescriptionTitle}>
                    <p className={styles.secondText1}>똑똑한 소비자를 위한</p>
                    <p className={styles.secondText2}>가성비 여행지 추천</p>
                </div>
                
                <div className={styles.secondDescriptionContent}>
                    <div className={styles.secondDescription1}>
                        <img className={styles.mainCurrencyImg} src="/main_currency.svg" alt="currency" />
                        <p>지원통화</p>
                        <p>23개</p>
                    </div>

                    <div className={styles.secondDescription2}>
                        <img className={styles.mainCardImg} src="/main_card.svg" alt="card" />
                        <p>카드추천</p>
                        <p>평균 30종 이상</p>
                    </div>

                    <div className={styles.secondDescription3}>
                        <img className={styles.mainAlertImg} src="/main_alert.svg" alt="exchange" />
                        <p>원하는 환율에 환전이 가능하도록,</p>
                        <p>알림 서비스</p>
                    </div>
                </div>
            </div>

            <div>
                <img src="" alt="destination" />
                <p>지금 현재 가기 좋은 여행지 추천받고,</p>
                <p>빠르게 여행계획 세우자!</p>
            </div>
            <br />

            <div>
                <img src="" alt="card-recommendation" />
                <p>여행지 환율 우대받을 수 있는 카드 추천받고,</p>
                <p>몰랐던 혜택 누리자!</p>
            </div>
            <br />

            <div>
                <img src="" alt="alert" />
                <p>알림받고 내가 정한 환율대로</p>
                <p>현명한 여행계획 세우자!</p>
            </div>
            <br />
        </div>
    )
}
