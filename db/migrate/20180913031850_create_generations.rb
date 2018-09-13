class CreateGenerations < ActiveRecord::Migration[5.2]
  def change
    create_table :generations do |t|
      t.references :model, null: false
      t.text :name, null: false, index: true
      t.timestamps
    end

    add_index :generations, [:model_id, :name], unique: true
  end
end
