const getDifferenceTimes = (date: string) => {
  const oldDate = new Date(date).getTime();
  const currentDate = new Date().getTime();

  return currentDate - oldDate;
};

export const textDate = (date: string) => {
  let time: number;
  let suffix: "minutos" | "horas" | "días" | "día" | "hora" | "minuto";

  const differenceTimes = getDifferenceTimes(date);
  const days = Math.floor(differenceTimes / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (differenceTimes % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (differenceTimes % (1000 * 60 * 60)) / (1000 * 60)
  );

  if (days > 0) {
    suffix = days === 1 ? "día" : "días";
    time = days;
  } else if (hours > 0) {
    suffix = hours === 1 ? "hora" : "horas";
    time = hours;
  } else if (minutes > 0) {
    suffix = minutes === 1 ? "minuto" : "minutos";
    time = minutes;
  } else {
    suffix = "minutos";
    time = 0;
  }

  return `hace ${time} ${suffix}`;
};
