import About from './components/About'
import Contact from './components/Contact'
import EditPanel from './components/EditPanel'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import { SiteDataProvider } from './context/SiteDataProvider'

function App() {
  return (
    <SiteDataProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <EditPanel />
      </div>
    </SiteDataProvider>
  )
}

export default App
