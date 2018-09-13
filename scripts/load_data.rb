require_relative '../config/environment'
require 'optparse'

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

