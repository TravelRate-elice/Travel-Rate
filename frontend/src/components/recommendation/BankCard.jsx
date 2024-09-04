import React from 'react';
import styles from './BankCard.module.scss';

export const BankCard = ({ index, onBackClick }) => {
  return (
    <div className={styles.BankCardContainer}>
      <p className={styles.BankCardTitle}>카드추천</p>
      <p className={styles.BankCardContent}>인덱스가 {index}에 해당하는 카드들 추천</p>
      <button onClick={onBackClick} className={styles.BackButton}>
        뒤로가기
      </button>
    </div>
  );
};
