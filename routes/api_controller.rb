require_relative '../helpers/type_converter'

class Penelope < Sinatra::Application

  before '/api/*' do
    unless request.path_info =~ /^\/api\/(user|event|wishlist|wichtel)(\/\w+)?$/
      puts "path #{request.path_info} is not allowed, sorry"
      halt 404
    end
  end

  get '/api/:thing/:id' do
      if (params[:thing] == 'user' && params[:id] == 'me')
        from_bson_id(DB.collection('user').find_one(@user._id)).to_json
      else
        from_bson_id(DB.collection(params[:thing]).find_one(to_bson_id(params[:id]))).to_json
      end
  end

  get '/api/:thing' do
    if params[:query]
      search_query = to_mongodb_query(unescape(params[:query], encoding='UTF-8'))
      DB.collection(params[:thing]).find(search_query).to_a.map{|t| from_bson_id(t)}.to_json
    else
      DB.collection(params[:thing]).find.to_a.map{|t| from_bson_id(t)}.to_json
    end
  end

  post '/api/:thing' do
    oid = DB.collection(params[:thing]).insert(streamline(JSON.parse(request.body.read.to_s)))
    "{\"_id\": \"#{oid.to_s}\"}"
  end

  delete '/api/:thing/:id' do
    DB.collection(params[:thing]).remove('_id' => to_bson_id(params[:id]))
  end

  put '/api/:thing/:id' do
    id = to_bson_id(params[:id])
    values = streamline( JSON.parse(request.body.read.to_s).reject { |k, v| k == '_id' } )
    DB.collection(params[:thing]).update({'_id' => id}, {'$set' => values})
    from_bson_id(DB.collection(params[:thing]).find_one(id)).to_json
  end

  def to_bson_id(id)
    BSON::ObjectId.from_string(id)
  end

  def from_bson_id(obj)
    obj.merge({'_id' => obj['_id'].to_s})
  end

  def to_mongodb_query(search_query)
    mongo_query = {}
    search_query.split('&').each do |key_val|
      comparator = determine_comparator(key_val)
      arr = key_val.split(comparator)
      value = TypeConverter.convert_string(arr[1])
      mongo_query[arr[0]] = comparator == '=' ? value : {to_mongo_comparator(comparator) => value}
    end
    mongo_query
  end

  def determine_comparator(key_val)
    unequal_regex = /^[^<>]+([<>]=?)[a-zA-Z0-9]+$/
    if key_val =~ /^[^=<>]+=[a-zA-Z0-9]+$/
      '='
    elsif key_val =~ unequal_regex
      unequal_regex.match(key_val)[1]
    end
  end

  def to_mongo_comparator(comparator)
    if comparator == '<'
      '$lt'
    elsif comparator == '<='
      '$lte'
    elsif comparator == '>'
      '$gt'
    else
      '$gte'
    end
  end

  def streamline(hash)
    hash.each_value{ |v| v = TypeConverter.convert_string(v) if v.is_a?(String)}
  end

end