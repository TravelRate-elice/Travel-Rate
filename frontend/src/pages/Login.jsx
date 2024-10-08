import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from '../css/Login.module.scss'
import { userLogin } from "../api/user";

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [pw, setPw] = useState('')
    const [show, setShow] = useState(true)
    const handleSetEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleSetPw = (e) => {
        setPw(e.target.value)
    }

    const handleShow = () => {
        setShow(!show)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const userInfo = {
            'email': email,
            'password': pw
        }
        const response = await userLogin(userInfo)
        
        if (response.status=== 200) {
            localStorage.setItem('accessToken',response.data.data.access_token)
        
            localStorage.setItem('memId', response.data.data.id)
            navigate('/')
        } else {
            
            alert('다시 로그인해주세요.')
            
        }
    }

    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginInnerContainer}>

                <div className={styles.loginTopSection}>
                    <p className={styles.loginTitle}>로그인</p>
                    <div className={styles.emailInput}>
                        <input autoFocus={true} type="email" value={email} onChange={handleSetEmail} placeholder="이메일" />
                    </div>
                    <div className={styles.pwInput}>
                        <input type={show ? "password": "text"}  value={pw} onChange={handleSetPw} placeholder="비밀번호"/>
                        <img src={show ? "/eyeon.png" : "/eyeoff.png"}  alt="eye" className={styles.pwImg} onClick={handleShow}/>
                    </div>
                </div>

                <div className={styles.linkBox}>

                    <button type="submit" className={styles.loginBtn} onClick={handleSubmit}>
                        로그인
                    </button>

                    <span className={styles.subText}>환율 정보와 혜택을 받고싶으시다면? <Link to={'/signup'}>회원가입</Link></span>
                
                </div>

        
            </form>
        </div>
    )
}

export default Login