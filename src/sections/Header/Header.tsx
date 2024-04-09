import cn from '@/tools/cn';

import { Container } from '@/components/Container';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className='relative px-5 pt-7 pb-15 bg-primary rounded-b-lg sticky top-0 md:pt-4.5 z-10 overflow-hidden'>
      <Container>
        <div className='px-8 text-center text-white text-sm md:text-4.5xl/[56px]'>
          Конкурс «Мистецтво безпеки праці»
        </div>
      </Container>

      <div className={cn(styles.pattern, 'absolute bottom-0 left-0 h-10 w-full')}></div>
    </header>
  );
};
