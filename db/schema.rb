# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_09_13_031902) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "brands", force: :cascade do |t|
    t.text "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "generations", force: :cascade do |t|
    t.bigint "model_id", null: false
    t.text "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["model_id", "name"], name: "index_generations_on_model_id_and_name", unique: true
    t.index ["model_id"], name: "index_generations_on_model_id"
    t.index ["name"], name: "index_generations_on_name"
  end

  create_table "models", force: :cascade do |t|
    t.bigint "brand_id", null: false
    t.text "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["brand_id", "name"], name: "index_models_on_brand_id_and_name", unique: true
    t.index ["brand_id"], name: "index_models_on_brand_id"
    t.index ["name"], name: "index_models_on_name"
  end

  create_table "modifications", force: :cascade do |t|
    t.bigint "generation_id", null: false
    t.text "engine", null: false
    t.integer "year_start"
    t.integer "year_stop"
    t.integer "fuel_type"
    t.float "fuel_consumption_combined"
    t.integer "kerb_weight"
    t.float "battery_capacity"
    t.integer "all_electric_range"
    t.float "average_energy_consumption"
    t.index ["engine"], name: "index_modifications_on_engine"
    t.index ["generation_id", "engine"], name: "index_modifications_on_generation_id_and_engine", unique: true
    t.index ["generation_id"], name: "index_modifications_on_generation_id"
    t.index ["year_start"], name: "index_modifications_on_year_start"
    t.index ["year_stop"], name: "index_modifications_on_year_stop"
  end

end
