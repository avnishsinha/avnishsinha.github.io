import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProofStrip } from './components/ProofStrip';
import { Journey } from './components/Journey';
import { People } from './components/People';
import { Projects } from './components/Projects';
import { Engineering } from './components/Engineering';
import { Stack } from './components/Stack';
import { Currently } from './components/Currently';
import { Contact } from './components/Contact';

export default function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <ProofStrip />
        <Journey />
        <People />
        <Projects />
        <Engineering />
        <Stack />
        <Currently />
        <Contact />
      </main>
      <footer className="site-footer">Avnish Sinha <span>Software engineer and builder</span></footer>
    </div>
  );
}