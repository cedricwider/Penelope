class QueryHelper
  def self.to_mongodb_query(search_query)
      mongo_query = {}
      search_query.split('&').each do |key_val|
        comparator = determine_comparator(key_val)
        arr = key_val.split(comparator)
        value = TypeConverter.convert_string(arr[1])
        mongo_query[arr[0]] = comparator == '=' ? value : {to_mongo_comparator(comparator) => value}
      end
      mongo_query
    end

    def self.determine_comparator(key_val)
      unequal_regex = /^[^<>]+([<>]=?)[a-zA-Z0-9]+$/
      if key_val =~ /^[^=<>]+=[a-zA-Z0-9]+$/
        '='
      elsif key_val =~ unequal_regex
        unequal_regex.match(key_val)[1]
      end
    end

    def self.to_mongo_comparator(comparator)
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
end