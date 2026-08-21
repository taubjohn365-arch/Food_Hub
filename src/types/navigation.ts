export type Food = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
};

export type RootStackParamList = {
  Home: undefined;
  FoodList: undefined;
  FoodDetails: { food: Food };
  AddOrder: undefined;
  Cart: undefined;
};
