import { Header } from '@/sections/Header';
import { Footer } from '@/sections/Footer';
import { Categories } from '@/sections/Home/Categories';

export default async function Home() {
  return (
    <main>
      <Header />

      <Categories />

      <Footer />
    </main>
  );
}
