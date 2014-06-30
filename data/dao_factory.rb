require_relative 'generic_dao'

class DaoFactory
  attr_reader :db

  def initialize(db)
    @db = db
  end

  def new_user_dao
    GenericDAO.new(@db.collection('user'))
  end

  def new_event_dao
    GenericDAO.new(@db.collection('event'))
  end

  def new_wishlist_dao
    GenericDAO.new(@db.collection('wishlist'))
  end

  def new_wichtel_dao
    GenericDAO.new(@db.collection('wichtel'))
  end

  def new_dao(collection_name)
    case collection_name
      when 'user'
        new_user_dao
      when 'event'
        new_event_dao
      when 'wishlist'
        new_wishlist_dao
      when 'wichtel'
        new_wichtel_dao
      else
        nil
    end
  end

end