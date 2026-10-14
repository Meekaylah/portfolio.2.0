import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Help } from "@/components/sections/Help";
import { Hero } from "@/components/sections/Hero";
import { KindWords } from "@/components/sections/KindWords";
import { MessageDialog } from "@/components/sections/MessageDialog";
import { Work } from "@/components/sections/Work";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Work />
        <Help />
        <KindWords />
        <Contact />
      </main>
      <Footer />
      <MessageDialog copy={site.contact.form} email={site.email} />
    </>
  );
}
