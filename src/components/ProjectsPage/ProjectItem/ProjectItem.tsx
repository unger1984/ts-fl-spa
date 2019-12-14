import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis';

import './project-item.scss';
import { dateToString, flTextPreiew } from 'helpers/index';
import Project from 'models/Project';

const ProjectItem: React.FC<{ project: Project }> = ({ project }) => {
	const { title, date, price, text, isNew, link } = project;

	return (
		// eslint-disable-next-line react/jsx-no-target-blank
		<a target="_blank" rel="nofollow noopener" href={link} className={`project-item ${isNew ? 'new' : ''}`}>
			<div className="project-item__title">
				<h4>{title}</h4>
				<div className="project-item__title-info">
					<div>{dateToString(date)}</div>
					<div>{price}</div>
				</div>
			</div>
			{text && <LinesEllipsis maxLine={3} ellipsis="..." basedOn="letters" text={flTextPreiew(text)} />}
		</a>
	);
};

export default ProjectItem;
