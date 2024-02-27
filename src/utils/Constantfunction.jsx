export function convertTimeToAMPM(timeString) {
  // console.log(timeString, "timeString...........");
  // Create a new Date object from the provided time string
  const dateTime = new Date(timeString);

  // Extract hours and minutes
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  // Convert hours to 12-hour format and determine AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  // Add leading zero to minutes if necessary
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  // Construct the final formatted time string
  const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

  return formattedTime;
}
