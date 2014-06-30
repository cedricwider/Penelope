class WichtelAssignment
  attr_reader :event_id, :servant_id, :servee_id

  def initialize(event_id, servant_id, servee_id)
    @event_id = event_id
    @servant_id = servant_id
    @servee_id = servee_id
  end

end