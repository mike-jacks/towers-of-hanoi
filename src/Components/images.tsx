export type DiskImage = {
  source: string;
  name: string;
  value: number;
};

export const topBunImage: DiskImage = {
  source: `${import.meta.env.BASE_URL}/assets/images/1_TopBun.svg`,
  name: "Top Bun",
  value: 1,
};

export const picklesImage: DiskImage = {
  source: `${import.meta.env.BASE_URL}/assets/images/2_Pickles.svg`,
  name: "Pickles",
  value: 2,
};

export const onionsImage: DiskImage = {
  source: `${import.meta.env.BASE_URL}/assets/images/3_Onions.svg`,
  name: "Onions",
  value: 3,
};

export const cheeseImage: DiskImage = {
  source: `${import.meta.env.BASE_URL}/assets/images/4_Cheese.svg`,
  name: "Cheese",
  value: 4,
};
export const lettuceImage: DiskImage = {
  source: `${import.meta.env.BASE_URL}/assets/images/5_Lettuce.svg`,
  name: "Lettuce",
  value: 5,
};

export const meatImage: DiskImage = {
  source: `${import.meta.env.BASE_URL}/assets/images/6_Meat.svg`,
  name: "Meat",
  value: 6,
};

export const bottomBunImage: DiskImage = {
  source: `${import.meta.env.BASE_URL}/assets/images/7_BottomBun.svg`,
  name: "Bottom Bun",
  value: 7,
};

export const plateImage: DiskImage = {
  source: `${import.meta.env.BASE_URL}/assets/images/8_DinnerPlate.svg`,
  name: "Plate",
  value: 8,
};
