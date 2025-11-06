import {
	BasesView,
	QueryController,
} from 'obsidian';
import { createCalendar, destroyCalendar, TimeGrid } from '@event-calendar/core';
import '@event-calendar/core/index.css';

export class CalendarView extends BasesView {
	type: string;

	constructor(controller: QueryController, scrollEl: HTMLElement) {
		super(controller);
	}

	onDataUpdated(): void {
		throw new Error('Method not implemented.');
	}

	private destruct(): void {

	}
}
