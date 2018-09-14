json.(@modification, :id)
json.brand do
  json.id @modification.generation.model.brand.id
  json.name @modification.generation.model.brand.name
end
json.model do
  json.id @modification.generation.model.id
  json.name @modification.generation.model.name
end
json.generation do
  json.id @modification.generation.id
  json.name @modification.generation.name
end
json.(@modification, :engine, :year_start, :year_stop, :fuel_type, :fuel_consumption_combined, :kerb_weight,
  :battery_capacity, :all_electric_range, :average_energy_consumption)
