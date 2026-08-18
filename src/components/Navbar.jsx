export function Navbar() {
  return (
    <header className="navbar">
      <a className="wordmark" href="#top" aria-label="Avnish Sinha home">AS<span>/</span>26</a>
      <nav aria-label="Primary">
        <a href="#journey">Journey</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
      <a className="nav-status" href="mailto:aks526@nau.edu">
        <span className="nav-status__dot" aria-hidden="true" />
        Available for work
      </a>
    </header>
  );
}