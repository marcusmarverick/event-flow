import styles from './Landing.module.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import UserTypes from './components/UserTypes';

function Landing() {
  return (
    <div className={styles.page}>
      <Navbar />
      <Hero />
      <Marquee/>
      <UserTypes/>
    </div>
  );
}

export default Landing;