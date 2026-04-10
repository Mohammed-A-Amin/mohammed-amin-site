export type ArtworkItem = {
  title: string
  image: string
  caption?: string
  year?: string
}

const artworks: ArtworkItem[] = [
  {
    title: 'AHOU Collage',
    image: '/media/digitalcollage.png',
  },
  {
    title: 'The Battlefield',
    image: '/media/watercolorspartan2.jpg',
  },
  {
    title: 'Stand at Dawn',
    image: '/media/stencilspartan.jpg',
    caption: '',
  },
  {
    title: 'Shards of Honor',
    image: '/media/polygonspartan.png',
    caption: '',
  }
]

export default artworks
