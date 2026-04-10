import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Media from './pages/Films'
import Experience from './pages/Experience'
import Now from './pages/Now'
import Tabla from './pages/Tabla'

function Page({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      className="single-scroll-page route-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.main>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname])

  return null
}

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Page><Home /></Page>} />
        <Route path="/about" element={<Navigate to="/" replace />} />
        <Route path="/experience" element={<Page><Experience /></Page>} />
        <Route path="/projects" element={<Page><Projects /></Page>} />
        <Route path="/media" element={<Page><Media /></Page>} />
        <Route path="/now" element={<Page><Now /></Page>} />
        <Route path="/tabla" element={<Page><Tabla /></Page>} />
        <Route path="/films" element={<Navigate to="/media" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
