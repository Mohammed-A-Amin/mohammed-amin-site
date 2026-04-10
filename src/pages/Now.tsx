import { Link } from 'react-router-dom'

export default function Now() {
  return (
    <section className="now-shell">
      <p className="page-kicker">Now</p>
      <h1 className="now-title">What I'm doing now</h1>
      <p className="now-updated">Updated April 10, 2026</p>

      <div className="now-copy">
        <p>
          I'm wrapping up my junior year studying EECS at UC Berkeley. Currently taking CS 184 (Graphics), CS 168 (Internet), PHYSICS 7B (boooo), and I am also trying to improve my design skills through the Figma DeCal. 
          Has definitely been a pretty chill semester so far class wise! 
        </p>

        <p>I am also PMing a small team of students through my club PlexTech for a hardware company called Triton Sensors where we're working on implementing a multi‑sensor rig capable of generating accurate 3D point clouds of human motion and developing a machine learning pipeline for detecting falls and other unnatural or unsafe body positions. </p>

        <p>
          This summer, I'll be interning at OpenAI. Super excited to learn from such talented people redefining the future of what AI is capable of.
        </p>

        <p>
          I have recently gotten back to playing tabla after a couple busy semesters. More coming soon on{' '}
          <Link className="inline-link" to="/tabla">Tabla</Link>.
        </p>

        <p>GYM PROGRESS: Reaching the final stages of my cut, time to get lean for the summer!</p>

    

       
      </div>

      {/* <div className="now-list">
        <h2>Current focus</h2>
        <ul>
          <li>OpenAI internship and stronger systems engineering habits.</li>
          <li>Berkeley EECS, research, and useful technical prototypes.</li>
          <li>Projects across AR, full-stack, mobile, and AI interfaces.</li>
          <li>Short films and visual media that feel more personal.</li>
        </ul>
      </div> */}
    </section>
  )
}
