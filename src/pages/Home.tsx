import React, { useState, useEffect } from 'react'
import axios from 'axios';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setPage } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sorting from '../components/Sorting';
import Card from '../components/Card';
import MyLoader from '../components/MyLoader';
import Pagination from '../components/Pagination';

import type { RootState } from '../redux/store';
import { Pizza, ISearchProps } from '../types/data';
import { SearchContext } from '../App'

const Home: React.FC<ISearchProps> = () => {

	const { searchValue } = React.useContext(SearchContext)
	const dispatch = useDispatch()

	const defaultItems: Pizza[] = []
	const [items, setItems]: [Pizza[], (items: Pizza[]) => void] = useState(defaultItems)

	// const [category, setCategory] = useState(0)
	// const [sortType, setSortType] = useState({ name: 'по убыванию популярности', sort: 'rating' })

	const { category, sortType, currentPage } = useSelector((state: RootState) => state.filter)

	const setCategoryType = (id: number) => {
		dispatch(setCategory(id))
	}

	const [isLoading, setIsLoading] = useState(true)

	const onPageChange = (page: number) => dispatch(setPage(page))

	useEffect(() => {
		setIsLoading(true)

		const currentCategory = category > 0 ? `&category=${category}` : ''
		const sortBy = sortType.sort.replace('-', '')
		const order = sortType.sort.includes('-') ? 'asc' : 'desc'
		const search = searchValue ? `&search=${searchValue}` : ''
		const page = currentPage

		axios.get<Pizza[]>(
			`https://63f38bd1de3a0b242b445773.mockapi.io/items?
		page=${page}
		&limit=4
		${currentCategory}
		${search}
		&sortBy=${sortBy}
		&order=${order}`, {
			headers: {
				"Content-Type": "application/json"
			},
		})
			.then((response) =>
				setTimeout(() => {
					setItems(response.data)
					setIsLoading(false)
				}, 1000)
			)

		window.scrollTo(0, 290)
	}, [category, sortType, searchValue, currentPage])

	useEffect(() => {
		const queryString = qs.stringify({
			sort: sortType.sort,
			category: category,
			page: currentPage
		})
		console.log(queryString);
		
	}, [category, sortType.sort, currentPage])

	const pizzas: JSX.Element[] = items.map((obj: Pizza) => <Card {...obj} key={obj.id} />)

	const skeleton = [...new Array(4)].map((_, index) => <MyLoader key={index} />)

	return (
		<>
			<div className="content__top">
				<Categories categoryType={category} setCategoryType={setCategoryType} />
				<Sorting />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{
					isLoading
						? skeleton
						: pizzas
				}
			</div>
			<Pagination onPageChange={onPageChange} value={currentPage} />
		</>)
}

export default Home