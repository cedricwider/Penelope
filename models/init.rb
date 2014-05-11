require 'mongo'

DB = Mongo::Connection.new.db("youser", :pool_size => 5, :timeout => 5)

require_relative 'user_data'