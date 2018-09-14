class Modification < ApplicationRecord
  belongs_to :generation
  enum fuel_type: { petrol: 0, diesel: 1, electric: 2, phev: 3 }

  FUEL_TYPE_MAP = {
      "Petrol (Gasoline)" => :petrol,
      "Diesel" => :diesel,
      "Electricity" => :electric,
  }

  scope :with_joins, -> do
    joins(generation: {model: :brand})
  end

  scope :with_selects, -> do
    select("*", "generations.name as generation_name", "models.name as model_name", "brands.name as brand_name")
  end
end
