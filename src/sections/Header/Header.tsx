import { Container } from '@/components/Container';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className='px-5 py-7 bg-primary rounded-b-lg sticky top-0 md:py-4.5'>
      <Container>
        <h1 className={styles.title}>
          <span className='px-8 text-center text-white text-sm md:text-4.5xl/[56px]'>
            Конкурс «Мистецтво безпеки праці»
          </span>
        </h1>
      </Container>
    </header>
  );
};
