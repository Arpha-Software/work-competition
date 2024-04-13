import Image from "next/image";
import { Container } from "@/components/Container";
import { repeatArray } from "@/tools/helpers";
import { images } from "@/utils/constants";

import styles from './Partners.module.scss';

export const Partners = () => {
  const partners = repeatArray(Object.values(images.partners), 4);

  return (
    <Container className="relative overflow-hidden my-20">
      <h2 className="sr-only">Партнери</h2>

      <div className="flex gap-10 py-4 w-fit justify-between animate-scroll items-center">
        {partners.map((partner, index) => (
          <div
            key={`${partner}-${index}`}
            className="p-4 rounded bg-white shadow-md w-56 h-32"
          >
            <Image
              src={partner}
              alt={`partner${index}`}
              width={200}
              height={100}
              className="w-full h-full object-contain select-none"
            />
          </div>
        ))}
      </div>

      <div className={styles.fade} />
    </Container>
  )
}
