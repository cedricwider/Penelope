require 'mongo'
require 'uri'

def get_connection
  return @db_connection if @db_connection

  if ENV['MONGOHQ_URL']
    connection_settings = URI.parse(ENV['MONGOLAB_URL'])
    db_name = connection_settings.path.gsub(/^\//, '')
    @db_connection = Mongo::Connection.new(connection_settings.host, connection_settings.port).db(db_name)
    @db_connection.authenticate(connection_settings.user, connection_settings.password) unless (connection_settings.user.nil? || connection_settings.password.nil?)
  else
    @db_connection = Mongo::Connection.new.db("youser", :pool_size => 5, :timeout => 5)
  end
  @db_connection
end

DB = get_connection

require_relative 'user_data'