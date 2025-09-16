import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import ReportsSection from '@/components/sections/ReportsSection';
import MiniProgramSection from '@/components/sections/MiniProgramSection';
import BoardGameSection from '@/components/sections/BoardGameSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <ReportsSection />
      <MiniProgramSection />
      <BoardGameSection />
      <ContactSection />
    </Layout>
  );
}
