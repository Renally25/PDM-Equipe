export function dateKey(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

export function buildMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const start = new Date(year, month, 1 - firstDay.getDay());
  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    return day;
  });
}

export function eventDateTime(event) {
  const value = event.date || event.data || event.start;
  if (!value) return null;

  const date = new Date(value);
  const time = event.time || event.horario;
  if (time) {
    const [hours, minutes = "00"] = String(time).split(":");
    date.setHours(Number(hours), Number(minutes), 0, 0);
  }

  return Number.isNaN(date.getTime()) ? null : date;
}

export function eventDate(event) {
  const date = eventDateTime(event);
  return date ? dateKey(date) : null;
}

export function eventTitle(event) {
  return event.title || event.nome || event.name || "Consulta";
}

export function eventTime(event) {
  return event.time || event.horario;
}

export function formatAppointment(event, date) {
  const dateLabel =
    dateKey(date) === dateKey(new Date())
      ? "hoje"
      : date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
  const time = eventTime(event);
  return `${eventTitle(event)} - ${dateLabel}${time ? `, ${time}` : ""}`;
}
