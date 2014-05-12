class Penelope < Sinatra::Application

  before '/api/*' do
    unless request.path_info =~ /^\/api\/(user|event)(\/\w+)?$/
      puts "path #{request.path_info} doesn't match /api/user"
      halt 404
    end
  end

  get '/api/:thing' do
    DB.collection(params[:thing]).find.to_a.map{|t| from_bson_id(t)}.to_json
  end

  get '/api/:thing/:id' do
    if (params[:thing] == 'user' && params[:id] == 'me')
      from_bson_id(DB.collection('user').find_one(@user._id)).to_json
    else
      from_bson_id(DB.collection(params[:thing]).find_one(to_bson_id(params[:id]))).to_json
    end

  end

  post '/api/:thing' do
    oid = DB.collection(params[:thing]).insert(JSON.parse(request.body.read.to_s))
    "{\"_id\": \"#{oid.to_s}\"}"
  end

  delete '/api/:thing/:id' do
    DB.collection(params[:thing]).remove('_id' => to_bson_id(params[:id]))
  end

  put '/api/:thing/:id' do
    DB.collection(params[:thing]).update({'_id' => to_bson_id(params[:id])}, {'$set' => JSON.parse(request.body.read.to_s).reject{|k,v| k == '_id'}})
  end

  def to_bson_id(id) BSON::ObjectId.from_string(id) end
  def from_bson_id(obj) obj.merge({'_id' => obj['_id'].to_s}) end

end