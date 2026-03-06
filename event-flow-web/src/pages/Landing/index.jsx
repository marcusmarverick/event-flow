import styles from './Landing.module.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import UserTypes from './components/UserTypes';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import EventsHighlight from './components/EventsHighlight';
import Instagram from './components/Instagram';
import CTA from './components/CTA';

function Landing() {
  return (
    <div className={styles.page}>
      <Navbar />
      <Hero />
      <Marquee />
      <UserTypes />
      <Features />
      <HowItWorks />
      <EventsHighlight />
      <Instagram />
      <CTA />
    </div>
  );
}

export default Landing;