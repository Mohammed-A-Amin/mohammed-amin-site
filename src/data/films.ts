import type { Film } from '../components/FilmCard'

const films: Film[] = [
  {
    title: 'The Plexvengers',
    description: 'The SECOND greatest hiking trailer of all time.',
    year: '2026',
    isNew: true,
    thumbnail: '/media/plexvengers.png',
    videoUrl: 'https://www.youtube.com/watch?v=faP7MgeeqYQ'
  },
  {
    title: 'PlexTech XXL Cypher',
    description: 'The brightest minds in Berkeley come together to create the Greatest Cypher of All Time.',
    year: '2025',
    thumbnail: '/media/thumb3.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=edXwheQy_Jk'
  },
  {
    title: 'Operation No Owen Left Behind',
    description: 'A trailer for a hike.',
    year: '2025',
    thumbnail: '/media/thumb2.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=cUc6m4fQRv4'
  },
  {
    title: 'A Walk At Night',
    description: 'A funny attempt at video poetry.',
    year: '2022',
    thumbnail: '/media/thumb1.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=GQyYuU2CX5s'
  },
  {
    title: 'Doll Past Daylight 2',
    description: 'Your neighborhood horror story ft. Lisa Simpson.',
    year: '2021',
    thumbnail: '/media/thumb4.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=GeWku9DxiV4'
  }
]

export default films
