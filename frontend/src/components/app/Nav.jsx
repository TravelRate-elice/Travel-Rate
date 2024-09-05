import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './Nav.module.scss'
import { userLogout } from "../../api/user";

export const Nav = () => {
    const navigate = useNavigate()
    const [activeLink, setActiveLink] = useState('')

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName)
    }

    const handleLogoClick = () => {
        setActiveLink('')
    }
    
    const token = localStorage.getItem('accessToken')

    const handleLogout = async(e) => {
        e.preventDefault()
        const response = await userLogout(token)
        
        if (response.status === 200) {
            localStorage.removeItem('accessToken')
            alert('로그아웃 되었습니다. 또 만나요!')
            navigate('/')
        } else {
            alert('다시 시도해 주세요.')
        }
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

                {!token?      
                <Link 
                onClick={() => handleLinkClick('login')}
                to={'/login'}>
                
                <span>  
                    로그인
                </span>
                </Link>
                :
                <Link 
                onClick={handleLogout}
                >
                <span>  
                    로그아웃
                </span>
                </Link>   
            }
            </div>

        </nav>
    )
}