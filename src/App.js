
import {useState, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import Searchbar from './components/Searchbar'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
import { Fragment } from 'react/cjs/react.production.min'

import { DataContext } from './context/DataContext'
import {SearchContext } from './context/SearchContext'

function App() {
	// let [search, setSearch] = useState('')
	let [message, setMessage] = useState('Search for Music!')
	let [data, setData] = useState([])
	let searchInput = useRef('')

	const API_URL = 'https://itunes.apple.com/search?term='

	// useEffect(() => {
	// 	if(search) {
			
	// 	}
	// }, [search])
	
	const handleSearch = (e, term) => {
		e.preventDefault()
		// Fetch Data
		const fetchData = async () => {
			document.title = `${term} Music`
			const response = await fetch(API_URL + term)
			const resData = await response.json()
			if (resData.results.length > 0) {
				// Set State and Context value
				return setData(resData.results)
			} else {
				return setMessage('Not Found')
			}
		}
		fetchData()
		// setSearch(term)
	}

	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={
						<Fragment>
							<SearchContext.Provider value={{
							term: searchInput,
							handleSearch: handleSearch
							}}>
							<Searchbar />
							</SearchContext.Provider>
							{/* <SearchBar handleSearch = {handleSearch}/> */}
							<DataContext.Provider value={data}>
							<Gallery />
							<AlbumView />
							<ArtistView />
							</DataContext.Provider>
						</Fragment>
						} />
						<Route path="/album/:id" element={<AlbumView />} />
						<Route path="/artist/:id" element={<ArtistView />} />
				</Routes>
			</Router>
		</div>
  	);
}

export default App;