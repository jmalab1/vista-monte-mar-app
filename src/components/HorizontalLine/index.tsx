import { faBowlFood, faPersonBiking, faPersonRunning, faPlane, faSailboat, faUmbrellaBeach } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const HorizontalLine = () => {
  const icons = [
    faPlane,
    faPersonBiking,
    faSailboat,
    faUmbrellaBeach,
    faPersonRunning,
    faBowlFood
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev: number) => (prev + 1) % icons.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [icons.length]);

  return (
    <div className="flex items-center">
      <div className="flex-grow border-t-2 border-dashed border-gray-400 my-4 mr-2"></div>
      <FontAwesomeIcon icon={icons[currentIndex]} color="gray" />
    </div>
  );
};

export default HorizontalLine;
