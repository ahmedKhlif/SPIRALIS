import Image from "next/image";
import { Instagram, Mail, MapPin, Send } from "lucide-react";
import { Reveal } from "@/components/sections/Reveal";
import { IconBadge } from "@/components/sections/IconBadge";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FormField, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const faq = [
  [
    "Pour quel type de peau la gamme est-elle pensée ?",
    "La routine est pensée pour les peaux mixtes à grasses sujettes aux imperfections, aux pores visibles et à l'excès de sébum.",
  ],
  [
    "Peut-on utiliser la routine matin et soir ?",
    "Oui, la routine peut être utilisée matin et soir selon la tolérance de votre peau.",
  ],
  [
    "La crème laisse-t-elle un fini gras ?",
    "La crème est pensée comme une hydratation légère, avec un fini doux et équilibré.",
  ],
  [
    "Comment utiliser la recharge ?",
    "Ouvrez le pot, retirez la recharge vide, insérez la nouvelle recharge, puis refermez le pot.",
  ],
  [
    "Quand les produits seront-ils disponibles ?",
    "SPIRALIS est présenté ici comme une vitrine de marque. Les informations de disponibilité seront communiquées ultérieurement.",
  ],
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre routine"
        subtitle="Une question sur SPIRALIS ou la routine anti-imperfections ? Contactez-nous."
        image="/assets/spiralis/contact/hero.webp"
        primaryHref="#formulaire"
        primaryLabel="Écrire un message"
        secondaryHref="/a-propos"
        secondaryLabel="Notre approche"
        imagePosition="center right"
      >
        <div className="flex flex-wrap gap-3">
          <IconBadge icon={Mail} label="contact@spiralis.fr" />
          <IconBadge icon={MapPin} label="Studio botanique" />
          <IconBadge icon={Instagram} label="@spiralis.skincare" />
        </div>
      </PageHero>
      <section className="section-padding bg-pale-green/35">
        <div id="formulaire" className="container-shell grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <Reveal>
            <Card className="p-6 sm:p-8">
              <form className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField>
                    <FormLabel htmlFor="name">Nom</FormLabel>
                    <Input id="name" name="name" autoComplete="name" />
                  </FormField>
                  <FormField>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input id="email" name="email" type="email" autoComplete="email" />
                  </FormField>
                </div>
                <FormField>
                  <FormLabel htmlFor="subject">Sujet</FormLabel>
                  <Input id="subject" name="subject" />
                </FormField>
                <FormField>
                  <FormLabel htmlFor="message">Message</FormLabel>
                  <Textarea id="message" name="message" />
                </FormField>
                <Button type="submit" className="w-fit">
                  <Send className="h-4 w-4" strokeWidth={1.5} />
                  Envoyer le message
                </Button>
              </form>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="p-6 sm:p-8">
              <h2 className="font-heading text-4xl font-semibold text-deep-olive">FAQ</h2>
              <Accordion type="single" collapsible className="mt-4">
                {faq.map(([question, answer], index) => (
                  <AccordionItem value={`item-${index}`} key={question}>
                    <AccordionTrigger>{question}</AccordionTrigger>
                    <AccordionContent>{answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </Reveal>
        </div>
      </section>
    </>
  );
}
