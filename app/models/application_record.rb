class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def self.find_or_create_or_update!(id, attributes)
    obj = create_with(attributes).find_or_create_by!(id: id)
    obj.update!(attributes)
    return obj
  end
end
