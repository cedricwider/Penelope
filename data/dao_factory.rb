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

  def new_generic_dao(collection_name)
    GenericDAO.new(@db.collection(collection_name))
  end

end