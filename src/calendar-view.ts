import {
	BasesPropertyId,
	BasesView,
	QueryController,
	ViewOption,
} from 'obsidian';
import { createCalendar, destroyCalendar, DayGrid, type Calendar } from '@event-calendar/core';

export const CalendarViewType = 'calendar';

const DEFAULT_DUE_DATE_PROP = 'dueDate';
const DEFAULT_END_DATE_PROP = 'endDate';
const DEFAULT_START_DATE_PROP = 'startDate';

const DEFAULT_DUE_DATE_PROP_VAL = 'due-date';
const DEFAULT_END_DATE_PROP_VAL = 'end-date';
const DEFAULT_START_DATE_PROP_VAL = 'start-date';

export class CalendarView extends BasesView {
	type = CalendarViewType;
	scrollEl: HTMLElement;
	containerEl: HTMLElement;
	calendarEl: HTMLElement;
	calendarInstance: Calendar;

	private dueDateProp: BasesPropertyId | null = null;
	private endDateProp: BasesPropertyId | null = null;
	private startDateProp: BasesPropertyId | null = null;

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
		this.dueDateProp = this.config.getAsPropertyId(DEFAULT_DUE_DATE_PROP);
		this.endDateProp = this.config.getAsPropertyId(DEFAULT_END_DATE_PROP);
		this.startDateProp = this.config.getAsPropertyId(DEFAULT_START_DATE_PROP);
	}

	static getViewOptions(): ViewOption[] {
		return [
			{
				displayName: 'End Date Property',
				type: 'property',
				key: 'endDate',
				default: DEFAULT_END_DATE_PROP_VAL,
			},
			{
				displayName: 'Start Date Property',
				type: 'property',
				key: 'startDate',
				default: DEFAULT_START_DATE_PROP_VAL,
			},
			{
				displayName: 'Due Date Property',
				type: 'property',
				key: 'dueDate',
				default: DEFAULT_DUE_DATE_PROP_VAL,
			},
		];
	}
	private updateCalendarEvents(): void {
		if (!this.data || !this.dueDateProp) {
			return;
		}

		for (const entry of this.data.data) {
			const dueDate = entry.getValue(this.dueDateProp);
			console.log("Due date:", dueDate);
			if (!dueDate) {
				continue;
			}
			this.calendarInstance.addEvent({
				title: entry.file.name,
				start: new Date(dueDate),
				end: new Date(),
			});
		}
	}
}
