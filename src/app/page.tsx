import { HomeHero } from "@/components/sections/home-hero";
import { HomeStats } from "@/components/sections/home-stats";
import { HomeSpeakersMarquee } from "@/components/sections/home-speakers-marquee";
import { HomeEvents } from "@/components/sections/home-events";
import { HomeSalons } from "@/components/sections/home-salons";
import { HomeManifesto } from "@/components/sections/home-manifesto";
import { HomeTopicsFaq } from "@/components/sections/home-topics-faq";
import { HomeVisionSuggest } from "@/components/sections/home-vision-suggest";
import { HomeGallery } from "@/components/sections/home-gallery";
import { HomeWaitlist } from "@/components/sections/home-waitlist";
import { HomeGeneralFaq } from "@/components/sections/home-general-faq";
import { HomeCta } from "@/components/sections/home-cta";
import { HomeFormat } from "@/components/sections/home-format";
import { HomeInviteCard } from "@/components/sections/home-invite-card";
import { HomeMedia } from "@/components/sections/home-media";
import { HomePartners } from "@/components/sections/home-partners";
import { HomePastEvents } from "@/components/sections/home-past-events";
import { HomeProducts } from "@/components/sections/home-products";
import { HomeSocialDynamics } from "@/components/sections/home-social-dynamics";
import { HomeSuggest } from "@/components/sections/home-suggest";
import { HomeVenues } from "@/components/sections/home-venues";
import { HomeVision } from "@/components/sections/home-vision";
import { HomeVisualCta } from "@/components/sections/home-visual-cta";

export default function Home() {
  return (
    <>
      {/* 1. THE HOOK & CREDIBILITY */}
      <HomeHero />
      <HomeStats />
      <HomeSpeakersMarquee />

     

      {/* 3. THE CORE OFFERING (What & Where) */}
      <HomeEvents />
      <HomePastEvents />
      <HomeWaitlist />
      <HomeSalons />
      

 {/* 2. THE PHILOSOPHY (Why we exist) */}
      <HomeManifesto />
      

      {/* 4. THE EXPERIENCE (How it works) */}
      <HomeFormat />
      <HomeTopicsFaq />
      <HomeSocialDynamics />

      {/* 5. VISUAL PROOF (See the vibe) */}
      <HomeGallery />      <HomeMedia />

      {/* 6. THE ECOSYSTEM (What else we offer) */}
      <HomeProducts />
      <HomePartners />

      {/* 7. COMMUNITY & ACTION (Join us) */}
      <HomeVisionSuggest />
      <HomeSuggest />
      
      <HomeCta />
      <HomeVisualCta />
      <HomeInviteCard />

      {/* 8. FINAL REASSURANCE (Last questions) */}
      <HomeGeneralFaq />
    </>
  );
}