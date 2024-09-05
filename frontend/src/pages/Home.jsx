import React from "react";
import { Scroll } from "../components/home/Scroll";
import styles from '../css/Home.module.scss'

const Home = () => {
    return (
        <div className={styles.Home}>
            <Scroll />
        </div>
    )
}

export default Home