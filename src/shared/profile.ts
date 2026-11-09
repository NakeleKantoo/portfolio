export const BIRTH = { year: 2005, month: 12, day: 7 };

/** Idade calculada na hora: em 07/12 vira o número seguinte sozinho. */
export function getAge(now: Date = new Date()): number {
  const month = now.getMonth() + 1;
  let age = now.getFullYear() - BIRTH.year;
  if (month < BIRTH.month || (month === BIRTH.month && now.getDate() < BIRTH.day)) {
    age -= 1;
  }
  return age;
}

export const AGE = getAge();
