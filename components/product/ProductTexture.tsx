import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/sections/Reveal";

export function ProductTexture({
  image,
  title,
  text,
}: {
  image: string;
  title: string;
  text: string;
}) {
  return (
    <section className="section-padding">
      <div className="container-shell grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="image-soft-mask relative aspect-[5/4]">
            <Image src={image} alt={title} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Card className="p-5 sm:p-10">
            <h2 className="text-balance font-heading text-[clamp(2.1rem,9vw,3rem)] font-semibold text-deep-olive">
              {title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-text-dark/70 sm:mt-5 sm:text-base sm:leading-8">{text}</p>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
