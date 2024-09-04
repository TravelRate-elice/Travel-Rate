import React, { useState } from 'react';
import styles from './NationCard.module.scss';
import { BankCard } from './BankCard';

export const NationCard = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const tabContArr = [
    {
      index: 0,
      tabTitle: "여행지명0",
      tabCont: "여행지상세0"
    },
    {
      index: 1,
      tabTitle: "여행지명1",
      tabCont: "여행지상세1"
    },
    {
      index: 2,
      tabTitle: "여행지명2",
      tabCont: "여행지상세2"
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
