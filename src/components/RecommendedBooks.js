import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import InfoIcon from '@mui/icons-material/Info';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  card: {
    width: '200px',
    margin: '10px',
    border: '1px solid #ccc',
    padding: '10px',
  },
  cover: {
    width: '100%',
    marginBottom: '10px',
  },
}));

const RecommendedBooks = () => {
  const classes = useStyles();
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchRecommendedBooks = async () => {
      try {
        const response = await axios.get(
          'https://www.googleapis.com/books/v1/volumes?q=recommended'
        );
        setRecommendedBooks(response.data.items.slice(0, 4));
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecommendedBooks();
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {recommendedBooks.map((book) => (
          <Grid item xs={12} sm={6} md={3} key={book.id}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cover}
                component='img'
                alt={book.volumeInfo.title}
                src={book.volumeInfo.imageLinks?.thumbnail}
              />
              <CardContent>
                <Typography variant='h6' component='h3'>
                  {book.volumeInfo.title}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  Number of Pages: {book.volumeInfo.pageCount}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  Reviews: {book.volumeInfo.ratingsCount || 'N/A'}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  Rating: {book.volumeInfo.averageRating || 'N/A'}
                </Typography>
              </CardContent>
              <IconButton onClick={() => handleBookClick(book)}>
                <InfoIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        {selectedBook && (
          <>
            <DialogTitle>{selectedBook.volumeInfo.title}</DialogTitle>
            <DialogContent>
              <img
                src={selectedBook.volumeInfo.imageLinks?.thumbnail}
                alt={selectedBook.volumeInfo.title}
                style={{ width: '100%', marginBottom: '10px' }}
              />
              <Typography variant='subtitle1'>
                Author: {selectedBook.volumeInfo.authors?.[0] || 'Unknown'}
              </Typography>
              <Typography variant='body1' color='textSecondary'>
                Number of Pages: {selectedBook.volumeInfo.pageCount}
              </Typography>
              <Typography variant='body1' color='textSecondary'>
                Publisher: {selectedBook.volumeInfo.publisher || 'Unknown'}
              </Typography>
              <Typography variant='body1' color='textSecondary'>
                Published Date:{' '}
                {selectedBook.volumeInfo.publishedDate || 'Unknown'}
              </Typography>
              <Typography variant='body1' color='textSecondary'>
                Description: {selectedBook.volumeInfo.description || 'N/A'}
              </Typography>
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default RecommendedBooks;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     padding: theme.spacing(2),
//   },
//   card: {
//     width: '200px',
//     margin: '10px',
//     border: '1px solid #ccc',
//     padding: '10px',
//   },
//   cover: {
//     width: '100%',
//     marginBottom: '10px',
//   },
// }));

// const RecommendedBooks = () => {
//   const classes = useStyles();
//   const [recommendedBooks, setRecommendedBooks] = useState([]);

//   useEffect(() => {
//     const fetchRecommendedBooks = async () => {
//       try {
//         const response = await axios.get(
//           'https://www.googleapis.com/books/v1/volumes?q=recommended'
//         );
//         setRecommendedBooks(response.data.items.slice(0, 4));
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchRecommendedBooks();
//   }, []);

//   return (
//     <div className={classes.root}>
//       <Grid container spacing={2}>
//         {recommendedBooks.map((book) => (
//           <Grid item xs={12} sm={6} md={3} key={book.id}>
//             <Card className={classes.card}>
//               <CardMedia
//                 className={classes.cover}
//                 component='img'
//                 alt={book.volumeInfo.title}
//                 src={book.volumeInfo.imageLinks?.thumbnail}
//               />
//               <CardContent>
//                 <Typography variant='h6' component='h3'>
//                   {book.volumeInfo.title}
//                 </Typography>
//                 <Typography variant='body2' color='textSecondary'>
//                   Number of Pages: {book.volumeInfo.pageCount}
//                 </Typography>
//                 <Typography variant='body2' color='textSecondary'>
//                   Reviews: {book.volumeInfo.ratingsCount || 'N/A'}
//                 </Typography>
//                 <Typography variant='body2' color='textSecondary'>
//                   Rating: {book.volumeInfo.averageRating || 'N/A'}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// };

// export default RecommendedBooks;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const RecommendedBooks = () => {
//   const [recommendedBooks, setRecommendedBooks] = useState([]);

//   useEffect(() => {
//     const fetchRecommendedBooks = async () => {
//       try {
//         const response = await axios.get(
//           'https://www.googleapis.com/books/v1/volumes?q=recommended'
//         );
//         setRecommendedBooks(response.data.items);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchRecommendedBooks();
//   }, []);

//   return (
//     <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//       {recommendedBooks.map((book) => (
//         <div
//           key={book.id}
//           style={{
//             width: '200px',
//             margin: '10px',
//             border: '1px solid #ccc',
//             padding: '10px',
//           }}
//         >
//           <img
//             src={book.volumeInfo.imageLinks?.thumbnail}
//             alt={book.volumeInfo.title}
//             style={{ width: '100%', marginBottom: '10px' }}
//           />
//           <h3>{book.volumeInfo.title}</h3>
//           <p>Number of Pages: {book.volumeInfo.pageCount}</p>
//           <p>Reviews: {book.volumeInfo.ratingsCount || 'N/A'}</p>
//           <p>Rating: {book.volumeInfo.averageRating || 'N/A'}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RecommendedBooks;
