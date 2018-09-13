class CreateModifications < ActiveRecord::Migration[5.2]
  def change
    create_table :modifications do |t|
      t.references :generation, null: false
      t.text :engine, null: false, index: true

      t.integer :year_start, index: true
      t.integer :year_stop, index: true

      t.integer :fuel_type # enum
      t.decimal :fuel_consumption_combined # L/100km
      t.integer :kerb_weight #kg

      t.decimal :battery_capacity # kWh
      t.integer :all_electric_range # km
      t.decimal :average_energy_consumption # kWh/100km
    end

    add_index :modifications, [:generation_id, :engine], unique: true
  end
end
