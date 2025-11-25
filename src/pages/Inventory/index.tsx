import { useState } from 'react';
import Input from '../../components/form-items/Input';
import SectionHeader from '../../components/heading/SectionHeader';
import _ from 'lodash';

const inventory = {
  toilet_paper: {
    name: 'Toilet Paper',
    quantity: 0,
    notes: '',
  },
  towels: {
    name: 'Towels',
    quantity: 0,
    type: 'bath',
    notes: '',
  },
  bed_sheets: {
    name: 'Bed Sheets',
    quantity: 0,
    size: 'queen',
    notes: '',
  },
  hand_soap: {
    name: 'Hand Soap',
    quantity: 0,
    type: 'liquid',
    notes: '',
  },
  shampoo: {
    name: 'Shampoo',
    quantity: 0,
    size: 'large',
    notes: '',
  },
  conditioner: {
    name: 'Conditioner',
    quantity: 0,
    size: 'large',
    notes: '',
  },
  dish_soap: {
    name: 'Dish Soap',
    quantity: 0,
    type: 'liquid',
    notes: '',
  },
  laundry_detergent: {
    name: 'Laundry Detergent',
    quantity: 0,
    type: 'liquid',
    notes: '',
  },
  trash_bags: {
    name: 'Trash Bags',
    quantity: 0,
    size: '13 gallon',
    notes: '',
  },
  cleaning_supplies: {
    name: 'Cleaning Supplies',
    quantity: 0,
    items: ['All-purpose cleaner', 'Glass cleaner', 'Sponges'],
    notes: '',
  },
  coffee_maker: {
    name: 'Coffee Maker',
    quantity: 0,
    type: 'drip',
    notes: '',
  },
  coffee_filters: {
    name: 'Coffee Filters',
    quantity: 0,
    type: '12-cup',
    notes: '',
  },
  kitchen_utensils: {
    name: 'Kitchen Utensils',
    quantity: 0,
    items: ['Knives', 'Forks', 'Spoons', 'Spatula', 'Tongs'],
    notes: '',
  },
  plates: {
    name: 'Plates',
    quantity: 0,
    type: 'dinner',
    notes: '',
  },
  glasses: {
    name: 'Glasses',
    quantity: 0,
    type: 'drinking',
    notes: '',
  },
  wine_glasses: {
    name: 'Wine Glasses',
    quantity: 0,
    notes: '',
  },
  pots_pans: {
    name: 'Pots and Pans',
    quantity: 0,
    types: ['Frying Pan', 'Saucepan', 'Stock Pot'],
    notes: '',
  },
  microwave: {
    name: 'Microwave',
    quantity: 0,
    notes: '',
  },
  toaster: {
    name: 'Toaster',
    quantity: 0,
    notes: '',
  },
  vacuum_cleaner: {
    name: 'Vacuum Cleaner',
    quantity: 0,
    notes: '',
  },
  iron: {
    name: 'Iron',
    quantity: 0,
    notes: '',
  },
  first_aid_kit: {
    name: 'First Aid Kit',
    quantity: 0,
    contents: ['Bandages', 'Antiseptic', 'Pain relievers', 'Thermometer'],
    notes: '',
  },
  fire_extinguisher: {
    name: 'Fire Extinguisher',
    quantity: 0,
    notes: '',
  },
  smoke_detector: {
    name: 'Smoke Detector',
    quantity: 0,
    notes: '',
  },
  carbon_monoxide_detector: {
    name: 'Carbon Monoxide Detector',
    quantity: 0,
    notes: '',
  },
};

const inventoryCount: Record<string, string> = Object.keys(inventory).reduce(
  (acc, key) => {
    acc[key] = '0';
    return acc;
  },
  {} as Record<string, string>
);

const inventoryNote: Record<string, string> = Object.keys(inventory).reduce(
  (acc, key) => {
    acc[key] = '';
    return acc;
  },
  {} as Record<string, string>
);

const Inventory = () => {
  const [inventoryCountValues, setInventoryCountValues] =
    useState(inventoryCount);
  const [inventoryNoteValues, setInventoryNoteValues] = useState(inventoryNote);

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInventoryCountValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInventoryNoteValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <section className="px-8 pb-10 pt-0 bg-base-200 shadow-xl">
      <div className="mb-10 grid">
        <SectionHeader title="Inventory">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 border-separate [border-spacing:1rem]">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Item
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Additional Info
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Last Inventoried
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Current Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                  {_.map(inventory, (item, index) => (
                    <tr>
                      <td className="whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                        {item.name}
                      </td>
                      <td className="whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                        {item.name}
                      </td>
                      <td className="whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                        {item.quantity}
                      </td>
                      <td className="whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 ">
                        <Input
                          type="number"
                          id={index}
                          value={inventoryCountValues[index]}
                          callback={handleCountChange}
                        />
                      </td>
                      <td className="whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                        <Input
                          type="text"
                          id={index}
                          required={true}
                          value={inventoryNoteValues[index]}
                          callback={handleNoteChange}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </SectionHeader>
      </div>
    </section>
  );
};

export default Inventory;
