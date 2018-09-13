class Generation < ApplicationRecord
  belongs_to :model
  has_many :modifications
end
