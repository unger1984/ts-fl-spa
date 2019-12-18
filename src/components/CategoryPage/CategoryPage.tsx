import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import './category-page.scss';
import { setAllCategory, settingsAllCategorySelector } from 'ducks/settings';
import Checkbox from 'common/Checkbox/Checkbox';
import { categoryesListSelector, getCategoyesList } from 'ducks/categoryes';
import CategoryItem from 'components/CategoryPage/CategoryItem';

const CategoryPage: React.FC = () => {
	const dispatch = useDispatch();
	const allCategory = useSelector(settingsAllCategorySelector);
	const categoryes = useSelector(categoryesListSelector, shallowEqual);

	useEffect(() => {
		dispatch(getCategoyesList());
	}, []);

	const handleSetAllCategory = (): void => {
		dispatch(setAllCategory(!allCategory));
	};

	return (
		<div className="category-page">
			<div className="category-page__row">
				<div className="category-page__title">Все категории:</div>
				<Checkbox checked={allCategory} onClick={handleSetAllCategory} />
			</div>
			{categoryes.map(category => (
				<CategoryItem key={category.id} disabled={allCategory} item={category} />
			))}
		</div>
	);
};

export default CategoryPage;
