import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import Category from 'models/Category';
import { setCategory, settingsCategoryesSelector } from 'ducks/settings';
import Checkbox from 'common/Checkbox/Checkbox';

const CategoryItem: React.FC<{ item: Category; subcategory?: boolean; disabled?: boolean }> = ({
	item,
	subcategory,
	disabled,
}) => {
	const dispatch = useDispatch();
	const categoryes = useSelector(settingsCategoryesSelector, shallowEqual);
	const { id, title, child } = item;

	const isCheked = (): boolean => {
		if (disabled) return true;
		return categoryes.indexOf(id) >= 0;
	};

	const handleCheck = (): void => {
		if (!disabled) {
			dispatch(setCategory(id));
		}
	};

	return (
		<>
			<div className={`category-page__row ${subcategory && 'subcategory'} ${disabled && 'disabled'}`}>
				<div className="category-page__title">{title}</div>
				<Checkbox
					data-testid={`category-${id}`}
					checked={isCheked()}
					disabled={disabled}
					onClick={handleCheck}
				/>
			</div>
			{child &&
				child.map(category => (
					<CategoryItem key={category.id} subcategory disabled={disabled} item={category} />
				))}
		</>
	);
};

export default CategoryItem;
