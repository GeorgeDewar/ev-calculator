require_relative '../config/environment'
require 'optparse'
require 'nokogiri'

options = {}
OptionParser.new do |opts|
  opts.banner = "Usage: load_data.rb [options]"

  opts.on("-f", "--file FILENAME", "Load data from the specified XML file") do |v|
    options[:filename] = v
  end
end.parse!

if options[:filename].nil?
  puts "A filename is required. Try --help."
end

doc = File.open(options[:filename]) { |f| Nokogiri::XML(f) }
doc.remove_namespaces! # The data comes with a single namespace

doc.xpath("/brands/brand").each do |brand|
  brand_id = brand.xpath("id").text.to_i
  brand_name = brand.xpath("name").text
  Brand.find_or_create_or_update!(brand_id, name: brand_name)

  brand.xpath("models/model").each do |model|
    model_id = model.xpath("id").text.to_i
    model_name = model.xpath("name").text
    Model.find_or_create_or_update!(model_id, brand_id: brand_id, name: model_name)

    model.xpath("generations/generation").each do |generation|
      generation_id = generation.xpath("id").text.to_i
      generation_name = generation.xpath("name").text
      Generation.find_or_create_or_update!(generation_id, model_id: model_id, name: generation_name)

      start_year = generation.xpath("modifications/modification/yearstart").map(&:text).min
      end_year = generation.xpath("modifications/modification/yearstop").map(&:text).max
      puts "#{brand.xpath("name").text} #{model.xpath("name").text} (#{start_year}-#{end_year})"
      generation.xpath("modifications/modification").each do |modification|
        modification_id = modification.xpath("id").text.to_i
        modification_engine = modification.xpath("engine").text
        puts "  #{modification_engine}"
        Modification.find_or_create_or_update!(modification_id, {
            generation_id: generation_id,
            engine: modification_engine,
            year_start: modification.xpath("yearstart").text.presence,
            year_stop: modification.xpath("yearstop").text.presence,
            fuel_type: Modification::FUEL_TYPE_MAP[modification.xpath("fuel").text],
            fuel_consumption_combined: modification.xpath("fuelConsumptionCombined").text.presence,
            kerb_weight: modification.xpath("curbWeight").text.presence,
            battery_capacity: modification.xpath("batteryCapacity").text.presence,
            all_electric_range: modification.xpath("allElectricRange").text.presence,
            average_energy_consumption: modification.xpath("averageEnergyConsumption").text.presence,
        })
      end
    end
  end
end

