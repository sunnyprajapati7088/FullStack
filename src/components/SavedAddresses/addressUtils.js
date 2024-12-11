import { Home, Building2, Users } from 'lucide-react';

export const getAddressIcon = (type) => {
  switch (type) {
    case 'home':
      return Home;
    case 'office':
      return Building2;
    case 'other':
      return Users;
  }
};