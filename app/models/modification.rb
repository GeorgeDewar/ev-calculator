class Modification < ApplicationRecord
  belongs_to :generation
  enum fuel_type: { petrol: 0, diesel: 1, electric: 2, phev: 3 }
end
