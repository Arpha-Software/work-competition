import { Categories } from '@/sections/Home/Categories';

export default async function Home() {
  return (
    <main>
      <h1 className='sr-only'>Categories</h1>

      <Categories />
    </main>
  );
}
