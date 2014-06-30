require 'rspec'
require 'rspec-expectations'
require_relative '../business/wichtel_engine'

class Array
  def contains_duplicates?
    self.each do |value|
      return true if self.count(value) > 1
    end
    return false
  end
end

RSpec.describe WichtelEngine do

  NUMBER_OF_WICHTELS=2

  before :each do
    engine = WichtelEngine.new
    @participants = %w(Cedric Jerome Fabienne Seraina Elvira Wanda Beni Manyck Mami Papi)
    @assignments = engine.wichtelize(@participants, NUMBER_OF_WICHTELS)
  end

  it 'should return a hash' do
    expect(@assignments).to be_a(Hash)
  end

  it 'should return a hash with every participant as a key' do
    @participants.each {|participant| expect(@assignments.keys).to include(participant) }
  end

  it 'should have the desired number of assigned wichtels per participant' do
    @assignments.each_value { |wichtels| expect(wichtels.length).to be(NUMBER_OF_WICHTELS) }
  end

  it 'should contain the same participant only once as wichtel' do
    @assignments.each_value { |wichtels| expect(wichtels.contains_duplicates?).to be(false)}
  end

  it 'should contain every participant exactly twice' do
    flat_assignments = @assignments.values.flatten
    @participants.each do |participant|
      expect(flat_assignments.count(participant)).to be(NUMBER_OF_WICHTELS)
    end
  end
end