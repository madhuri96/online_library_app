import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  createTheme,
  ThemeProvider,
  IconButton,
} from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
import BookList from './components/BookList';
import SearchBook from './components/SearchBook';
import RecommendedBooks from './components/RecommendedBooks';
import Audiobooks from './components/Audiobooks';
import Podcasts from './components/Podcasts';
import Menu from './components/Menu';
import MenuIcon from '@mui/icons-material/Menu';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Deep blue
    },
    secondary: {
      main: '#2196f3', // Accent blue
    },
  },
});

const useStyles = makeStyles((theme) => ({
  bookAreaCard: {
    backgroundColor: '#fff', // White
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor='primary'
            textColor='primary'
            centered
          >
            <IconButton
              edge='end'
              color='inherit'
              aria-label='menu'
              onClick={handleMenuToggle}
            >
              <MenuIcon />
            </IconButton>

            <Menu open={menuOpen} onClose={handleMenuClose} />

            <Link to='/' style={{ color: 'blue', margin: '12px' }}>
              <Tab label='Books' />
            </Link>
            <Link to='/audiobooks' style={{ color: 'blue', margin: '12px' }}>
              <Tab label='Audiobooks' />
            </Link>
            <Link to='/podcasts' style={{ color: 'blue', margin: '12px' }}>
              <Tab label='Podcasts' />
            </Link>

            <SearchBook />
          </Tabs>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom textAlign='left'>
                For you
              </Typography>
              {/* Your book recommendations component */}
              <RecommendedBooks />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card className={classes.bookAreaCard}>
            <CardContent>
              <Typography variant='h4' gutterBottom textAlign='left'>
                Book Area
              </Typography>
              {/* Your book area component */}
              <Routes>
                <Route path='/' element={<BookList />} />
                <Route path='/audiobooks' element={<Audiobooks />} />
                <Route path='/podcasts' element={<Podcasts />} />
              </Routes>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default HomePage;

// import React, { useState } from 'react';
// import {
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Tabs,
//   Tab,
//   createTheme,
//   ThemeProvider,
// } from '@mui/material';
// import { Link, Route, Routes } from 'react-router-dom';

// import { makeStyles } from '@mui/styles';
// import BookList from './components/BookList';
// import SearchBook from './components/SearchBook';
// import RecommendedBooks from './components/RecommendedBooks';
// import Audiobooks from './components/Audiobooks';
// import Podcastes from './components/Podcasts';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2', // Deep blue
//     },
//     secondary: {
//       main: '#2196f3', // Accent blue
//     },
//   },
// });

// const useStyles = makeStyles((theme) => ({
//   bookAreaCard: {
//     backgroundColor: '#fff', // White
//   },
// }));

// const HomePage = () => {
//   const classes = useStyles();
//   const [selectedTab, setSelectedTab] = useState(0);

//   const handleTabChange = (event, newValue) => {
//     setSelectedTab(newValue);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <Tabs
//             value={selectedTab}
//             onChange={handleTabChange}
//             indicatorColor='primary'
//             textColor='primary'
//             centered
//           >
//             <Link to='/' style={{ color: 'blue' }}>
//               <Tab label='Books' />
//             </Link>
//             <Link to='/audiobooks' style={{ color: 'blue' }}>
//               <Tab label='Audiobooks' />
//             </Link>
//             <Link to='/podcasts' style={{ color: 'blue' }}>
//               <Tab label='Podcasts' />
//             </Link>

//             <SearchBook />
//           </Tabs>
//         </Grid>

//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Typography variant='h6' gutterBottom textAlign='left'>
//                 For you
//               </Typography>
//               {/* Your book recommendations component */}
//               <RecommendedBooks />
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12}>
//           <Card className={classes.bookAreaCard}>
//             <CardContent>
//               <Typography variant='h4' gutterBottom textAlign='left'>
//                 Book Area
//               </Typography>
//               {/* Your book area component */}
//               <Routes>
//                 <Route path='/' element={<BookList />} />
//                 <Route path='/audiobooks' element={<Audiobooks />} />
//                 <Route path='/podcasts' element={<Podcastes />} />
//               </Routes>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   );
// };

// export default HomePage;
