import React, { useState } from 'react';
import styles from './NationCard.module.scss';
import { BankCard } from './BankCard';

export const NationCard = ({countryName, description, budget, season}) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const tabContArr = [
    {
      index: 0,
      tabTitle: countryName?.[0] ,
      tabCont: description?.[0],
      tabBudget: budget?.[0],
      tabSeason: season?.[0]
      
    },
    {
      index: 1,
      tabTitle: countryName?.[1] ,
      tabCont: description?.[1],
      tabBudget: budget?.[1],
      tabSeason: season?.[1]
    },
    {
      index: 2,
      tabTitle: countryName?.[2] ,
      tabCont: description?.[2],
      tabBudget: budget?.[2],
      tabSeason: season?.[2]
    },
  ];

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  const handleBackClick = () => {
    setSelectedIndex(null);
  };

  return (
    <div className={styles.NationCardWrapper}>
      <div className={styles.NationCardContainer}>
        {tabContArr
          .filter((section) => selectedIndex === null || section.index === selectedIndex)
          .map((section) => (
            <div
              key={section.index}
              className={`${styles.CardContainer} ${selectedIndex === section.index ? styles.selected : ''}`}
              onClick={() => handleClick(section.index)}
            >
              <div className={styles.TabContentImage}></div>
              <p className={styles.TabTitle}>{section.tabTitle}</p>
              <p>{section.tabBudget}</p>
              <p>{section.tabSeason}</p>
              <div className={styles.TabContentItem}>
                <span className={styles.TabContentDetail}>
                  {section.tabCont}
                </span>
              </div>
            </div>
          ))}


      {selectedIndex !== null && (
        <div className={styles.BankCardWrapper}>
          <BankCard index={selectedIndex} onBackClick={handleBackClick} />
        </div>
      )}

      </div>

    </div>
  );
};
