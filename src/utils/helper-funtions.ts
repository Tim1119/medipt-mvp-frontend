export function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const formatNumber = (input: number | string): string => {
    const num = typeof input === 'string' ? parseFloat(input) : input;
    if (isNaN(num)) {
      return 'Invalid number';
    }
    return new Intl.NumberFormat('en-US').format(num);
  };

  export const convertToDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString(); // Format the date and time
  };

