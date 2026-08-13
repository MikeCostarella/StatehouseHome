import Header from "./components/Header";
import Hero from "./components/Hero";
import Goals from "./components/Goals";
import Apps from "./components/Apps";
import Audience from "./components/Audience";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-steel-700 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Goals />
        <Apps />
        <Audience />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
