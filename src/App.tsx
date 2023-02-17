import React from 'react';
import './App.css';
import Header from './components/Header';
import Categories from './components/Categories';
import Sorting from './components/Sorting';
import Card from './components/Card';

const App: React.FC = () => {
	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<div className="container">
					<div className="content__top">
						<Categories />
						<Sorting />
					</div>
					<h2 className="content__title">Все пиццы</h2>
					<div className="content__items">
						<Card />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
