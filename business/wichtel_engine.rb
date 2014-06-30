class WichtelEngine

  def wichtelize(participants, number_of_wichtels=2)
    assignment = {}
    while assignment.empty?
      participants.each do |participant|
        assignment[participant] = []
        number_of_wichtels.times do
          possible_wichtels = find_possible_wichtels(participants, participant, assignment, number_of_wichtels)
          wichtel = choose_random_participant(possible_wichtels)
          assignment[participant] << wichtel
        end
      end
      assignment = {} unless valid_assignment?(participants, assignment, number_of_wichtels)
    end
    assignment
  end

  private

  def choose_random_participant(all_participants)
    #choose random participant from all participants
    all_participants[rand all_participants.length]
  end

  def find_possible_wichtels(all_participants, participant, assignments, max)
    invalid_wichtels = [participant] + assignments[participant]
    assignements_per_wichtel = Hash.new(0)
    assignments.each_value do |wichtel_array|
      wichtel_array.each {|participant| assignements_per_wichtel[participant] += 1}
    end
    assignements_per_wichtel.each{|key, val| invalid_wichtels << key if val >= max}
    all_participants - invalid_wichtels
  end

  def valid_assignment?(participants, assignments, number_of_wichtels)
    participants.each { |participant| return false if assignments.values.flatten.count(participant) != number_of_wichtels}
    return true
  end
end