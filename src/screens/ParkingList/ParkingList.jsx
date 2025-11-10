import React, { useState } from "react";
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from "react-native";
import DatePicker from "react-native-date-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

import useFilters from "../../hooks/useFilters";
import FilterButton from "../../components/FilterButton/FilterButton";
import {ParkingCard} from "../../components/ParkingCard/ParkingCard";
import VehicleTypeModal from "../../components/VehicleTypeModal/VehicleTypeModal";

export default function ParkingList() {
  const {
    activeFilter, setActiveFilter,
    startDate, setStartDate,
    endDate, setEndDate,
    selectedVehicles, toggleVehicleSelection,
    vehicleCount, setVehicleCount,
    vehicleOptions
  } = useFilters();

  const [openPicker, setOpenPicker] = useState(false);

  function openDatePicker(type) {
    setActiveFilter(type);
    setOpenPicker(true);
  }

  function handleDateConfirm(date) {
    if (activeFilter === "start") setStartDate(date);
    if (activeFilter === "end") setEndDate(date);
    setOpenPicker(false);
    setActiveFilter(null);
  }

  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 18, backgroundColor: "#fff" }}>

      {/* HEADER */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 50 }}>
        <Ionicons name="menu" size={28} />
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Logo</Text>
        <TouchableOpacity style={{ backgroundColor: "#A4E66E", padding: 10, borderRadius: 8 }}>
          <Text style={{ fontWeight: "bold" }}>L</Text>
        </TouchableOpacity>
      </View>

      {/* HERO */}
      <Image source={require("../../assets/parking_map.png")} style={{ width: "100%", height: 150, resizeMode: "contain", marginVertical: 12 }} />
      <Text style={{ fontSize: 20, fontWeight: "700" }}>Trouver vos parking avec nous</Text>
      <Text style={{ color: "#555", marginBottom: 16 }}>Nous vous aidons à trouver votre place de parking où que vous alliez</Text>

      {/* SEARCH */}
      <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 10, paddingHorizontal: 10 }}>
        <TextInput placeholder="Adresse ou localisation" style={{ flex: 1, padding: 10 }} />
        <Ionicons name="search" size={20} />
      </View>

      {/* FILTERS */}
      <Text style={{ marginTop: 20, fontWeight: "600" }}>Filtres</Text>

      <FilterButton label="Date & heure de début" onPress={() => openDatePicker("start")} value={startDate ? startDate.toLocaleString() : "Sélectionner"} />
      <FilterButton label="Date & heure de fin" onPress={() => openDatePicker("end")} value={endDate ? endDate.toLocaleString() : "Sélectionner"} />
      <FilterButton label="Types de véhicules" onPress={() => setActiveFilter("types")} value={selectedVehicles.length > 0 ? `(${selectedVehicles.length})` : "Sélectionner"} />
      <FilterButton label="Nombre de véhicules" onPress={() => setActiveFilter("count")} value={vehicleCount ? vehicleCount : "Sélectionner"} />

      <TouchableOpacity style={{ backgroundColor: "#ddd", marginTop: 20, padding: 14, borderRadius: 10, alignItems: "center" }}>
        <Text>Rechercher</Text>
      </TouchableOpacity>

      {/* LIST */}
      <Text style={{ marginTop: 30, fontWeight: "700", fontSize: 18 }}>Liste de parking</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
        <ParkingCard
          title="Parking Atlantis"
          address="Lot BM 159 Ampitatafika 102"
          price="0.5$/heure"
          rating={4}
          image={require("../../assets/parking_map.png")}
        />

        <ParkingCard
          title="Parking IT 102"
          address="En face IT University"
          price="1$/heure"
          rating={3}
          image={require("../../assets/parking_map.png")}
        />
      </ScrollView>

      {/* MAP */}
      <Text style={{ fontWeight: "700", fontSize: 18 }}>Positions des parkings</Text>
      <Image source={require("../../assets/parking_map.png")} style={{ width: "100%", height: 220, borderRadius: 10, marginVertical: 12 }} />

      {/* DATE PICKER */}
      <DatePicker
        modal
        open={openPicker}
        date={activeFilter === "start" ? startDate || new Date() : endDate || new Date()}
        mode="datetime"
        onConfirm={handleDateConfirm}
        onCancel={() => setOpenPicker(false)}
      />

      {/* VEHICLE TYPE MODAL */}
      <VehicleTypeModal
        visible={activeFilter === "types"}
        onClose={() => setActiveFilter(null)}
        options={vehicleOptions}
        selected={selectedVehicles}
        toggle={toggleVehicleSelection}
      />

    </ScrollView>
  );
}
