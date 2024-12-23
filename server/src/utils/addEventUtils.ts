export const dateConverter = (
  inputDate: Date | string
): { iyear: number; imonth: number; iday: number } => {
  let date: Date;

  if (inputDate instanceof Date) {
    date = inputDate;
  } else if (typeof inputDate === "string") {
    date = new Date(inputDate);
  } else {
    throw new Error(
      "invalid input"
    );
  }

  if (isNaN(date.getTime())) {
    throw new Error("Invalid Date");
  }

  return {
    iyear: date.getFullYear(),
    imonth: date.getMonth() + 1,
    iday: date.getDate(),
  };
};


export const generateEventId = (inputDate: Date | string): string => {
  let date: Date;

  if (inputDate instanceof Date) {
    date = inputDate;
  } else if (typeof inputDate === "string") {
    date = new Date(inputDate);
  } else {
    throw new Error(
      "invalid input"
    );
  }

  if (isNaN(date.getTime())) {
    throw new Error("Invalid Date");
  }

  const iyear = date.getFullYear();
  const imonth = (date.getMonth() + 1).toString().padStart(2, "0");
  const iday = date.getDate().toString().padStart(2, "0");
  const randomPart = Math.floor(1000 + Math.random() * 9000).toString();

  return `${iyear}${imonth}${iday}${randomPart}`;
};

