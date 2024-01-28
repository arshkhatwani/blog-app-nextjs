/**
 * Takes a date and returns it in format Day MonthName Year
 */
export function getFormattedDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        year: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
}
