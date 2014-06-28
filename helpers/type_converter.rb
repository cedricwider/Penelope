module TypeConverter

  def self.convert_string(string)
    if is_i?(string)
      string.to_i
    elsif is_b?(string)
      to_b(string)
    else
      string
    end
  end

  private

  def self.is_i?(string)
    string =~ /^[+-]?[0-9]+$/
  end

  def self.is_b?(string)
    string.downcase =~ /^(true|false)$/
  end

  def self.to_b(string)
    string.downcase == 'true'
  end
end