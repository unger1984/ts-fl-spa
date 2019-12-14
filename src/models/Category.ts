import { IsInt } from 'class-validator';

export default class Category {
	@IsInt()
	readonly id: number;
	title: string;
	parentId?: number;
	parent?: Category;
}
