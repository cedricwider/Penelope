require_relative '../helpers/type_converter'
require_relative '../helpers/query_helper'

class Penelope < Sinatra::Application

  before '/api/*' do
    unless request.path_info =~ /^\/api\/(user|event|wishlist|wichtel)(\/\w+)?$/
      puts "path #{request.path_info} is not allowed, sorry"
      halt 404
    end
  end

  get '/api/:thing/:id' do
      if (params[:thing] == 'user' && params[:id] == 'me')
        DAO_FACTORY.new_user_dao.find_one(@user._id).to_json
      else
        DAO_FACTORY.new_generic_dao(params[:thing]).find_one(params[:id]).to_json
      end
  end

  get '/api/:thing' do
    query = params[:query] || ''
    search_query = QueryHelper.to_mongodb_query(unescape(query, encoding='UTF-8'))
    DAO_FACTORY.new_generic_dao(params[:thing]).find(search_query).to_json
  end

  post '/api/:thing' do
    oid = DAO_FACTORY.new_generic_dao(params[:thing]).insert(streamline(JSON.parse(request.body.read.to_s)))

  end

  delete '/api/:thing/:id' do
    oid = params[:id]
    DAO_FACTORY.new_generic_dao(params[:thing]).remove(oid)
    to_json_id oid
  end

  put '/api/:thing/:id' do
    DAO_FACTORY.new_generic_dao(params[:thing]).update(JSON.parse(request.body.read.to_s))
  end

  def streamline(hash)
    hash.each_value{ |v| v = TypeConverter.convert_string(v) if v.is_a?(String)}
  end

  def to_json_id(oid)
    "{\"_id\": \"#{oid.to_s}\"}"
  end

end