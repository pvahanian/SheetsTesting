//Creates the Data to go into the Month in a Month Year format.
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dateHolder = new Date();
export const currentYear = dateHolder.getFullYear()
export const currentMonth = monthNames[dateHolder.getMonth()] +" "+ dateHolder.getFullYear();
let holder;

if (dateHolder.getMonth() !== 11) {
  holder =
    monthNames[Number(dateHolder.getMonth() + 1)] +" "+ dateHolder.getFullYear();
} else {
  holder = monthNames[0] +" "+ Number(dateHolder.getFullYear() + 1);
}

export const nextMonth = holder;

export let defaultDropDownMonth;

//Creates Dropdown data for months
export const monthsDropdownData = [
  {
    key: "January",
    text: "January",
    value: "January" +" "+ dateHolder.getFullYear(),
  },
  {
    key: "February",
    text: "February",
    value: "February" +" "+ dateHolder.getFullYear(),
  },
  { key: "March", text: "March", value: "March" +" "+ dateHolder.getFullYear() },
  { key: "April", text: "April", value: "April" +" "+ dateHolder.getFullYear() },
  { key: "May", text: "May", value: "May"+" "+ dateHolder.getFullYear() },
  { key: "June", text: "June", value: "June" +" "+ dateHolder.getFullYear() },
  { key: "July", text: "July", value: "July" +" "+ dateHolder.getFullYear() },
  { key: "August", text: "August", value: "August" +" "+ dateHolder.getFullYear() },
  {
    key: "September",
    text: "September",
    value: "September" +" "+ dateHolder.getFullYear(),
  },
  {
    key: "October",
    text: "October",
    value: "October" +" "+ dateHolder.getFullYear(),
  },
  {
    key: "November",
    text: "November",
    value: "November" +" "+ dateHolder.getFullYear(),
  },
  {
    key: "December",
    text: "December",
    value: "December" +" "+ dateHolder.getFullYear(),
  },
];

for (let i = 0; i < monthsDropdownData.length; i++) {
  if (monthsDropdownData[i].value === currentMonth) {
    defaultDropDownMonth = monthsDropdownData[i];
  }
}
