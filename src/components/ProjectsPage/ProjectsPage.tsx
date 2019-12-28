import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pullable from 'react-pullable';

import './projects-page.scss';
import images from '../../images';
import { getProjectsList, projectsListSelector } from 'ducks/projects';
import ProjectItem from 'components/ProjectsPage/ProjectItem/ProjectItem';
import { uiPreloaderSelector } from 'ducks/ui';

const ProjectsPage: React.FC = () => {
	const dispatch = useDispatch();
	const [isRefresh, setRefresh] = useState<boolean>(false);
	const preloader = useSelector(uiPreloaderSelector);
	const list = useSelector(projectsListSelector);

	useEffect(() => {
		dispatch(getProjectsList());
	}, []);

	// погасим индикатор обновлялки если включен
	useEffect(() => {
		if (!preloader && isRefresh) {
			setRefresh(false);
		}
	}, [preloader]);

	const handleRefresh = (): void => {
		setRefresh(true);
		dispatch(getProjectsList());
	};

	return (
		<div className="projects-page">
			<Pullable data-testid="pullable" onRefresh={handleRefresh}>
				{isRefresh && (
					<div className="projects-page__refresh">
						<img src={images.icoPreloader} />
					</div>
				)}
				{list.map(item => (
					<ProjectItem key={item.id} project={item} />
				))}
				{!preloader && list.length <= 0 && (
					<div className="projects-page__refresh">Нет проектов подходящих под фильтр</div>
				)}
			</Pullable>
		</div>
	);
};

export default ProjectsPage;
