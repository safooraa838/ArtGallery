// API integration for fetching artwork data

// Met Museum API
const MET_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

// Paginated fetch from the Met API
export const fetchMetArtworks = async (page = 1, limit = 20) => {
  try {
    // First get a list of object IDs (filtered to include only those with images)
    const response = await fetch(`${MET_BASE_URL}/search?hasImages=true&q=painting&pageSize=${limit}&page=${page}`);
    const data = await response.json();
    
    // Then fetch details for each object
    const artworkPromises = data.objectIDs?.slice(0, limit).map(async (id: number) => {
      const detailResponse = await fetch(`${MET_BASE_URL}/objects/${id}`);
      const artwork = await detailResponse.json();
      
      // Only return artworks that have all the required data
      if (artwork.primaryImage && artwork.title && artwork.artistDisplayName) {
        return {
          id: artwork.objectID.toString(),
          title: artwork.title,
          artist: artwork.artistDisplayName || 'Unknown Artist',
          description: artwork.description || artwork.culture || 'No description available',
          imageUrl: artwork.primaryImage,
          year: artwork.objectDate ? parseInt(artwork.objectDate) || null : null,
          medium: artwork.medium || 'Unknown medium',
          dimensions: artwork.dimensions || '',
          tags: [artwork.classification, artwork.culture].filter(Boolean),
          source: 'api'
        };
      }
      return null;
    }) || [];
    
    // Filter out any null results and return
    const artworks = (await Promise.all(artworkPromises)).filter(Boolean);
    return artworks;
  } catch (error) {
    console.error('Error fetching artworks from Met API:', error);
    return [];
  }
};

// Harvard Art Museums API
const HARVARD_BASE_URL = 'https://api.harvardartmuseums.org';
const HARVARD_API_KEY = 'your-api-key'; // Note: In a real app, use env variables

export const fetchHarvardArtworks = async (page = 1, limit = 20) => {
  try {
    // Since we don't have a real API key, return simulated data
    return simulatedHarvardData.slice((page - 1) * limit, page * limit);
  } catch (error) {
    console.error('Error fetching artworks from Harvard API:', error);
    return [];
  }
};

// Simulated Harvard data (for demo purposes)
const simulatedHarvardData = [
  {
    id: 'h1',
    title: 'Water Lilies',
    artist: 'Claude Monet',
    description: 'A stunning depiction of water lilies in Monet\'s garden.',
    imageUrl: 'https://images.pexels.com/photos/889839/pexels-photo-889839.jpeg',
    year: 1919,
    medium: 'Oil on canvas',
    dimensions: '100cm x 200cm',
    tags: ['Impressionism', 'Landscape'],
    source: 'api'
  },
  {
    id: 'h2',
    title: 'Starry Night',
    artist: 'Vincent van Gogh',
    description: 'One of van Gogh\'s most famous works, painted during his stay at the asylum in Saint-Rémy.',
    imageUrl: 'https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg',
    year: 1889,
    medium: 'Oil on canvas',
    dimensions: '73.7cm x 92.1cm',
    tags: ['Post-Impressionism', 'Landscape'],
    source: 'api'
  },
  {
    id: 'h3',
    title: 'The Persistence of Memory',
    artist: 'Salvador Dalí',
    description: 'Famous surrealist painting featuring melting clocks on a dreamlike landscape.',
    imageUrl: 'https://images.pexels.com/photos/3246665/pexels-photo-3246665.jpeg',
    year: 1931,
    medium: 'Oil on canvas',
    dimensions: '24cm x 33cm',
    tags: ['Surrealism'],
    source: 'api'
  },
  {
    id: 'h4',
    title: 'Girl with a Pearl Earring',
    artist: 'Johannes Vermeer',
    description: 'A famous portrait painting featuring a girl wearing an exotic dress and a pearl earring.',
    imageUrl: 'https://images.pexels.com/photos/4622976/pexels-photo-4622976.jpeg',
    year: 1665,
    medium: 'Oil on canvas',
    dimensions: '44cm x 39cm',
    tags: ['Baroque', 'Portrait'],
    source: 'api'
  },
  {
    id: 'h5',
    title: 'The Night Watch',
    artist: 'Rembrandt',
    description: 'A group portrait of a civic guard company, notable for its dramatic use of light and shadow.',
    imageUrl: 'https://images.pexels.com/photos/2770933/pexels-photo-2770933.jpeg',
    year: 1642,
    medium: 'Oil on canvas',
    dimensions: '363cm x 437cm',
    tags: ['Baroque', 'Group portrait'],
    source: 'api'
  },
];

// Function to fetch artworks from multiple sources
export const fetchArtworks = async (page = 1, limit = 10) => {
  const metArtworks = await fetchMetArtworks(page, limit / 2);
  const harvardArtworks = await fetchHarvardArtworks(page, limit / 2);
  
  return [...metArtworks, ...harvardArtworks];
};