import React, { useState } from "react";
import styles from '../../css/Slider.module.scss'

export default function Slider() {

    const [sliderValue, setSliderValue] = useState(0);
    const [warning, setWarning] = useState(false)
    const handleSliderChange = (event) => {
        const inputValue = event.target.value
        if (inputValue < 0 || inputValue > 5000) {
            setWarning(true)
        }
        else {
            setWarning(false)
        }
        setSliderValue(inputValue ? parseInt(inputValue) : 0);
    }
    const min = 0
    const max = 5000
    return(
        <div className={styles.SliderContainer}>

            <div className={styles.sliderWrapper}>
                {warning && <div className={styles.warningBox}>
                    <p className={styles.warningMessage}>
                    0 ~ 5000 사이의 숫자만 가능합니다.
                    </p>   
                </div>}
                <div className={styles.mainSlider}>
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={1}
                    value={sliderValue}
                    onChange={(event) => {
                        setSliderValue(event.target.value);
                    }}
                    className={styles.sliderWrapper}
                    />
                </div>


            </div>

            <div className={styles.textBox}>
                <p className={styles.text}>
                    <input type="text" 
            
                    className={styles.textInput}
                    value={sliderValue}
                    onChange={handleSliderChange}
                    />
                <img className={styles.textBoxWon} src="/won.png" alt="won" />
                    
                </p>
            </div>

        </div>
    )
}