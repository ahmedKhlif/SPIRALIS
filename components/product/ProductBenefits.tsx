import { CircleCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/sections/Reveal";
import { SectionHeader } from "@/components/sections/SectionHeader";

export function ProductBenefits({ benefits }: { benefits: string[] }) {
  return (
    <section className="section-padding bg-pale-green/35">
      <div className="container-shell space-y-10">
        <Reveal>
          <SectionHeader title="Bénéfices" description="Des gestes ciblés, pensés pour rester doux et lisibles." />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <Reveal delay={index * 0.06} key={benefit}>
              <Card className="h-full p-4 sm:p-6">
                <CircleCheck className="mb-5 h-6 w-6 text-sage" strokeWidth={1.5} />
                <p className="font-semibold leading-7 text-deep-olive">{benefit}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
