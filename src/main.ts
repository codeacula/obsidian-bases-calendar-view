import { Plugin } from 'obsidian';
import { CalendarView } from './calendar-view';

export default class ObsidianMapsPlugin extends Plugin {
	onload() {
		this.registerBasesView('calendar', {
			name: 'Calendar',
			icon: 'lucide-calendar',
			factory: (controller, containerEl) => new CalendarView(controller, containerEl),
			options: () => [],
		});
	}

	onunload() { }
}
