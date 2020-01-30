import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import InteractionPlugin, {Draggable} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
const plugins = [dayGridPlugin, InteractionPlugin, timeGridPlugin];
export { FullCalendar, plugins, Draggable };
