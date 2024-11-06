require 'rails_helper'

RSpec.describe Student, type: :model do
  describe 'validations' do
    it 'is valid with valid attributes' do
      student = Student.new(name: 'John Doe', subject_name: 'Math', marks: 85)
      expect(student).to be_valid
    end

    it 'is not valid without a name' do
      student = Student.new(subject_name: 'Math', marks: 85)
      expect(student).not_to be_valid
    end
  end
end
