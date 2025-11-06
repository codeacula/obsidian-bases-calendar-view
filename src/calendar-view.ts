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
		this.updateCalendarEvents();
	}

	onDataUpdated(): void {
		// TODO: Clear the existing events
		this.updateCalendarEvents();
	}

	private destruct(): void {
		destroyCalendar(this.calendarInstance);
	}

	private updateCalendarEvents(): void {

		// TODO: Filter out notes that aren't in the current time period
		console.log("AAAAHHH", this.data);

		if (!this.data) {
			return;
		}

		for (const entry of this.data.data) {
			this.calendarInstance.addEvent({
				title: entry.file.name,
				start: entry.getValue('file.due-date'),
				end: entry.getValue('file.due-date')
			});
		}
	}
}
