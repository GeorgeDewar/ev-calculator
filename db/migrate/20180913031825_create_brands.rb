class CreateBrands < ActiveRecord::Migration[5.2]
  def change
    create_table :brands do |t|
      t.text :name, null: false, unique: true
      t.timestamps
    end
  end
end
