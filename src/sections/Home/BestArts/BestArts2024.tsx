'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { artSections } from '../../../utils/mockedContent';
import styles from './BestArts2024.module.scss';
import { images, PAGE_SIZE, API_URL } from '@/utils/constants';
import { ArrowLink } from '@/components/ArrowLink';
import { WorkCard } from '@/components/WorkCard';
import toast from 'react-hot-toast';
import { Loader } from '@/components/Loader';

const BestArts2024: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<number>(1);
  const [works, setWorks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(PAGE_SIZE);
  const [totalPages, setTotalPages] = useState(0);

  const handleSectionClick = (id: number) => {
    setSelectedSection(id);
    setPage(0);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        setIsLoading(true);
        const selectedCategory = artSections.find((section) => section.id === selectedSection)?.title || '';
        const category = selectedCategory === 'Усі категорії 2024 року' ? '' : encodeURIComponent(selectedCategory);
        const response = await fetch(`${API_URL}?page=${page}&size=${pageSize}&category=${category}`);
        const data = await response.json();
        setWorks(data.content);
        setTotalPages(data.totalPages);
      } catch (error: any) {
        toast.error("Помилка при завантаженні робіт");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorks();
  }, [selectedSection, page, pageSize]);

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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center justify-items-center gap-10 mt-10">
        {isLoading && (
          <div className="w-full h-28 flex justify-center items-center">
            <Loader />
          </div>
        )}

        {works && works.map((work, index) => (
          <WorkCard key={index}>
            <WorkCard.File fileAccessLink={{
              accessType: 'public',
              url: work.file.accessLink,
              mimeType: work.file.mimeType
            }} />
            <div className="flex flex-col p-4">
              <WorkCard.Title title={work.fullName} className="h-24 mt-4 mb-4" />
            </div>
          </WorkCard>
        ))}
      </div>
      {!isLoading && works.length === 0 && (
        <div className="w-full h-28 flex justify-center items-center">
          <div>Робіт не знайдено.</div>
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 gap-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 0}
            className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
          >
            &#60;
          </button>

          <span>{page + 1} із {totalPages}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page + 1 >= totalPages}
            className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
          >
            &#62;
          </button>
        </div>
      )}
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
