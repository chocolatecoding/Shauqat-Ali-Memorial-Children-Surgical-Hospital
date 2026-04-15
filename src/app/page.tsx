import { ContactInfo } from "@/components/sections/ContactInfo";
import { FAQ } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { Contact } from "lucide-react";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* Stats component can be placed separately on the page */}
      <Stats variant="default" showIcons={true} columns={4} />
      {/* Rest of your homepage content */}
      <Services />
      <FAQ />
      <ContactInfo />
    
    </main>
  );
}