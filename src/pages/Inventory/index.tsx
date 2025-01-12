import { useState } from 'react';
import Input from '../../components/form-items/Input';
import SectionHeader from '../../components/heading/SectionHeader';
import _ from 'lodash';

const inventory = {
  toilet_paper: {
    name: 'Toilet Paper',
    quantity: 0,
  },
  towels: {
    name: 'Towels',
    quantity: 0,
    type: 'bath',
  },
  bed_sheets: {
    name: 'Bed Sheets',
    quantity: 0,
    size: 'queen',
  },
  hand_soap: {
    name: 'Hand Soap',
    quantity: 0,
    type: 'liquid',
  },
  shampoo: {
    name: 'Shampoo',
    quantity: 0,
    size: 'large',
  },
  conditioner: {
    name: 'Conditioner',
    quantity: 0,
    size: 'large',
  },
  dish_soap: {
    name: 'Dish Soap',
    quantity: 0,
    type: 'liquid',
  },
  laundry_detergent: {
    name: 'Laundry Detergent',
    quantity: 0,
    type: 'liquid',
  },
  trash_bags: {
    name: 'Trash Bags',
    quantity: 0,
    size: '13 gallon',
  },
  cleaning_supplies: {
    name: 'Cleaning Supplies',
    quantity: 0,
    items: ['All-purpose cleaner', 'Glass cleaner', 'Sponges'],
  },
  coffee_maker: {
    name: 'Coffee Maker',
    quantity: 0,
    type: 'drip',
  },
  coffee_filters: {
    name: 'Coffee Filters',
    quantity: 0,
    type: '12-cup',
  },
  kitchen_utensils: {
    name: 'Kitchen Utensils',
    quantity: 0,
    items: ['Knives', 'Forks', 'Spoons', 'Spatula', 'Tongs'],
  },
  plates: {
    name: 'Plates',
    quantity: 0,
    type: 'dinner',
  },
  glasses: {
    name: 'Glasses',
    quantity: 0,
    type: 'drinking',
  },
  wine_glasses: {
    name: 'Wine Glasses',
    quantity: 0,
  },
  pots_pans: {
    name: 'Pots and Pans',
    quantity: 0,
    types: ['Frying Pan', 'Saucepan', 'Stock Pot'],
  },
  microwave: {
    name: 'Microwave',
    quantity: 0,
  },
  toaster: {
    name: 'Toaster',
    quantity: 0,
  },
  vacuum_cleaner: {
    name: 'Vacuum Cleaner',
    quantity: 0,
  },
  iron: {
    name: 'Iron',
    quantity: 0,
  },
  ironing_board: {
    name: 'Ironing Board',
    quantity: 0,
  },
  first_aid_kit: {
    name: 'First Aid Kit',
    quantity: 0,
    contents: ['Bandages', 'Antiseptic', 'Pain relievers', 'Thermometer'],
  },
  fire_extinguisher: {
    name: 'Fire Extinguisher',
    quantity: 0,
  },
  smoke_detector: {
    name: 'Smoke Detector',
    quantity: 0,
  },
  carbon_monoxide_detector: {
    name: 'Carbon Monoxide Detector',
    quantity: 0,
  },
};

const inventoryKeys: Record<string, string> = Object.keys(inventory).reduce(
  (acc, key) => {
    acc[key] = '0';
    return acc;
  },
  {} as Record<string, string>
);

const Inventory = () => {
  const [formValues, setFormValues] = useState(inventoryKeys);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <>
      <section className="px-8 pb-10 pt-0 bg-base-200 shadow-xl">
        <div className="mb-10 grid ml-60 mr-60">
          <SectionHeader title="Inventory">
            <div className="mt-10 max-w-40">
              {_.map(inventory, (item, index) => (
                <Input
                  type="number"
                  title={item.name}
                  id={formValues[index]}
                  required={true}
                  value={formValues[index]}
                  callback={handleChange}
                />
              ))}
            </div>
          </SectionHeader>
        </div>
      </section>
    </>
  );
};

export default Inventory;
