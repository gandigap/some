import { CardItem } from '../components/FormCardItem/FormCardItem';

const mockCards: CardItem[] = [
  {
    id: 1,
    firstName: 'FirstName1',
    lastName: 'LastName1',
    date: '2022-01-01',
    country: 'russia',
    gender: 'male',
    image: 'src1',
    agreement: true,
  },
  {
    id: 2,
    firstName: 'FirstName2',
    lastName: 'LastName2',
    date: '2002-11-11',
    country: 'ukraine',
    gender: null,
    image: 'src2',
    agreement: false,
  },
];

export { mockCards };
