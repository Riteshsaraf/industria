export function getTodayDate(): string{
    const today = new Date();

    const formattedDate =
        today.getFullYear() +
        String(today.getMonth() + 1).padStart(2, '0') +
        String(today.getDate()).padStart(2, '0');

    console.log(formattedDate); // e.g. 20260328

    return formattedDate;
}

export function getTodayDateTime(): string {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    //const seconds = String(now.getSeconds()).padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert 24-hour → 12-hour
    hours = hours % 12;
    hours = hours ? hours : 12; // handle 0 => 12
    const hoursStr = String(hours).padStart(2, '0');

    return `${year}/${month}/${day} ${hoursStr}:${minutes} ${ampm}`;
}