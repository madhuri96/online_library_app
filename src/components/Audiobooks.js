import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Audiobooks = () => {
  const [audiobooks, setAudiobooks] = useState([]);
  const [playingBookId, setPlayingBookId] = useState(null);

  useEffect(() => {
    const fetchAudiobooks = async () => {
      try {
        const response = await axios.get(
          'https://www.googleapis.com/books/v1/volumes?q=audiobooks'
        );
        setAudiobooks(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAudiobooks();
  }, []);

  const handlePlayPause = (bookId) => {
    if (playingBookId === bookId) {
      // Currently playing, pause the audio
      setPlayingBookId(null);
    } else {
      // Not playing, start playing the audio
      setPlayingBookId(bookId);
    }
  };

  return (
    <div>
      {/* <h2>Audiobooks</h2> */}
      {audiobooks.map((book) => (
        <div key={book.id}>
          <h3>{book.volumeInfo.title}</h3>
          {book.volumeInfo.imageLinks && (
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={book.volumeInfo.title}
            />
          )}
          <p>Author: {book.volumeInfo.authors?.join(', ') || 'Unknown'}</p>
          <p>Duration: {book.volumeInfo.pageCount} minutes</p>
          <p>Rating: {book.volumeInfo.averageRating || 'N/A'}</p>
          <p>Description: {book.volumeInfo.description || 'N/A'}</p>
          <button onClick={() => handlePlayPause(book.id)}>
            {playingBookId === book.id ? 'Pause' : 'Play'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Audiobooks;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Audiobooks = () => {
//   const [audiobooks, setAudiobooks] = useState([]);

//   useEffect(() => {
//     const fetchAudiobooks = async () => {
//       try {
//         const response = await axios.get(
//           'https://www.googleapis.com/books/v1/volumes?q=audiobooks'
//         );
//         setAudiobooks(response.data.items);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchAudiobooks();
//   }, []);

//   return (
//     <div>
//       {/* <h2>Audiobooks</h2> */}
//       {audiobooks.map((book) => (
//         <div key={book.id}>
//           <h3>{book.volumeInfo.title}</h3>
//           {book.volumeInfo.imageLinks && (
//             <img
//               src={book.volumeInfo.imageLinks.thumbnail}
//               alt={book.volumeInfo.title}
//             />
//           )}
//           <p>Author: {book.volumeInfo.authors?.join(', ') || 'Unknown'}</p>
//           <p>Duration: {book.volumeInfo.pageCount} minutes</p>
//           <p>Rating: {book.volumeInfo.averageRating || 'N/A'}</p>
//           <p>Description: {book.volumeInfo.description || 'N/A'}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Audiobooks;
