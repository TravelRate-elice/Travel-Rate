import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from '../css/SignUp.module.scss'

const SignUp = () => {

    const [email, setEmail] = useState('')
    const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [emailError, setEmailError] = useState(false);

    const [name, setName] = useState('')

    const [pw, setPw] = useState('')
    const [pwCheck, setPwCheck] = useState('')

    const [show, setShow] = useState(true)
    const [show2, setShow2] = useState(true)
    const [pwCheckErr, setPwCheckErr] = useState(false)

    const handleSetEmail = (e) => {
        setEmail(e.target.value)
         if (!(emailValidate.test(email))) {
            setEmailError(true); 
        } else {
            setEmailError(false); 
        }
    }

    const handleSetName = (e) => {
        setName(e.target.value)
    }

    const handleSetPw = (e) => {
        setPw(e.target.value)
    }
    const handleSetPwCheck = (e) => {
        setPwCheck(e.target.value)
        
    }

    useEffect(() => {
        if (pw && pwCheck) {
            setPwCheckErr(pw !== pwCheck);
        } else if (!pw) {
            setPwCheckErr(false)
        } 
    }, [pw, pwCheck]);


    const handleShow = () => {
        setShow(!show)
    }
    const handleShow2 = () => {
        setShow2(!show2)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (pw !== pwCheck) {
           return alert('비밀번호와 비밀번호 확인이 다릅니다.')
        }
        else if (!(emailValidate.test(email))) {
            return alert('이메일 형식이 올바르지 않습니다.')
        }
        
    }
    return (
        <div className={styles.signContainer}>
        <form className={styles.signInnerContainer}>
        <p className={styles.signTitle}>회원가입</p>
        <div className={styles.emailInput}>
        <input autoFocus={true} type="email" value={email} onChange={handleSetEmail} placeholder="Example@email.com" />
        {email && emailError && <p className={styles.errorMessage}>유효하지 않은 이메일 형식입니다.</p>}
        </div>
        <div className={styles.nameInput}>
        <input type="text" value={name} onChange={handleSetName} placeholder="이름" />
        </div>
        <div className={styles.pwInput}>
        <input type={show ? "password": "text"}  value={pw} onChange={handleSetPw} placeholder="비밀번호"/>
        <img src={show ? "/eyeon.png" : "/eyeoff.png"}  alt="eye" className={styles.pwImg} onClick={handleShow}/>
        </div>
        <div className={styles.pwInputCheck}>
        <input type={show2 ? "password": "text"}  value={pwCheck} onChange={handleSetPwCheck} placeholder="비밀번호 확인"/>
        <img src={show2 ? "/eyeon.png" : "/eyeoff.png"}  alt="eye" className={styles.pwImg2} onClick={handleShow2}/>
        {pwCheckErr && pwCheck && <p className={styles.errorMessage}>비밀번호와 일치하지 않습니다.</p>}
        </div>

        <div className={styles.linkBox}>

        <button type="submit" className={styles.signBtn} onClick={handleSubmit}>
            회원가입
        </button>
        이미 회원이신가요?
     <Link to={'/login'}>
     로그인
     </Link>
        </div>
        </form>
        </div>
    )
}

export default SignUp;