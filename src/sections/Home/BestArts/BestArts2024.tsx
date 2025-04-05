'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { artSections } from '../../../utils/mockedContent';
import styles from './BestArts2024.module.scss';
import { images } from '@/utils/constants';
import { ArrowLink } from '@/components/ArrowLink';

const BestArts2024: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<number>(1);

  const handleSectionClick = (id: number) => {
    setSelectedSection(id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sectionsGrid}>
        {artSections.map((section) => (
          <div
            key={section.id}
            className={`${styles.section} ${selectedSection === section.id ? styles.selected : ''}`}
            onClick={() => handleSectionClick(section.id)}
          >
            <h3>{section.title}</h3>
          </div>
        ))}
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={images.best_arts_2024.main}
          alt="Best Arts 2024 Main Image"
          width={1200}
          height={600}
          className={styles.mainImage}
        />
        <div className={styles.buttonContainer}>
          <ArrowLink href="/2025" className={styles.arrowLink}>
            Взяти участь
          </ArrowLink>
        </div>
      </div>
    </div>
  );
};

export default BestArts2024;
