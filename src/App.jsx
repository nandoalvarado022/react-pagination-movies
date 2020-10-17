import React from 'react';
import { Card } from "./components/Card/Card";
import { MovieDetail } from "./components/Detalle/Detalle";
import './App.scss';

class App extends React.Component {
  state = {
    KEY: "761e2966595a053f4ec156564995dbdc",
    movies: [],
    currentPage: 1,
    base_url: "https://api.themoviedb.org/3/",
    allowDoReq: true,
    movie_id: null,
    movie_info: null
  }

  componentDidMount() {
    this.loadMovies()
    window.addEventListener('scroll', () => {
      if ((document.body.scrollHeight - window.innerHeight === window.scrollY) && this.state.allowDoReq) {
        this.loadMovies()
        this.setState({
          allowDoReq: false
        })
        setTimeout(() => {
          this.setState({
            allowDoReq: true
          })
        }, 3000)
      }
    })
  }

  handleCloseDetail = () => {
    this.setState({
      movieInfo: false
    })
  }

  handleGetDetail = (movie_id)  => {
    const { KEY, base_url } = this.state
    fetch(`${base_url}movie/${movie_id}?api_key=${KEY}`)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          movieInfo: data
        })
      })
  }

  loadMovies() {
    const { KEY, base_url, currentPage } = this.state
    fetch(`${base_url}discover/movie?api_key=${KEY}&language=en-US&page=${currentPage}`)
      .then(res => res.json())
      .then(({ results }) => {
        if (results) {
          this.setState(({ movies, currentPage }) => {
            return {
              movies: [
                ...movies,
                ...results
              ],
              currentPage: currentPage + 1
            }
          })
        }
      })
  }

  render() {
    return (
      <div className="App">
        <main>
          <div className="listado">
            {
              this.state.movies.map(movie => {
                return <Card handleGetDetail={this.handleGetDetail} movie={movie} />
              })
            }
          </div>
          {
            this.state.movieInfo && <div className="content_detail">
              <div onClick={this.handleCloseDetail} className="close">x</div>
              <MovieDetail movieInfo={this.state.movieInfo} />
            </div>
          }
        </main>
      </div>
    );
  }
}

export default App;
