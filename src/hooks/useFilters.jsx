import { useState } from "react";

export default function useFilters() {
  const [activeFilter, setActiveFilter] = useState(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [vehicleCount, setVehicleCount] = useState("");

  const vehicleOptions = ["Moto", "Voiture", "Camion", "Bus"];

  const toggleVehicleSelection = (type) => {
    setSelectedVehicles(prev =>
      prev.includes(type) ? prev.filter(v => v !== type) : [...prev, type]
    );
  };

  return {
    activeFilter,
    setActiveFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedVehicles,
    toggleVehicleSelection,
    vehicleCount,
    setVehicleCount,
    vehicleOptions
  };
}
