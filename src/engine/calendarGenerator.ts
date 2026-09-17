import { SchemeDefinition } from '../types/scheme';

export class CalendarGenerator {
  /**
   * Generates and triggers download of an .ics calendar file for scholarship deadline reminder
   */
  public static downloadIcsReminder(scheme: SchemeDefinition): void {
    const deadline = new Date(scheme.applicationClosingDate);
    const year = deadline.getFullYear();
    const month = String(deadline.getMonth() + 1).padStart(2, '0');
    const day = String(deadline.getDate()).padStart(2, '0');

    const dtStart = `${year}${month}${day}T090000Z`;
    const dtEnd = `${year}${month}${day}T180000Z`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//JanSetu AI//Civic Deadlines//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:⏰ DEADLINE: ${scheme.name} (JanSetu AI Reminder)`,
      `DESCRIPTION:Application closes today on official portal: ${scheme.officialPortalUrl}. Make sure all prerequisite certificates and NPCI DBT bank accounts are ready.`,
      `LOCATION:Official Portal: ${scheme.officialPortalUrl}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-P2D',
      'ACTION:DISPLAY',
      'DESCRIPTION:Scholarship portal closing in 48 hours!',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Deadline_${scheme.code || 'Scholarship'}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
