import { Categories } from '@/sections/Home/Categories';
import { Partners } from '@/sections/Home/Partners';

export default async function Home() {
  return (
    <main>
      <h1 className='sr-only'>Categories</h1>

      <Categories />

      <Partners />
    </main>
  );
}
