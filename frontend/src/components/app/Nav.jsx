import React, {useState} from "react";
import { Link } from "react-router-dom";
import styles from './Nav.module.scss'

export const Nav = () => {
    const [activeLink, setActiveLink] = useState('')

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName)
    }

    const handleLogoClick = () => {
        setActiveLink('')
    }
    
    return (
        <nav className={styles.navContainer}>
            <Link to={'/'} onClick={handleLogoClick}>
            <img className={styles.logo} src="/logo1.png" alt="logo" />
            </Link>
            <div className={styles.navElement}>
                <Link 
                onClick={() => handleLinkClick('recommendation')}
                to={'/recommendation'}>
                <span className={activeLink === 'recommendation' ? styles.active : ''} >여행지 추천</span>
                </Link>
                <Link 
                onClick={() => handleLinkClick('exchange')}
                to={'/exchange'}>
                <span className={activeLink === 'exchange' ? styles.active : ''}>목표환율 설정</span>
                </Link>        
                <Link 
                onClick={() => handleLinkClick('login')}
                to={'/login'}>
                <span className={activeLink === 'login' ? styles.active : ''}>
                    로그인
                </span>
                </Link>
            </div>

        </nav>
    )
}