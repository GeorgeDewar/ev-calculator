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
  binding.pry if brand_id == 0
  brand_name = brand.xpath("name").text
  Brand.create_with(name: brand_name).find_or_create_by(id: brand_id).update(name: brand_name)

  brand.xpath("models/model").each do |model|
    model.xpath("generations/generation").each do |generation|
      start_year = generation.xpath("modifications/modification/yearstart").map(&:text).min
      end_year = generation.xpath("modifications/modification/yearstop").map(&:text).max
      puts "#{brand.xpath("name").text} #{model.xpath("name").text} (#{start_year}-#{end_year})"
      generation.xpath("modifications/modification").each do |modification|
        puts "  #{modification.xpath("engine").text}"
      end
    end
  end
end

