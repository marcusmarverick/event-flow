import styles from './Landing.module.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';

function Landing() {
  return (
    <div className={styles.page}>
      <Navbar />
      <Hero />
      <Marquee/>
    </div>
  );
}

export default Landing;