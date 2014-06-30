class GenericDAO
  attr_reader :collection

  def initialize(collection)
    @collection = collection
  end

  def find_one(id)
    return nil if id.nil?
    from_bson_id(@collection.find_one(to_bson_id(id)))
  end

  def find(query={})
    @collection.find(query).to_a.map{|t| from_bson_id(t)}
  end

  def insert(object)
    @collection.insert(object)
  end

  def update(hash)
    id = to_bson_id(hash['_id'])
    values = hash.reject{|k, v| k == '_id'}
    @collection.update({'_id' => id}, {'$set' => values})
    from_bson_id(@collection.find_one(id)).to_json
  end

  def remove(id)
    @collection.remove('_id' => to_bson_id(id))
  end

  def to_bson_id(id)
    BSON::ObjectId.from_string(id.to_s)
  end

  def from_bson_id(obj)
    obj.merge({'_id' => obj['_id'].to_s})
  end

end