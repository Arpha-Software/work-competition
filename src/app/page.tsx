import { ArrowLink } from "@/components/ArrowLink";
import { Button } from "@/components/Button";

export default function Home() {
  return (
    <main>
      Home page
      <ArrowLink variant="disabled" href='#'>Подивитись докладніше</ArrowLink>
      <Button variant="secondary">Дізнатись більше</Button>
    </main>
  );
}
