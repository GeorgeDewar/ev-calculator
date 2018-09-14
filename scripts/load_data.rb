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
        puts "  #{modification.xpath("engine").text}"

      end
    end
  end
end

