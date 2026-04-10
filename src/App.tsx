import { Routes, Route, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Media from './pages/Films'
import Experience from './pages/Experience'

function Page({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      className="single-scroll-page"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {children}
    </motion.main>
  )
}

function SectionReveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="flow-section"
      initial={{ opacity: 0, y: 34, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <Page>
              <SectionReveal><Home /></SectionReveal>
              <SectionReveal><Experience /></SectionReveal>
              <SectionReveal><Projects /></SectionReveal>
              <SectionReveal><Media /></SectionReveal>
            </Page>
          }
        />
        <Route path="/about" element={<Navigate to="/" replace />} />
        <Route path="/experience" element={<Navigate to="/#experience" replace />} />
        <Route path="/projects" element={<Navigate to="/#projects" replace />} />
        <Route path="/media" element={<Navigate to="/#media" replace />} />
        <Route path="/films" element={<Navigate to="/#media" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
