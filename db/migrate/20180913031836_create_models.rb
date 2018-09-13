class CreateModels < ActiveRecord::Migration[5.2]
  def change
    create_table :models do |t|
      t.references :brand, null: false
      t.text :name, null: false, index: true
      t.timestamps
    end

    add_index :models, [:brand_id, :name], unique: true
  end
end
