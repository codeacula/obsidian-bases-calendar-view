import {
	BasesView,
	QueryController,
} from 'obsidian';
import { createCalendar, destroyCalendar, EventCalendar, DayGrid } from '@event-calendar/core';

export const CalendarViewType = 'calendar';

export class CalendarView extends BasesView {
	type = CalendarViewType;
	scrollEl: HTMLElement;
	containerEl: HTMLElement;
	calendarEl: HTMLElement;
	calendarInstance: EventCalendar;

	constructor(controller: QueryController, scrollEl: HTMLElement) {
		super(controller);
		this.scrollEl = scrollEl;
		this.containerEl = this.scrollEl.createDiv({ cls: 'calendar-container' });
		this.calendarEl = this.containerEl.createDiv({ cls: 'calendar' });

		this.calendarInstance = createCalendar(
			this.calendarEl,
			[DayGrid]
		);
	}

	onDataUpdated(): void {
	}

	private destruct(): void {
		destroyCalendar(this.calendarInstance);
	}
}
