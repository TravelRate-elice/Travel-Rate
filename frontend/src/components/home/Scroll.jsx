import React, { useEffect, useState } from "react"
import styles from './Scroll.module.scss'

export const Scroll = () => {
    const [isInViewport, setIsInViewport] = useState(false)

    const checkViewport = () => {
        const airplane = document.querySelector(`.${styles.Airplane1}`)
        const thirdContents = [
            document.querySelector(`.${styles.thirdContent1}`),
            document.querySelector(`.${styles.thirdContent2}`),
            document.querySelector(`.${styles.thirdContent3}`)
        ]

        if (airplane) {
            const rect = airplane.getBoundingClientRect()
            setIsInViewport(rect.top < window.innerHeight && rect.bottom > 0)
        }

        thirdContents.forEach(content => {
            if (content) {
                const rect = content.getBoundingClientRect()
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    content.style.opacity = '1'
                    content.style.transform = 'translateY(0)'
                } else {
                    content.style.opacity = '0'
                    content.style.transform = 'translateY(100px)'
                }
            }
        })
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

            checkViewport()
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
                        <p className={styles.secondSubText1}>다양한 국가의</p>
                        <p className={styles.secondSubText1}>실시간 환율 확인 가능</p>
                        <p className={styles.secondSubText2}>지원 통화 23개, 총 43개 국가</p>
                    </div>

                    <div className={styles.secondDescription2}>
                        <img className={styles.mainCardImg} src="/main_card.svg" alt="card" />
                        <p className={styles.secondSubText1}>추천받은 국가의</p>
                        <p className={styles.secondSubText1}>환율우대 카드까지 추천</p>
                        <p className={styles.secondSubText2}>100% 환율우대카드, 평균 30종 이상</p>
                    </div>

                    <div className={styles.secondDescription3}>
                        <img className={styles.mainAlertImg} src="/main_alert.svg" alt="exchange" />
                        <p className={styles.secondSubText1}>원하는 환율에</p>
                        <p className={styles.secondSubText1}>환전이 가능하도록</p>
                        <p className={styles.secondSubText2}>일정시간마다 자동 이메일 알림 서비스</p>
                    </div>
                </div>
            </div>

            <div className={styles.thirdSection}>
                <div className={styles.thirdContent1}>
                    <img className={styles.mockupImg} src="/mockup1.png" alt="mockup" />
                    <div className={styles.thirdContentTexts}>
                        <div className={styles.topCircle}>
                            <p className={styles.topCircleText}>여행지 추천</p>
                        </div>
                        <p className={styles.middleText}>빠르게 여행계획 세우자!</p>
                        <p className={styles.bottomText}>지금 현재 가기 좋은 여행지 추천받고 빠르게 결정해요.</p>
                    </div>
                </div>

                <div className={styles.thirdContent2}>
                    <img className={styles.mockupImg} src="/mockup2.png" alt="mockup" />
                    <div className={styles.thirdContentTexts}>
                        <div className={styles.topCircle}>
                            <p className={styles.topCircleText}>카드 추천</p>
                        </div>
                        <p className={styles.middleText}>몰랐던 혜택 누리자!</p>
                        <p className={styles.bottomText}>여행지 환율 우대받을 수 있는 카드도 한번에 알아봐요.</p>
                    </div>
                </div>

                <div className={styles.thirdContent3}>
                    <img className={styles.mockupImg} src="/mockup3.png" alt="mockup" />
                    <div className={styles.thirdContentTexts}>
                        <div className={styles.topCircle}>
                            <p className={styles.topCircleText}>환율 알림</p>
                        </div>
                        <p className={styles.middleText}>현명한 여행계획 세우자!</p>
                        <p className={styles.bottomText}>알림받고 내가 정한 환율대로 예산 계획 세워요.</p>
                    </div>
                </div>
            </div>

            <footer>
                <div className={styles.footerInner}>
                    
                    <div className={styles.footerInnerLeft}>
                        <img className={styles.footerLogo} src="/logo1.png" alt="footer-logo" />
                        <p>개인정보처리방침 | 이메일무단수집거부</p>
                        <p>COPYRIGHT ⓒ 2024 트래블레이트 ALL RIGHTS RESERVED.</p>
                    </div>
                    <div className={styles.footerOffice}>
                        <div className={styles.officeDiv}>OFFICE</div>
                        <p>트래블레이트</p>
                        <p>서울특별시 강남구 선릉로 433, 신관 77층</p>
                        <p>사업자등록번호: 000 - 00 -0000</p>
                    </div>
                    <div className={styles.footerContact}>
                        <div className={styles.contactDiv}>CONTACT</div>
                        <p>T 000-000-00000</p>
                        <p>F 000-123-4567</p>
                        <p>E-mail : travelrate@elice.com</p>
                    </div>
                    <div className={styles.footerService}>
                        <div className={styles.serviceDiv}>SERVICE</div>
                        <p>고객센터 : 123-456-7890</p>
                        <p>평 일 : 오전9시-오후6시</p>
                        <p>토요일 : 오전9시-오후2시</p>
                    </div>
                </div>
            </footer>

        </div>
    )
}
