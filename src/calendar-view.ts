import {
	BasesPropertyId,
	BasesView,
	QueryController,
	ViewOption,
} from 'obsidian';
import { createCalendar, destroyCalendar, DayGrid, type Calendar } from '@event-calendar/core';

export const CalendarViewType = 'calendar';

const DEFAULT_END_DATE_PROP = 'endDate';
const DEFAULT_START_DATE_PROP = 'startDate';

const DEFAULT_END_DATE_PROP_VAL = 'due-date';
const DEFAULT_START_DATE_PROP_VAL = 'due-date';

export class CalendarView extends BasesView {
	type = CalendarViewType;
	scrollEl: HTMLElement;
	containerEl: HTMLElement;
	calendarEl: HTMLElement;
	calendarInstance: Calendar;

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
		this.loadConfig();
		this.updateCalendarEvents();
	}

	private destruct(): void {
		destroyCalendar(this.calendarInstance);
	}

	private loadConfig(): void {
	}

	static getViewOptions(): ViewOption[] {
		return [
			{
				type: 'text',
				displayName: 'Start Date Property',
				key: DEFAULT_START_DATE_PROP,
				default: DEFAULT_START_DATE_PROP_VAL,
			},
			{
				type: 'text',
				displayName: 'End Date Property',
				key: DEFAULT_END_DATE_PROP,
				default: DEFAULT_END_DATE_PROP_VAL,
			},
		];
	}

	private updateCalendarEvents(): void {
		if (!this.data || !this.data.data) {
			return;
		}

		const startDateProp = this.config.get(DEFAULT_START_DATE_PROP) as BasesPropertyId;
		const endDateProp = this.config.get(DEFAULT_END_DATE_PROP) as BasesPropertyId;

		for (const entry of this.data.data) {
			const startDate = entry.getValue(startDateProp);
			const endDate = entry.getValue(endDateProp);
			console.log("Start date:", startDate);
			console.log("End date:", endDate);

			if (!startDate || !endDate) {
				continue;
			}

			this.calendarInstance.addEvent({
				title: entry.file.name,
				start: new Date(startDate.toString()),
				end: new Date(endDate.toString()),
			});
		}
	}
}
