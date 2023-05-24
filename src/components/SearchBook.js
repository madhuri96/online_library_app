import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  cover: {
    width: '100%',
    height: 0,
    paddingBottom: '100%',
    objectFit: 'cover',
  },
  content: {
    flex: '1 0 auto',
  },
  searchInput: {
    marginBottom: theme.spacing(2),
  },
}));

const SearchList = () => {
  const classes = useStyles();
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
        );
        setBooks(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, [searchTerm]);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={classes.root}>
      <TextField
        className={classes.searchInput}
        label='Search Books'
        variant='outlined'
        value={searchTerm}
        onChange={handleSearch}
      />

      <Grid container spacing={2}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card
              className={classes.card}
              key={book.id}
              onClick={() => handleBookClick(book)}
            >
              <CardMedia
                className={classes.cover}
                component='img'
                alt={book.volumeInfo.title}
                src={book.volumeInfo.imageLinks?.thumbnail || ''}
              />
              <div className={classes.content}>
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
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedBook && (
        <Card className={classes.detailsContainer}>
          <CardMedia
            component='img'
            alt={selectedBook.volumeInfo.title}
            src={selectedBook.volumeInfo.imageLinks?.thumbnail || ''}
            style={{ height: 300 }}
          />
          <CardContent className={classes.detailsContent}>
            <Typography variant='h5' className={classes.detailsTitle}>
              {selectedBook.volumeInfo.title}
            </Typography>
            <Typography variant='subtitle1'>
              Author: {selectedBook.volumeInfo.authors?.[0] || 'Unknown'}
            </Typography>
            <Typography
              variant='body1'
              className={classes.detailsText}
              color='textSecondary'
            >
              Number of Pages: {selectedBook.volumeInfo.pageCount}
            </Typography>
            <Typography
              variant='body1'
              className={classes.detailsText}
              color='textSecondary'
            >
              Publisher: {selectedBook.volumeInfo.publisher || 'N/A'}
            </Typography>
            <Typography variant='body1'>
              Description: {selectedBook.volumeInfo.description || 'N/A'}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchList;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   TextField,
// } from '@mui/material';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     padding: theme.spacing(2),
//   },
//   card: {
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: theme.spacing(2),
//   },
//   cover: {
//     width: '100%',
//     height: 0,
//     paddingBottom: '100%',
//     objectFit: 'cover',
//   },
//   content: {
//     flex: '1 0 auto',
//   },
//   searchInput: {
//     marginBottom: theme.spacing(2),
//   },
// }));

// const SearchList = () => {
//   const classes = useStyles();
//   const [books, setBooks] = useState([]);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get(
//           `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
//         );
//         setBooks(response.data.items);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchBooks();
//   }, [searchTerm]);

//   const handleBookClick = (book) => {
//     setSelectedBook(book);
//   };

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <div className={classes.root}>
//       <TextField
//         className={classes.searchInput}
//         label='Search Books'
//         variant='outlined'
//         value={searchTerm}
//         onChange={handleSearch}
//       />

//       <Grid container spacing={2}>
//         <Grid item xs={12} md={8}>
//           <Grid container spacing={2}>
//             {books.map((book) => (
//               <Grid item xs={12} sm={6} md={4} key={book.id}>
//                 <Card
//                   className={classes.card}
//                   key={book.id}
//                   onClick={() => handleBookClick(book)}
//                 >
//                   <CardMedia
//                     className={classes.cover}
//                     component='img'
//                     alt={book.volumeInfo.title}
//                     src={book.volumeInfo.imageLinks?.thumbnail || ''}
//                   />
//                   <div className={classes.content}>
//                     <CardContent>
//                       <Typography variant='h6' component='h3'>
//                         {book.volumeInfo.title}
//                       </Typography>
//                       <Typography variant='body2' color='textSecondary'>
//                         Number of Pages: {book.volumeInfo.pageCount}
//                       </Typography>
//                       <Typography variant='body2' color='textSecondary'>
//                         Reviews: {book.volumeInfo.ratingsCount || 'N/A'}
//                       </Typography>
//                       <Typography variant='body2' color='textSecondary'>
//                         Rating: {book.volumeInfo.averageRating || 'N/A'}
//                       </Typography>
//                     </CardContent>
//                   </div>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Grid>
//         <Grid item xs={12} sm={6} md={4}>
//           {selectedBook && (
//             <Card className={classes.detailsContainer}>
//               <CardMedia
//                 component='img'
//                 alt={selectedBook.volumeInfo.title}
//                 src={selectedBook.volumeInfo.imageLinks?.thumbnail || ''}
//                 style={{ height: 300 }}
//               />
//               <CardContent className={classes.detailsContent}>
//                 <Typography variant='h5' className={classes.detailsTitle}>
//                   {selectedBook.volumeInfo.title}
//                 </Typography>
//                 <Typography variant='subtitle1'>
//                   Author: {selectedBook.volumeInfo.authors?.[0] || 'Unknown'}
//                 </Typography>
//                 <Typography
//                   variant='body1'
//                   className={classes.detailsText}
//                   color='textSecondary'
//                 >
//                   Number of Pages: {selectedBook.volumeInfo.pageCount}
//                 </Typography>
//                 <Typography
//                   variant='body1'
//                   className={classes.detailsText}
//                   color='textSecondary'
//                 >
//                   Publisher: {selectedBook.volumeInfo.publisher || 'N/A'}
//                 </Typography>
//                 <Typography variant='body1'>
//                   Description: {selectedBook.volumeInfo.description || 'N/A'}
//                 </Typography>
//               </CardContent>
//             </Card>
//           )}
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default SearchList;
